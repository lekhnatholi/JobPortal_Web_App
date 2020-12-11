var CACHE_NAME = "pwa-task-managers";

// var urlsToCache = [
//   "/",
//   "manifest.json",
//   "favicon.ico",
//   "./assets/css/main.min.css",
//   "./assets/vendor/bootstrap/css/bootstrap.min.css",
//   "./assets/vendor/fontawesome/all.min.css",
// ];

// // Install a service worker
// this.addEventListener("install", (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// //cache first then network staragety (does not caches network response)
// this.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//      return fetch(event.request);
//     })
//   );
// });

// //cache first then network staragety (caches network response)
// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.match(event.request).then(function (response) {
//         return (
//           response ||
//           fetch(event.request).then(function (response) {
//             cache.put(event.request, response.clone());
//             return response;
//           })
//         );
//       });
//     })
//   );
// });

// Update a service worker
this.addEventListener("activate", (event) => {
  var cacheWhitelist = ["pwa-task-managers"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// network or cache strategy
// self.addEventListener("install", function (evt) {
//   console.log("The service worker is being installed.");
//   evt.waitUntil(precache());
// });

// function precache() {
//   return caches.open(CACHE_NAME).then(function (cache) {
//     return cache.addAll([
//       "/",
//       "/index.html",
//       "./manifest.json",
//       "./favicon.ico",
//       "./assets/css/main.min.css",
//       "./assets/vendor/bootstrap/css/bootstrap.min.css",
//       "./assets/vendor/fontawesome/all.min.css",
//     ]);
//   });
// }

// self.addEventListener("fetch", function (evt) {
//   console.log("The service worker is serving the asset.");

//   evt.respondWith(
//     fromNetwork(evt.request, 400).catch(function () {
//       return fromCache(evt.request);
//     })
//   );
// });

// function fromNetwork(request, timeout) {
//   return new Promise(function (fulfill, reject) {
//     var timeoutId = setTimeout(reject, timeout);

//     fetch(request).then(function (response) {
//       clearTimeout(timeoutId);
//       fulfill(response);
//     }, reject);
//   });
// }

// function fromCache(request) {
//   return caches.open(CACHE_NAME).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       return matching || Promise.reject("no-match");
//     });
//   });
// }

//cache update and refresh

self.addEventListener("install", function (evt) {
  console.log("The service worker is being installed.");
  evt.waitUntil(precache());
});

function precache() {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll([
      "/",
      "/index.html",
      "./manifest.json",
      "./favicon.ico",
      "./assets/css/main.min.css",
      "./assets/vendor/bootstrap/css/bootstrap.min.css",
      "./assets/vendor/fontawesome/all.min.css",
    ]);
  });
}

self.addEventListener("fetch", function (evt) {
  console.log("The service worker is serving the asset.");
  evt.respondWith(fromCache(evt.request));

  evt.waitUntil(update(evt.request).then(refresh));
});

function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        return response;
      });
    });
  });
}

function fromCache(request) {
  return caches.match(request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      //else fetch form network
      return fetch(request);
    });
 
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: "refresh",
        url: response.url,
        eTag: response.headers.get("ETag"),
      };

      client.postMessage(JSON.stringify(message));
    });
  });
}
