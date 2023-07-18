import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const PORT = process.env.PORT || 4000;
const IS_HTTPS = Boolean(process.env.HTTPS);
const SSL_KEY_FILE_PATH = process.env.SSL_KEY_FILE || 'cert/key.pem';
const SSL_CRT_FILE_PATH = process.env.SSL_CRT_FILE || 'cert/cert.pem';

function createProxyServer(listener: http.RequestListener) {
    if (!IS_HTTPS) {
        return http.createServer(listener);
    }

    const privateKey = fs.readFileSync(SSL_KEY_FILE_PATH, 'utf8');
    const certificate = fs.readFileSync(SSL_CRT_FILE_PATH, 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    return https.createServer(credentials, listener);
}

const proxy = createProxyServer((req, res) => {
    req.pipe(http.request({
        hostname: '127.0.0.1',
        port: 8788,
        path: req.url,
        method: req.method,
        headers: req.headers,
    }, (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
        proxyRes.pipe(res);
    }));
});

proxy.listen(PORT);
