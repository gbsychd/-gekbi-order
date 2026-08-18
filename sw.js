self.addEventListener("install", (event) => {

  self.skipWaiting();

});

self.addEventListener("activate", (event) => {

  event.waitUntil(self.clients.claim());

});

self.addEventListener("push", (event) => {

  let data = {};

  try {

    data = event.data ? event.data.json() : {};

  } catch (error) {

    data = {

      title: "🚨 隔壁宵夜｜新訂單",

      body: "收到新的訂單，請立即查看後台。",

    };

  }

  const title = data.title || "🚨 隔壁宵夜｜新訂單";

  const options = {

    body: data.body || "收到新的訂單，請立即查看後台。",

    icon: "/-gekbi-order/icon-192.png",

    badge: "/-gekbi-order/icon-192.png",

    // 不要求靜音，讓系統依照 iPhone 的通知設定播放通知聲

    silent: false,

    // 新訂單每筆使用不同 tag，避免新的訂單把舊訂單通知覆蓋掉

    tag: data.tag || `gekbi-order-${Date.now()}`,

    renotify: true,

    // 部分瀏覽器支援震動

    vibrate: [300, 100, 300, 100, 500],

    data: {

      url:

        data.url ||

        "https://gbsychd.github.io/-gekbi-order/admin.html",

    },

  };

  event.waitUntil(

    self.registration.showNotification(title, options)

  );

});

self.addEventListener("notificationclick", (event) => {

  event.notification.close();

  const targetUrl =

    event.notification?.data?.url ||

    "https://gbsychd.github.io/-gekbi-order/admin.html";

  event.waitUntil(

    clients.matchAll({

      type: "window",

      includeUncontrolled: true,

    }).then((clientList) => {

      for (const client of clientList) {

        if ("focus" in client) {

          client.navigate(targetUrl);

          return client.focus();

        }

      }

      if (clients.openWindow) {

        return clients.openWindow(targetUrl);

      }

    })

  );

});

self.addEventListener("notificationclose", () => {

  // 保留事件，方便未來需要統計通知時使用

});
