self.onnotificationclick = (event) => {
  console.log('[Service Worker] Notification click Received.', event);
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((browserTabList) => {
      console.log(clients, browserTabList, "list of tabs in clients");
      if (browserTabList.length > 1) {
        browserTabList.forEach((client) => {
          if (client.url === "/" && "focus" in client) return client.focus();
        })
        if (clients.openWindow) return clients.openWindow("/");
      } else {
        browserTabList[0].focus();
      }
    }).then(() => {
      clients.matchAll({ type: 'window' }).then(function (browserTabList) {
        return browserTabList.length ? browserTabList[0] : Promise.reject("No clients");
      }).then((client) => {
        if (event.action === 'button1' || event.action === 'button2') {
          client.postMessage({ action: event.action });
        }
      }).catch(e => console.log(`action selectoin failed  ${e}`))
    })
  );
};

self.addEventListener('install', function (event) {
  console.log('install', event);
  event.waitUntil(skipWaiting());
});

self.addEventListener('activate', function (event) {
  console.log('activate', event, clients);
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function (event) {
  // console.log('fetch', event);
});