import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Interフォントの設定
const inter = Inter({ subsets: ["latin"] });

// メタデータの設定
export const metadata: Metadata = {
  title: "レシピ検索アプリ - 簡単においしい料理を見つけよう",
  description:
    "料理のジャンルやアレルギー情報、調理時間でフィルタリングしながら、お気に入りのレシピを見つけることができます。",
};

/**
 * アプリケーションのルートレイアウト
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">レシピ検索</h1>
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors">
                ホーム
              </Link>
            </div>
          </div>
        </header>

        {children}

        <footer className="bg-white mt-12 border-t border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} レシピ検索アプリ | Powered by
              Spoonacular API
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
