/**
 * Spoonacular APIのレシピ検索レスポンスの型定義
 */
export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

/**
 * レシピの型定義
 */
export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: any[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  summary: string;
}

/**
 * レシピ検索パラメータの型定義
 */
export interface RecipeSearchParams {
  query: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  type?: string;
  maxReadyTime?: number;
  sort?: string;
  sortDirection?: string;
  offset?: number;
  number?: number;
}

/**
 * フィルター用のオプション型定義
 */
export interface FilterOptions {
  cuisines: string[];
  diets: string[];
  intolerances: string[];
  mealTypes: string[]; // dishTypesに対応
}
