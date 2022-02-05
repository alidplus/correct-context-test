const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/post',
    createProxyMiddleware({
      target: 'https://postman-echo.com',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};