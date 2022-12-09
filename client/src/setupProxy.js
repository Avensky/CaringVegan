const { createProxyMiddleware } = require("http-proxy-middleware");
import keys from './config';

module.exports = function (app) {
  app.use(
    ["/api", "/auth", "connect", "/unlink", "/connect", "/webhook"],
    createProxyMiddleware({
      target: keys.proxyTarget,
      changeOrigin: true,
    })
  );
};
