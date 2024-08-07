const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
    app.use(
        '/httpbin',
        createProxyMiddleware({
            target: 'https://httpbin.agrd.dev/',
            changeOrigin: true,
            pathRewrite: { '^/httpbin': '' },
            secure: true,
            ws: true,
        }),
    );
};
