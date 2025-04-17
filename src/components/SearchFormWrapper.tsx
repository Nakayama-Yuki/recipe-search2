"use client";

import { FilterOptions, RecipeSearchParams } from "@/types/recipe";
import { SearchForm } from "./SearchForm";
import { useRouter } from "next/navigation";

interface SearchFormWrapperProps {
  filterOptions: FilterOptions;
  initialParams: RecipeSearchParams;
}

/**
 * 検索フォームのラッパーコンポーネント
 * サーバーコンポーネントからクライアントコンポーネントへの橋渡し役
 */
export function SearchFormWrapper({
  filterOptions,
  initialParams,
}: SearchFormWrapperProps) {
  const router = useRouter();

  /**
   * 検索処理を実行する
   */
  function handleSearch(params: RecipeSearchParams) {
    // URLに検索パラメータを反映
    const url = new URL(window.location.href);

    // 既存のクエリパラメータをクリア
    url.searchParams.forEach((_, key) => {
      url.searchParams.delete(key);
    });

    // 新しいパラメータをセット
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, String(value));
      }
    });

    // クライアントサイドのナビゲーション実行
    router.push(url.toString());
  }

  return (
    <SearchForm
      filterOptions={filterOptions}
      initialParams={initialParams}
      onSearch={handleSearch}
    />
  );
}
