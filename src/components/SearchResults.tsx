import { searchRecipes } from "@/services/recipeService";
import { RecipeSearchParams } from "@/types/recipe";
import { RecipeGrid } from "./RecipeGrid";

interface SearchResultsProps {
  searchParams: RecipeSearchParams;
}

/**
 * 検索結果を取得して表示するサーバーコンポーネント
 */
export async function SearchResults({ searchParams }: SearchResultsProps) {
  // 検索クエリがない場合は空の結果を表示
  if (!searchParams.query) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-gray-600">
          レシピを検索してみましょう
        </h2>
        <p className="mt-2 text-gray-500">
          上記の検索フォームにキーワードを入力して検索してください
        </p>
      </div>
    );
  }

  try {
    // APIからレシピデータを取得
    const data = await searchRecipes(searchParams);

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            検索結果: <span className="text-blue-600">{data.totalResults}</span>{" "}
            件
          </h2>
        </div>

        <RecipeGrid recipes={data.results} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return (
      <div className="text-center py-10 text-red-600">
        <h2 className="text-xl font-medium">エラーが発生しました</h2>
        <p className="mt-2">しばらく時間をおいて再度お試しください</p>
      </div>
    );
  }
}
