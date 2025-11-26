import { getRecipeById } from "@/services/recipeService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * レシピ詳細ページ
 */
export default async function RecipePage(props: RecipePageProps) {
  const params = await props.params;
  try {
    // レシピIDを数値に変換
    const recipeId = parseInt(params.id);

    // APIからレシピ詳細を取得
    const recipe = await getRecipeById(recipeId);

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            検索結果に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* レシピのヘッダー部分 */}
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {recipe.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {/* 料理タイプタグ */}
                  {recipe.dishTypes &&
                    recipe.dishTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {type}
                      </span>
                    ))}

                  {/* 料理のカテゴリタグ */}
                  {recipe.cuisines &&
                    recipe.cuisines.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {cuisine}
                      </span>
                    ))}

                  {/* 食事制限タグ */}
                  {recipe.vegetarian && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ベジタリアン
                    </span>
                  )}
                  {recipe.vegan && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ヴィーガン
                    </span>
                  )}
                  {recipe.glutenFree && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      グルテンフリー
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* レシピの詳細情報 */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">調理時間</p>
                <p className="text-xl font-semibold">
                  {recipe.readyInMinutes}分
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">サービング数</p>
                <p className="text-xl font-semibold">{recipe.servings}人前</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">ヘルススコア</p>
                <p className="text-xl font-semibold">
                  {recipe.healthScore}/100
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">価格(1人あたり)</p>
                <p className="text-xl font-semibold">
                  ${(recipe.pricePerServing / 100).toFixed(2)}
                </p>
              </div>
            </div>

            {/* レシピの概要 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">概要</h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </div>

            {/* レシピの手順 */}
            {recipe.instructions && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">調理手順</h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </div>
            )}

            {/* 出典情報 */}
            <div className="mt-8 text-sm text-gray-500">
              <p>出典: {recipe.creditsText}</p>
              {recipe.sourceUrl && (
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800">
                  オリジナルレシピを見る
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    return notFound();
  }
}
