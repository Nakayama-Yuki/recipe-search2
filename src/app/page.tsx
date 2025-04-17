import { getFilterOptions } from "@/services/recipeService";
import { RecipeGrid } from "@/components/RecipeGrid";
import { RecipeSearchParams } from "@/types/recipe";
import { Suspense } from "react";
import { SearchResults } from "@/components/SearchResults";
import { SearchFormWrapper } from "@/components/SearchFormWrapper";

interface SearchPageProps {
  searchParams: {
    query?: string;
    cuisine?: string;
    diet?: string;
    intolerances?: string;
    type?: string;
    number?: string;
  };
}

/**
 * レシピ検索ページ
 */
export default async function Home({ searchParams }: SearchPageProps) {
  // フィルターオプションを取得
  const filterOptions = getFilterOptions();

  // 検索パラメータを安全に取得
  const query = searchParams.query ?? "";
  const cuisine = searchParams.cuisine;
  const diet = searchParams.diet;
  const intolerances = searchParams.intolerances;
  const type = searchParams.type;
  const number = searchParams.number ? parseInt(searchParams.number) : 12;

  // 初期の検索パラメータ
  const initialSearchParams: RecipeSearchParams = {
    query,
    cuisine,
    diet,
    intolerances,
    type,
    number,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">レシピ検索</h1>

      {/* クライアントコンポーネントのラッパーを使用 */}
      <SearchFormWrapper
        filterOptions={filterOptions}
        initialParams={initialSearchParams}
      />

      <Suspense fallback={<RecipeGrid recipes={[]} isLoading={true} />}>
        <SearchResults searchParams={initialSearchParams} />
      </Suspense>
    </main>
  );
}
