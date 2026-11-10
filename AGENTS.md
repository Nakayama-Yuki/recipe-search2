<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# レシピ検索アプリ開発ガイド

## 守る設計

- Next.js App Router の Server Components でデータを取得し、フォーム状態・URL操作・画像エラー表示は Client Components に置く。
- API 呼び出しは [src/services/recipeService.ts](src/services/recipeService.ts) に集約する。同ファイルの `import "server-only"` を保ち、`SPOONACULAR_API_KEY` はサーバー側で扱う。
- 検索パラメータ・レスポンス型は `src/types/recipe.ts` に集約する。
- `src/app/page.tsx` は Promise の `searchParams` を Suspense 内のコンポーネントで解決する。変更時は既存の境界と `next.config.ts` のキャッシュ設定を確認する。
- 検索状態は URL パラメータで表す。`SearchFormWrapper.tsx` の URL 更新と、子の `SearchForm` に付けた `key={JSON.stringify(initialParams)}` による状態リセットを保つ。
- `"use client"` はクライアント用ファイルの先頭に記述する。サーバーとクライアントのコードは別ファイルとし、既存ファイルを実装例として参照する。

## API・表示

- 現在の fetch 設定は検索が `revalidate: 3600`、詳細が `revalidate: 86400`。キャッシュ方針を変更する場合はサービス実装とこの説明を揃える。
- フィルター値は `getFilterOptions()` を参照する。料理系統・食事制限・アレルギー・料理タイプの API パラメータ対応を保つ。
- 外部画像は Next.js Image を使い、許可ホストを `next.config.ts` で管理する。カードの `aspect-[4/3]`、画像失敗時のフォールバックと通知処理を保つ。
- UI は日本語、`lang="ja"`、Inter フォント、Tailwind v4 を使用する。CSS 処理は `next.config.ts` の `@tailwindcss/turbopack` を参照する。
- 主な参照先は `src/components/SearchFormWrapper.tsx`、`src/components/RecipeCard.tsx`、`src/app/recipe/[id]/page.tsx`。

## 検証

pnpm を使用する。`.env.local` に `SPOONACULAR_API_KEY` を設定する。

```bash
pnpm lint
pnpm build
```

現在、自動テストのスクリプトはない。UI 変更時は `pnpm dev` で検索・フィルター・詳細遷移・画像エラー表示を確認する。実行できなかった確認は理由を報告する。

## 文書の管理

セットアップと使い方は [README.md](README.md) を参照。開発時の指示はこのファイルで管理し、実装・設定・コマンドを変更した場合は関連する説明も更新する。依存バージョンとスクリプトは `package.json`、詳細設定は各設定ファイルを正とする。
