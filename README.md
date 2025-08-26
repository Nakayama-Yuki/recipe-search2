# Recipe Search 2 🍳

Next.js と Spoonacular API を使用したモダンなレシピ検索アプリケーションです。

## 機能 ✨

- **レシピ検索**: キーワードでレシピを検索
- **高度なフィルタリング**: 料理の種類、食事制限、アレルギー対応などでフィルタ
- **詳細表示**: 調理時間、人数、栄養スコアなどの詳細情報
- **レスポンシブデザイン**: モバイルからデスクトップまで対応

## 技術スタック 🛠️

- **フレームワーク**: Next.js 15.5.0 (React 19)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4.1.12
- **外部 API**: Spoonacular API
- **パッケージマネージャー**: pnpm
- **リンター**: ESLint

## セットアップ 🚀

### 必要な環境

- Node.js 18 以上
- pnpm

### インストール

1. リポジトリをクローン

```bash
git clone https://github.com/Nakayama-Yuki/recipe-search2.git
cd recipe-search2
```

2. 依存関係をインストール

```bash
pnpm install
```

3. 環境変数の設定
   `.env.local`ファイルをプロジェクトルートに作成し、Spoonacular API キーを設定してください。

```env
SPOONACULAR_API_KEY=your_api_key_here
```

[Spoonacular API](https://spoonacular.com/food-api)でアカウントを作成して API キーを取得してください。

### 開発サーバーの起動

```bash
pnpm dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

## 使用方法 📖

1. **基本検索**: 検索バーにレシピ名や食材を入力
2. **フィルター検索**:
   - 料理の種類（イタリア料理、中華料理など）
   - 食事制限（ベジタリアン、ビーガンなど）
   - アレルギー対応（グルテンフリー、乳製品不使用など）
   - 料理タイプ（メインディッシュ、デザートなど）
3. **結果表示**: レシピカードをクリックして詳細を確認

## プロジェクト構造 📁

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # レイアウトコンポーネント
│   ├── page.tsx         # ホームページ
│   └── recipe/          # レシピ詳細ページ
├── components/          # Reactコンポーネント
│   ├── RecipeCard.tsx   # レシピカード
│   ├── RecipeGrid.tsx   # レシピグリッド
│   ├── SearchForm.tsx   # 検索フォーム
│   └── ...
├── services/            # APIサービス
│   └── recipeService.ts # Spoonacular API呼び出し
└── types/               # TypeScript型定義
    └── recipe.ts        # レシピ関連の型
```

## API 🔌

このアプリケーションは[Spoonacular API](https://spoonacular.com/food-api)を使用しています。

### 使用エンドポイント

- `GET /recipes/complexSearch` - レシピ検索
- 詳細な料理情報、栄養情報、調理手順を取得

### レート制限

無料プランでは 1 日 150 リクエストまでの制限があります。実際の運用では有料プランの使用を推奨します。

## スクリプト 📜

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# リント実行
pnpm lint
```

## 貢献 🤝

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成