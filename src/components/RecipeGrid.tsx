"use client";

import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading?: boolean;
}

/**
 * レシピグリッドコンポーネント - レスポンシブなグリッドレイアウトでレシピカードを表示
 */
export function RecipeGrid({ recipes, isLoading = false }: RecipeGridProps) {
  if (isLoading) {
    return <RecipeGridSkeleton />;
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-gray-600">
          検索結果がありません
        </h2>
        <p className="mt-2 text-gray-500">
          別のキーワードで検索してみてください
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
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
