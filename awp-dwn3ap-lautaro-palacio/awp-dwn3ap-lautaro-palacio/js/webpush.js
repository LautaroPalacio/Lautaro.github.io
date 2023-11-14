
// Importa el módulo 'web-push'
const webpush = require('web-push');

// Configuración de las claves VAPID
const vapidKeys = {
  publicKey: 'tu-clave-publica',
  privateKey: 'tu-clave-privada',
};

// Establece las claves VAPID
webpush.setVapidDetails(
  'mailto:tu-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Exporta el módulo 'web-push'
module.exports = webpush;
