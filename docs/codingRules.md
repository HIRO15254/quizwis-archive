# コーディング規約

## ディレクトリ構成

- `docs/` ドキュメント類
- `public/` 静的ファイル
- `src/` 各種ソースコード
  - `/app/` アプリケーション本体。後述
  - `/backend/` バックエンド
  - `/components/` 全体で汎用的に使うコンポーネント
  - `/gql/` GraphQLのスキーマ定義。(graphql-code-generatorで自動生成)
  - `/hooks/` 全体で使うフック。処理系のみ
  - `/lib/` ライブラリ関係
  - `/styles/` スタイル関係
  - `/types/` 全体で使う型定義
  - `/utils/` 全体で使う便利関数

## ファイル名規則

- ファイル名は`camelCase`で統一する
- React Componentを定義するファイルは、エクスポートするComponentと同名の`PascalCase`で命名されたフォルダーの中の`index.tsx`とする

## 設計規則

- page.tsxはclient componentにしない
