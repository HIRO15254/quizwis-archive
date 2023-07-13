# next-app-template

自分がnext.jsで何か作りたいときに使うテンプレート

## お気持ち

フロントエンドエンジニアがソロで開発する時なので以下のような思想の元色々決めています

- なるべくバックエンドのことを考えたくない
- なるべくCSSのことを考えたくない
- 個人開発なので可能な限りモダンな構成にしたい

## 前提

この辺のインストールとかの仕方は説明してません。探せばたくさん記事があると思うのでよしなに。

- Git
- GitHub
- Docker
- node.js
- おこのみのエディター（私はVSCodeを使っています）

## 使ってるもの

### [next.js](https://nextjs.org/) v13.4.3

ないと始まらない。  
作成時点での最新版を入れています（app router使用）。  
バックエンドも任せます。

### [Mantine](https://mantine.dev/)

色々をよしなにやってくれるコンポーネントやhookの詰め合わせ。

ちなみに全部client componentじゃないと使えない。嫌ならCSSフレームワーク使えよと言われているっぽいしその通りなのでまあ仕方ない（そこまでストイックに速度を求めなければ大丈夫そう？）

### [supabase](https://supabase.com/)

サーバーサイドのデータベース。

Firebase likeにPostgresのRDBを置けて便利。ローカルに環境を作れるのと、Vercelと仲がいいっぽいのもいい感じなので採用。

今回は認証も任せることにしました。

### [Prisma](https://www.prisma.io/)

TypeScriptからDBを扱うためのORM。

## これを作るまでにやったこと

### とりあえずnext.jsでアプリを作ってもらう

※2行目以降は行の最後の選択肢を選択しただけ

```bash
> npx create-next-app@latest
What is your project named? next-app-template
Would you like to use TypeScript with this project? Yes
Would you like to use ESLint with this project? Yes
Would you like to use Tailwind CSS with this project? No
Would you like to use `src/` directory with this project? Yes
Use App Router (recommended)? Yes
you like to customize the default import alias? No
```

### Mantineを導入する

[該当コミット](https://github.com/HIRO15254/next-app-template/commit/afa9f2262334cd1a34148d0f5a070d9f6ee40da5)

#### インストール

peer dependencyになっているtiptapを先に入れる（別に同時でもいいはず）

※注意: Mantineの昨日が全部入ってるわけではないので、ないやつは必要なら別途入れる

```bash
> yarn add @tiptap/pm@^2.0.0 @tiptap/core@^2.0.0
...(なんかいろいろ出る)
> yarn add @mantine/core @mantine/hooks @mantine/form @mantine/notifications @mantine/dates dayjs @mantine/modals @mantine/nprogress @mantine/tiptap @tabler/icons-react @tiptap/react @tiptap/extension-link @tiptap/starter-kit @mantine/next @emotion/server @emotion/react
...(なんかいろいろ出る)
```

yarnがいいのでpackage-lock.jsonはここで消しました（宗派によると思います）

#### 導入

`MantineProvider`は`Server Component`で使っちゃいけないらしいので、[公式のissue](https://github.com/mantinedev/mantine/issues/2815#issuecomment-1293214788)にあった[サンプル](https://github.com/mantinedev/mantine-next-template/tree/next-13-app/app)を参考に変更

### supabaseの導入

[該当コミット](https://github.com/HIRO15254/next-app-template/commit/18e3e5627d241e8abebb7420d355ae8eeced1baa)

[公式ドキュメント](https://supabase.com/docs/guides/getting-started/local-development)を参考に進めていきます

#### supabase側のセットアップ

[公式サイト](https://supabase.com/)から

- アカウントを作成
- Organizationを作成（名前とかはよしなに）
- Projectを作成

して、

- Projectの作成時に使用したパスワード
- HomeタブにあるProject URLとAPI Key
- Project Settingsタブ内DatabaseにあるConnection string(URI)

を控えておく。Connection stringのパスワード部分もちゃんと置き換えておく。

自分は`.env_secret`というファイルをおいてそこに

```env
# DBの接続文字列 Prismaが見る
DATABASE_URL="[Connection String]"

# APIのURLとKey Supabase Clientが見る
NEXT_PUBLIC_SUPABASE_URL="[Project URL]"
NEXT_PUBLIC_SUPABASE_KEY="[API Key]"
```

のようにメモしている（gitignore入れ忘れ注意）

#### supabase CLIをセットアップ

```bash
> npm install supabase --save-dev
```

ログインもしておく。

```bash
> npx supabase login
You can generate an access token from https://app.supabase.com/account/tokens
Enter your access token:
Finished supabase login.
```

※アクセストークンはコマンドラインでは表示されないので注意（びっくりした）

ローカルのプロジェクトも作成する。

```bash
> npx supabase init
Generate VS Code workspace settings? [y/N] N
Finished supabase init.
```

データベースを実際に立ち上げる。

```bash
> npx supabase start
                              Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: -(長い文字列)-
service_role key: -(長い文字列)-

```

多分こんな感じの出力が得られるので、`.env`ファイルを作ってこんな感じに書いておく。（`[]`内は先ほどの出力で置き換える。以降も同じ。）

```env
# DBの接続文字列 Prismaが見る
DATABASE_URL="[DB URL]"

# APIのURLとKey Supabase Clientが見る
NEXT_PUBLIC_SUPABASE_URL="[API URL]"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[anon key]"
```

ちなみにクライアント側で使う環境変数は`NEXT_PUBLIC_`から始めないと読み込まれないので注意（結構忘れてハマりがち）

#### ついで

後で使うのでClientも入れておく

```bash
> yarn add @supabase/supabase-js
```

### Prismaの導入

#### Prismaのインストール

```bash
> yarn add --dev prisma
> yarn add @prisma/client
```

#### Prismaのセットアップ

```bash
> npx prisma init
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Dont forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

おそらく1.と2.についてはデフォルトのままで問題なく、3.についてはDBが空なので不要。

ということで適当なスキーマを追加してマイグレーションしてみる。

schema.prisma(追加)

```prisma
model User {
  userId   String   @id @default(cuid())
  name     String?
}
```

```bash
> npx prisma migrate dev

nter a name for the new migration: ... init
Applying migration `20230526041753_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230526041753_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (4.14.1 | library) to .\node_modules\@prisma\client in 45ms
```

デフォルトなら`localhost:54323`でsupabaseの管理画面が開けるので、Tableタブからテーブルが作成できていることを確認する。

### supabaseによる認証のセットアップ

とりあえずGoogleログインだけ実装する。OAuthなら他のプロバイダーでも大体同じ感じ。

メールアドレス認証とかがしたい場合はまた別で記事を書くかもしれませんが、探せば多分たくさんあります。

#### バックエンド側の設定

[Google Cloud Platform](https://cloud.google.com/)にアクセスして、サインインして、右上「コンソール」 > 左上「プロジェクトの選択」 > 「新しいプロジェクト」からプロジェクトを作成する。プロジェクト名や場所はよしなに。

プロジェクトを作成して、プロジェクト画面を開いたら、「APIとサービス」 > 「OAuth同意画面」から、「外部」を選択して作成ボタンを押す。必要情報を入力してとりあえず保存。

左側「認証情報」> 上部「認証情報の作成」 > 「OAuth クライアント ID」から「ウェブアプリケーション」を選択し、名前を入力。

次に、新しいタブでsupabaseのサイトにアクセスし、管理画面のAuthentication > Providers > GoogleのRedirect URLをコピーしておく。

Google Cloud Platformのタブに戻ってきて、「承認済みのリダイレクト URI」にコピーした文字列をそのまま貼り付ける。

ローカル開発用に`http://localhost:54321/auth/v1/callback`も追加する。

「保存」をクリックすると`Client ID`と`Client Secret`が表示されるので、これらをsupabaseのタブにある対応するテキストボックスにペーストする。

ローカルで認証を走らせるため、`supabase/config.toml`に以下を追加。

```toml
[auth.external.google]
enabled = true
client_id = "..."
secret = "..."
```

ローカル環境のsupabaseを再起動する。

```bash
> supabase stop
> supabase start
```

#### フロントエンド側の設定

### GraphQLの導入

GraphQLのでは、サーバーにapollo server、Typescriptを用いたスキーマ記述にpothos、クライアント側のライブラリにapollo client、型生成にGraphQL Code Generatorを使う。

とりあえず一通り入れる。

```bash
> yarn add @apollo/server graphql @as-integrations/next
> yarn add @pothos/core @pothos/plugin-prisma graphql-scalars
> yarn add --dev @graphql-codegen/cli
```

```bash
> yarn graphql-code-generator init
yarn run v1.22.19
$ C:\Users\hi089\Documents\next-app-template\node_modules\.bin\graphql-code-generator init

    Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.

? What type of application are you building? Application built with React
? Where is your schema?: (path or url) http://localhost:4000
? Where are your operations and fragments?: src/**/*.tsx
? Where to write the output: src/gql/
? Do you want to generate an introspection file? Yes
? How to name the config file? codegen.ts
? What script in package.json should run the codegen? codegen
Fetching latest versions of selected plugins...

    Config file generated at codegen.ts

      $ npm install

    To install the plugins.

      $ npm run codegen

    To run GraphQL Code Generator.
```
