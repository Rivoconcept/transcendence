const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://node-backend:3000',
      changeOrigin: true,
    })
  );
};


/*
Quand utiliser setupProxy.js :

    En dev, avec npm start dans React

    Permet de faire un proxy vers le backend pour éviter les problèmes de CORS

    Exemple : React dev server sur localhost:3000, backend Docker sur localhost:3000 → proxy /api
*/