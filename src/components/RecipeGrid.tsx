"use client";

import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";
import { useState, useEffect } from "react";

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading?: boolean;
}

/**
 * レシピグリッドコンポーネント - レスポンシブなグリッドレイアウトでレシピカードを表示
 * 画像が取得できないレシピをフィルタリングする機能を提供
 */
export function RecipeGrid({ recipes, isLoading = false }: RecipeGridProps) {
  // 画像がないレシピを非表示にするかどうかの状態を管理
  const [hideRecipesWithoutImage, setHideRecipesWithoutImage] = useState(true);

  // 画像の読み込みに失敗したレシピのIDを管理
  const [failedImageRecipeIds, setFailedImageRecipeIds] = useState<Set<number>>(
    new Set()
  );

  // コンポーネントがマウントされたときに localStorage から設定を取得
  useEffect(() => {
    try {
      const savedValue = localStorage.getItem("hideRecipesWithoutImage");
      if (savedValue !== null) {
        setHideRecipesWithoutImage(JSON.parse(savedValue));
      }
    } catch (e) {
      console.error("Failed to load preferences from localStorage:", e);
    }
  }, []);

  // 設定変更時に localStorage に保存
  useEffect(() => {
    try {
      localStorage.setItem(
        "hideRecipesWithoutImage",
        JSON.stringify(hideRecipesWithoutImage)
      );
    } catch (e) {
      console.error("Failed to save preferences to localStorage:", e);
    }
  }, [hideRecipesWithoutImage]);

  /**
   * 画像の読み込みエラーを処理するハンドラー
   * @param recipeId 画像読み込みに失敗したレシピのID
   */
  function handleImageLoadError(recipeId: number) {
    setFailedImageRecipeIds((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.add(recipeId);
      return newIds;
    });
  }

  if (isLoading) {
    return <RecipeGridSkeleton />;
  }

  // 画像の有無によるフィルタリング
  // 1. image プロパティがない、または空の場合
  // 2. failedImageRecipeIds に含まれる（画像の読み込みに失敗した）場合
  const filteredRecipes = hideRecipesWithoutImage
    ? recipes.filter(
        (recipe) =>
          recipe.image &&
          recipe.image.trim() !== "" &&
          !failedImageRecipeIds.has(recipe.id)
      )
    : recipes;

  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-gray-600">
          検索結果がありません
        </h2>
        <p className="mt-2 text-gray-500">
          {hideRecipesWithoutImage && recipes.length > 0
            ? "画像がないレシピが非表示になっています。すべてのレシピを表示するには設定を変更してください。"
            : "別のキーワードで検索してみてください"}
        </p>
        {hideRecipesWithoutImage && recipes.length > 0 && (
          <button
            onClick={() => setHideRecipesWithoutImage(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            画像がないレシピも表示する
          </button>
        )}
      </div>
    );
  }

  // フィルタリングされたレシピ数と元のレシピ数を比較
  const hiddenRecipesCount = recipes.length - filteredRecipes.length;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {hideRecipesWithoutImage && hiddenRecipesCount > 0 && (
            <span>
              {hiddenRecipesCount}件のレシピ（画像なし）が非表示になっています
            </span>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hide-no-image"
            checked={hideRecipesWithoutImage}
            onChange={(e) => setHideRecipesWithoutImage(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="hide-no-image" className="text-sm text-gray-700">
            画像がないレシピを非表示
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onImageLoadError={handleImageLoadError}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * レシピグリッドのローディングスケルトン
 */
function RecipeGridSkeleton() {
  // 12個のスケルトンカードを表示
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse" />
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="flex gap-2 mb-4">
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
