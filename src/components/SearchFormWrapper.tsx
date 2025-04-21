"use client";

import { FilterOptions, RecipeSearchParams } from "@/types/recipe";
import { SearchForm } from "./SearchForm";

interface SearchFormWrapperProps {
  filterOptions: FilterOptions;
  initialParams: RecipeSearchParams;
}

/**
 * 検索フォームのラッパーコンポーネント
 * initialParamsの変更時にコンポーネントを再マウントするために使用
 */
export function SearchFormWrapper({
  filterOptions,
  initialParams,
}: SearchFormWrapperProps) {
  /**
   * 検索実行時のハンドラー
   * @param params 検索パラメーター
   */
  function handleSearch(params: RecipeSearchParams) {
    // URLパラメータに検索条件を追加してページをリロード
    const searchParams = new URLSearchParams();

    // 空でない値のみをURLパラメータに追加
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, String(value));
      }
    });

    // URLを更新して画面をリロード
    window.location.search = searchParams.toString();
  }

  // keyプロパティを使ってinitialParamsが変更されたときにコンポーネントを再マウント
  return (
    <SearchForm
      key={JSON.stringify(initialParams)}
      filterOptions={filterOptions}
      initialParams={initialParams}
      onSearch={handleSearch}
    />
  );
}
