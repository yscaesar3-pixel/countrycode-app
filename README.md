# 国コード早見帳(iOSアプリ)

Capacitorで作成したiPhone専用アプリです。中身はWebアプリ(`www/`)をそのままネイティブアプリとして包んでいます。

## プロジェクト構成

```
countrycode-app/
├── www/                  ← 実際のアプリ画面(HTML/CSS/JS)。ここを直せば画面が変わる
├── ios/                  ← Xcodeプロジェクト(Capacitorが自動生成)
├── assets/               ← アイコン・スプラッシュ画面の元データ
├── capacitor.config.ts   ← アプリ名・Bundle IDなどの設定
├── codemagic.yaml        ← Codemagic用のビルド設定
└── store-icon-1024.png   ← App Store掲載用のマスターアイコン
```

- Bundle ID: `com.yutaXXX.countrycode`
- 対応デバイス: iPhoneのみ(`TARGETED_DEVICE_FAMILY = "1"` に設定済み)
- アプリ名: 国コード早見帳 / Country Code Lookup(英語UI対応済み)

## 画面の中身を直したいとき

`www/index.html` を直接編集してください。直したあとは、以下のコマンドでiOS側にも反映されます(Codemagic側でも自動実行されます)。

```
npx cap sync ios
```

## Codemagicでのビルド手順

1. このプロジェクトをGitHubリポジトリにpushする(`main`ブランチ)
2. Codemagicにログインし、このリポジトリを接続する
3. Codemagicの管理画面で、**App Store Connect Integration** を設定する(App Store ConnectのAPIキーを登録する項目です。Codemagic側の「Team settings」→「Integrations」から設定します)
4. `codemagic.yaml` の `environment.groups` に指定している `appstore_credentials` は今は空でも動きますが、署名関連の環境変数を追加したくなったらここにグループを作って登録してください
5. `main` ブランチにpushすると自動でビルドが走り、成功すると **TestFlight** に自動アップロードされます(`submit_to_app_store: false` にしているので、本審査への提出はまだされません)
6. TestFlightで実機確認 → 問題なければ `codemagic.yaml` の `submit_to_app_store` を `true` にして再度pushすると、App Store審査に提出されます

## 残っているタスク

- [ ] GitHubリポジトリを作成してpush
- [ ] Codemagicでプロジェクトを接続
- [ ] App Store Connect Integrationの設定(署名まわり)
- [ ] App Store Connect側でアプリのレコードを新規作成(Bundle IDを登録)
- [ ] スクリーンショット(iPhoneサイズのみ)の用意
- [ ] プライバシー情報の入力(データ収集なしとして申告可能)
- [ ] TestFlightでの動作確認
- [ ] 審査提出
