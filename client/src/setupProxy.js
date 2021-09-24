const { createProxyMiddleware } = require("http-proxy-middleware");

let baseUrl

process.env.NODE_ENV === "production"
	? baseUrl = "http://localhost:3000"
	: baseUrl = "http://localhost:5000"

module.exports = function (app) {
  app.use(
    ["/api", "/auth", "connect", "/unlink", "/connect", "/webhook"],
    createProxyMiddleware({
      target: baseUrl,
      changeOrigin: true,
    })
  );
};
