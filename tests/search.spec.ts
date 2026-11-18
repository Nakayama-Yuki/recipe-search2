import { expect, test } from "@playwright/test";

test("検索して詳細を表示し、一覧に戻れる", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("レシピを検索してみましょう")).toBeVisible();
  await page.getByPlaceholder("キーワードを入力").fill("pasta");
  await page.getByRole("button", { name: "レシピを検索" }).click();
  await expect(page).toHaveURL(/query=pasta/);
  await expect(page.getByRole("heading", { name: "テストパスタ" })).toBeVisible();
  await page.getByRole("link", { name: "詳細を見る" }).click();
  await expect(page).toHaveURL(/\/recipe\/1$/);
  await expect(page.getByRole("heading", { name: "調理手順" })).toBeVisible();
  await expect(page.getByText("パスタをゆでます。")).toBeVisible();
  await page.getByRole("link", { name: "検索結果に戻る" }).click();
  await expect(page).toHaveURL("/");
});

test("APIエラーを画面に表示する", async ({ page }) => {
  await page.goto("/?query=error");
  await expect(page.getByRole("heading", { name: "エラーが発生しました" })).toBeVisible();
});
