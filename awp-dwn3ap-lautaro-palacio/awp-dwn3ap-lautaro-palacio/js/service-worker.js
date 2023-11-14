// Verifica si la PWA ya está instalada
if ('serviceWorker' in navigator && window.matchMedia('(display-mode: standalone)').matches) {
    console.log('La PWA ya está instalada.');
  } else {
    // Registra el Service Worker
    navigator.serviceWorker.register('service-worker.js')
      .then(function (registration) {
        console.log('El registro del Service Worker fue exitoso, tiene el siguiente alcance:', registration.scope);
      })
      .catch(function (err) {
        console.log('El registro del Service Worker falló:', err);
      });
  }
  
  // service-worker.js
  var cacheEstatico = 'cache';
  var cacheDinamico = 'dynamic';
  
  self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open(cacheEstatico).then(function (cache) {
        // Almacena los recursos estáticos en el caché estático durante la instalación
        return cache.addAll([
          '/',
          'index.html',
          'css/styles.css',
          'js/api.js'
        ]);
      })
    );
  });
  
  self.addEventListener('activate', function (event) {
    console.log('SW activado', event);
  });
  
  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          // Si el recurso está en el caché estático, lo devuelve directamente
        return response;
        } else {
          // Si no está en el caché, intenta obtenerlo de la red
        return fetch(event.request)
            .then(function (networkResponse) {
            var networkResponseClone = networkResponse.clone();
              // Almacena la respuesta de la red en el caché dinámico
            caches.open(cacheDinamico).then(function (cache) {
                cache.put(event.request, networkResponseClone);
                });
                return networkResponse;
            })
            .catch(function () {
              // Si falla la solicitud a la API debido a la falta de conexión,
              // intenta recuperarla del caché estático.
                return new Response('Estás en modo offline. Por favor, revisa tu conexión a Internet.');
            });
        }
      })
    );
  });
  
  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (event.action === 'SI') {
      console.log('Me encanta esta APP');
      clients.openWindow('https://google.com');
    } else if (event.action === 'NO') {
      console.log('NO me gusta esta app');
    }
  });
  
  self.addEventListener('push', function (event) {
    const options = {
      body: event.data.text(),
      icon: 'icon.png',
      badge: 'badge.png',
    };
  
    event.waitUntil(
      self.registration.showNotification('Título de la Notificación', options)
    );
  });

  // Importa la función de envío de notificación push desde webpush.js
const { sendPushNotification } = ('js/webpush.js');

// Datos del cuerpo de la notificación
const pushSubscription = {
  endpoint: 'endpoint-from-client',
  keys: {
    auth: 'auth-key-from-client',
    p256dh: 'p256dh-key-from-client',
  },
};

const payload = JSON.stringify({ title: 'Notificación de prueba' });

// Enviar la notificación push usando la función exportada
sendPushNotification(pushSubscription, payload).catch(error => console.error(error));