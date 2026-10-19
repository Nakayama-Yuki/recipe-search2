import { getFilterOptions } from "@/services/recipeService";
import { RecipeGrid } from "@/components/RecipeGrid";
import { RecipeSearchParams } from "@/types/recipe";
import { Suspense } from "react";
import { SearchResults } from "@/components/SearchResults";
import { SearchFormWrapper } from "@/components/SearchFormWrapper";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    cuisine?: string;
    diet?: string;
    intolerances?: string;
    type?: string;
    number?: string;
  }>;
}

/**
 * レシピ検索ページ
 */
export default function Home(props: SearchPageProps) {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">レシピ検索</h1>
          <RecipeGrid recipes={[]} isLoading={true} />
        </main>
      }>
      <SearchPageContent searchParams={props.searchParams} />
    </Suspense>
  );
}

async function SearchPageContent({ searchParams }: SearchPageProps) {
  // 検索パラメータを取得
  const resolvedSearchParams = await searchParams;
  // フィルターオプションを取得
  const filterOptions = getFilterOptions();

  // 検索パラメータを安全に取得
  const query = resolvedSearchParams.query ?? "";
  const cuisine = resolvedSearchParams.cuisine;
  const diet = resolvedSearchParams.diet;
  const intolerances = resolvedSearchParams.intolerances;
  const type = resolvedSearchParams.type;
  const number = resolvedSearchParams.number
    ? parseInt(resolvedSearchParams.number)
    : 12;

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

      <SearchResults searchParams={initialSearchParams} />
    </main>
  );
}
