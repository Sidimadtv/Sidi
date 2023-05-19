/* Not working, making load time longer, revisit later.
const staticQuran = "quran-all";
const assets = [
    "../../",
    "../../index.html",
    "../src/index.html",
    "../src/sura.html",
    "../src/attribution.html",
    "../src/styles/style.css",
    "../src/styles/css/fontawesome.css",
    "../src/styles/css/brands.css",
    "../src/styles/css/solid.css",
    "../src/styles/webfonts/fa-brands-400.ttf",
    "../src/styles/webfonts/fa-brands-400.woff2",
    "../src/styles/webfonts/fa-solid-900.ttf",
    "../src/styles/webfonts/fa-solid-900.woff2",
    "../src/styles/css/solid.css",
    "../src/data/en.sahih.xml",
    "../src/data/id.indonesian.xml",
    "../src/data/quran-data.xml",
    "../src/data/quran-uthmani.xml",
    "../src/scripts/main.js",
    "../src/scripts/quran.js",
    "../src/scripts/sura-list.js",
];
/*
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticQuran).then(cache => {
            for (var i = 0; i < assets.length; i++) {
                cache.add(assets[i]);
            }
        })
    )
})
 
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
        )
    })
*/
/*
try {
    process.versions['electron']
} catch {
    self.addEventListener('install', function (event) {
        console.log('Service worker installed');

        event.waitUntil(
            caches.open('staticQuran')
                .then(function (cache) {
                    console.log('Cache opened');
                    return cache.addAll(assets);
                })
                .then(function () {
                    console.log('Assets cached');
                })
                .catch(function (error) {
                    console.error('Error caching assets:', error);
                })
        );
    });

    self.addEventListener('fetch', function (event) {
        console.log('Fetch event:', event.request.url);

        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if (response) {
                        console.log('Cached response found:', response);
                        return response;
                    }

                    console.log('No cached response found, fetching from network');
                    return fetch(event.request);
                })
                .catch(function (error) {
                    console.error('Error fetching from cache:', error);
                })
        );
    });
}
*/