"use client";

import { FilterOptions, RecipeSearchParams } from "@/types/recipe";
import { useState, FormEvent, useEffect } from "react";

interface SearchFormProps {
  filterOptions: FilterOptions;
  initialParams: RecipeSearchParams;
  onSearch: (params: RecipeSearchParams) => void;
}

/**
 * レシピ検索フォームコンポーネント
 */
export function SearchForm({
  filterOptions,
  initialParams,
  onSearch,
}: SearchFormProps) {
  const [searchParams, setSearchParams] = useState<RecipeSearchParams>({
    query: "",
    number: 12,
  });

  // 初期パラメータが変更されたときにstateを更新
  useEffect(() => {
    setSearchParams(initialParams);
  }, [initialParams]);

  /**
   * 入力値の変更を処理する
   */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * フォーム送信を処理する
   */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(searchParams);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mb-8 bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <label htmlFor="query" className="block text-gray-700 font-medium mb-2">
          レシピを検索
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="query"
            name="query"
            value={searchParams.query}
            onChange={handleChange}
            placeholder="キーワードを入力"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            aria-label="レシピを検索">
            検索
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 料理のカテゴリ */}
        <div>
          <label
            htmlFor="cuisine"
            className="block text-gray-700 font-medium mb-2">
            料理のカテゴリ
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={searchParams.cuisine || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">すべてのカテゴリ</option>
            {filterOptions.cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* 食事タイプ */}
        <div>
          <label
            htmlFor="type"
            className="block text-gray-700 font-medium mb-2">
            食事タイプ
          </label>
          <select
            id="type"
            name="type"
            value={searchParams.type || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">すべての食事タイプ</option>
            {filterOptions.mealTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* 食事制限 */}
        <div>
          <label
            htmlFor="diet"
            className="block text-gray-700 font-medium mb-2">
            食事制限
          </label>
          <select
            id="diet"
            name="diet"
            value={searchParams.diet || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">制限なし</option>
            {filterOptions.diets.map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
        </div>

        {/* 食物アレルギー */}
        <div>
          <label
            htmlFor="intolerances"
            className="block text-gray-700 font-medium mb-2">
            食物アレルギー
          </label>
          <select
            id="intolerances"
            name="intolerances"
            value={searchParams.intolerances || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">なし</option>
            {filterOptions.intolerances.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
