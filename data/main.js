/* Not working, making load time longer, revisit later.
function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    console.log(`${http.status} ${url} `)
    return http.status != 404;
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        try {
            process.versions['electron'];
        } catch {
            for (var i = 0; i < assets.length; i++) {
                urlExists(assets[i]);
            }

            navigator.serviceWorker
                .register("scripts/service-worker.js")
                .then(res => console.log("service worker registered"))
                .catch(err => console.log("service worker not registered", err))
        }
    })
}
*/