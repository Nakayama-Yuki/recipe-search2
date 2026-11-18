const originalFetch = globalThis.fetch;
process.env.SPOONACULAR_API_KEY = "e2e-only-key";
const recipe = {
  id: 1, title: "テストパスタ", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN1sAAAAASUVORK5CYII=",
  readyInMinutes: 20, servings: 2, healthScore: 80, pricePerServing: 200,
  cuisines: ["Italian"], dishTypes: ["main course"], vegetarian: true,
  summary: "<p>固定データのレシピです。</p>", instructions: "<p>パスタをゆでます。</p>",
  creditsText: "E2E fixture",
};
globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
  if (url.hostname !== "api.spoonacular.com") return originalFetch(input, init);
  if (url.pathname === "/recipes/1/information") return Response.json(recipe);
  if (url.pathname !== "/recipes/complexSearch") throw new Error(`Unexpected test API request: ${url}`);
  if (url.searchParams.get("query") === "error") return Response.json({}, { status: 503 });
  const results = url.searchParams.get("query") === "empty" ? [] : [recipe];
  return Response.json({ results, offset: 0, number: 12, totalResults: results.length });
};
