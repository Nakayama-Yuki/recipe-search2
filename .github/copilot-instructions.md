# Recipe Search App の Copilot 指示書

## アーキテクチャ概要

これは **Next.js 15 + React 19** で構築されたレシピ検索 Web アプリケーションです。Spoonacular API を使用してレシピデータを取得し、フィルタリング機能付きの検索インターフェースを提供します。

### 主要技術スタック

- **フロントエンド**: Next.js 15 (App Router), React 19, TailwindCSS v4, TypeScript 5
- **外部 API**: Spoonacular API (レシピデータソース)
- **パッケージマネージャー**: pnpm (必須)
- **開発サーバー**: Turbopack (`pnpm dev --turbopack`)

## 重要なパターンと規約

### API 統合パターン

- **サーバー専用**: `/src/services/recipeService.ts` は `"server-only"` でクライアント側では実行されません
- **環境変数**: `SPOONACULAR_API_KEY` が必要（`.env.local` に設定）
- **キャッシング戦略**:
  - レシピ検索: 1 時間キャッシュ (`{ next: { revalidate: 3600 } }`)
  - レシピ詳細: 24 時間キャッシュ (`{ next: { revalidate: 86400 } }`)

### コンポーネントアーキテクチャ

Server Components と Client Components の明確な分離:

```tsx
// Server Component (デフォルト) - データ取得
export default async function Home(props: SearchPageProps) {
  const searchParams = await props.searchParams;
  const filterOptions = getFilterOptions();
  // ...
}

// Client Component - インタラクション処理
("use client");
export function SearchFormWrapper({ filterOptions, initialParams }) {
  // URLパラメータ操作とフォーム状態管理
}
```

### 検索状態管理パターン

- **URL 駆動**: 検索状態は全て URL パラメータで管理（`window.location.search`）
- **リマウント戦略**: `SearchFormWrapper` で `key={JSON.stringify(initialParams)}` を使用してパラメータ変更時にコンポーネントを再マウント
- **型安全な検索**: `/src/types/recipe.ts` の `RecipeSearchParams` インターフェースで全検索条件を定義

### エラーハンドリングパターン

```tsx
// 画像読み込みエラーの優雅な処理
export function RecipeCard({ recipe, onImageLoadError }: RecipeCardProps) {
  const [imageError, setImageError] = useState(false);

  function handleImageError() {
    setImageError(true);
    onImageLoadError?.(recipe.id); // オプショナル通知
  }
  // フォールバック UI を表示
}
```

## 開発ワークフロー

### 必須コマンド

```bash
# Turbopack で高速開発サーバー起動
pnpm dev

# 本番ビルド（Turbopack使用）
pnpm build

# 型チェックとリンティング
pnpm lint
```

### 重要な環境設定

```bash
# .env.local （必須）
SPOONACULAR_API_KEY=your_api_key_here
```

### ファイル構成

- **API 抽象化**: `/src/services/recipeService.ts` - Spoonacular API の全ロジックを集約
- **型定義**: `/src/types/recipe.ts` - API レスポンスとフィルターオプションの完全な型定義
- **レイアウト**: `/src/app/layout.tsx` - Inter フォント、ヘッダー・フッター、日本語対応
- **動的ルート**: `/src/app/recipe/[id]/page.tsx` - レシピ詳細ページ

## Spoonacular API 固有の考慮事項

### フィルターオプション

- **固定値**: `getFilterOptions()` で定義された料理系統、食事制限、アレルギー情報は API 仕様に厳密に準拠
- **パラメータマッピング**: `type` → `dishTypes`, `intolerances` → アレルギー情報配列

### 画像処理

- Next.js Image コンポーネント必須：適切なサイジング、遅延読み込み、エラーハンドリング
- アスペクト比固定：`aspect-[4/3]` でカードレイアウトの一貫性確保

## TailwindCSS v4 設定

- **設定レス**: `postcss.config.mjs` で `@tailwindcss/postcss` プラグインのみ使用
- **CSS First**: `globals.css` で `@import "tailwindcss"` によるインポート
- **日本語対応**: Inter フォント + `lang="ja"` でアクセシビリティ確保
