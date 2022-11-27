const { createProxyMiddleware } = require("http-proxy-middleware");

let baseUrl

process.env.NODE_ENV === "production"
	? baseUrl = "http://localhost:3000"
	: baseUrl = "http://192.168.100.17:5000"

module.exports = function (app) {
  app.use(
    ["/api", "/auth", "connect", "/unlink", "/connect", "/webhook"],
    createProxyMiddleware({
      target: baseUrl,
      changeOrigin: true,
    })
  );
};
