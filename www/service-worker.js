// このファイルは「サービスワーカー」と呼ばれる仕組みで、
// 一度開いたページの中身をスマホ内に保存(キャッシュ)しておき、
// 電波が悪い場所や機内モードでもアプリを開けるようにするためのものです。

const CACHE_NAME = "country-code-lookup-v1";
const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

// インストール時に、必要なファイルをまとめてキャッシュに保存する
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// 古いバージョンのキャッシュが残っていたら削除する
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ページからのリクエストがあったとき、まずキャッシュを確認し、
// なければネットワークから取得する(オフラインでも動く仕組み)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
