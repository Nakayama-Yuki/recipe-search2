import "server-only";

import {
  Recipe,
  RecipeSearchParams,
  RecipeSearchResponse,
} from "@/types/recipe";

/**
 * Spoonacular APIのベースURL
 */
const SPOONACULAR_API_BASE_URL = "https://api.spoonacular.com";

/**
 * レシピ検索を実行する関数
 * @param params 検索パラメータ
 * @returns 検索結果
 */
export async function searchRecipes(
  params: RecipeSearchParams
): Promise<RecipeSearchResponse> {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    throw new Error("Spoonacular API Key is not defined");
  }

  // 検索クエリパラメータの構築
  const queryParams = new URLSearchParams({
    apiKey,
    ...Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>),
  });

  // APIリクエストの実行
  const response = await fetch(
    `${SPOONACULAR_API_BASE_URL}/recipes/complexSearch?${queryParams.toString()}`,
    { next: { revalidate: 3600 } } // 1時間キャッシュ
  );

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * レシピの詳細情報を取得する関数
 * @param recipeId レシピID
 * @returns レシピの詳細情報
 */
export async function getRecipeById(recipeId: number): Promise<Recipe> {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    throw new Error("Spoonacular API Key is not defined");
  }

  const response = await fetch(
    `${SPOONACULAR_API_BASE_URL}/recipes/${recipeId}/information?apiKey=${apiKey}`,
    { next: { revalidate: 86400 } } // 24時間キャッシュ
  );

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * フィルタリングオプションの値を取得する
 * @returns フィルタリングに使用できるオプション
 */
export function getFilterOptions() {
  return {
    cuisines: [
      "African",
      "American",
      "British",
      "Cajun",
      "Caribbean",
      "Chinese",
      "Eastern European",
      "European",
      "French",
      "German",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Nordic",
      "Southern",
      "Spanish",
      "Thai",
      "Vietnamese",
    ],
    diets: [
      "Gluten Free",
      "Ketogenic",
      "Vegetarian",
      "Lacto-Vegetarian",
      "Ovo-Vegetarian",
      "Vegan",
      "Pescetarian",
      "Paleo",
      "Primal",
      "Low FODMAP",
      "Whole30",
    ],
    intolerances: [
      "Dairy",
      "Egg",
      "Gluten",
      "Grain",
      "Peanut",
      "Seafood",
      "Sesame",
      "Shellfish",
      "Soy",
      "Sulfite",
      "Tree Nut",
      "Wheat",
    ],
    mealTypes: [
      "Main course",
      "Side dish",
      "Dessert",
      "Appetizer",
      "Salad",
      "Bread",
      "Breakfast",
      "Soup",
      "Beverage",
      "Sauce",
      "Marinade",
      "Fingerfood",
      "Snack",
      "Drink",
    ],
  };
}
