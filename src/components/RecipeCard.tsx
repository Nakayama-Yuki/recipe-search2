"use client";

import { Recipe } from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RecipeCardProps {
  recipe: Recipe;
  onImageLoadError?: (recipeId: number) => void;
}

/**
 * レシピカードコンポーネント
 * 画像の読み込みに失敗した場合は親コンポーネントに通知します
 */
export function RecipeCard({ recipe, onImageLoadError }: RecipeCardProps) {
  const [imageError, setImageError] = useState(false);

  /**
   * 画像読み込みエラーのハンドラー
   */
  function handleImageError() {
    setImageError(true);
    // 親コンポーネントにエラーを通知
    if (onImageLoadError) {
      onImageLoadError(recipe.id);
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full aspect-[4/3]">
        {!imageError ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
            onError={handleImageError}
          />
        ) : (
          // 画像エラー時の代替表示
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            <span className="text-sm">画像がありません</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h3>

        <div className="flex flex-wrap gap-2 mb-3">
          {/* 調理時間タグ - 数値が存在する場合のみ表示 */}
          {typeof recipe.readyInMinutes === "number" ? (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
              ⏱️ {recipe.readyInMinutes}分
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
              ⏱️ 時間不明
            </span>
          )}

          {/* 食事タイプのタグ */}
          {recipe.dishTypes && recipe.dishTypes.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
              {recipe.dishTypes[0]}
            </span>
          )}

          {/* 食事制限のタグ */}
          {recipe.vegetarian && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
              ベジタリアン
            </span>
          )}
          {recipe.vegan && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
              ヴィーガン
            </span>
          )}
          {recipe.glutenFree && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
              グルテンフリー
            </span>
          )}
        </div>

        <Link
          href={`/recipe/${recipe.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
          詳細を見る
        </Link>
      </div>
    </div>
  );
}
