import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

const baseUrl = 'wss://httpbin.agrd.workers.dev';

/**
 * Before doing the test, import test-websockets.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-websockets-filter');

    agTest(1, 'valid websocket connection', (assert) => {
        if (!window.WebSocket) {
            assert.ok(true, 'Browser does not support WebSocket');
            return;
        }

        const done = assert.async();
        const ws = new WebSocket(`${baseUrl}/ws?valid`);

        ws.onopen = () => {
            assert.ok(adgCheck && 'Connection is open');
            done();
        };

        /* eslint-disable-next-line no-multi-assign */
        ws.onerror = ws.onclose = () => {
            assert.notOk('Connection error');
            done();
        };
    });

    agTest(2, 'blocking simple websocket connection', (assert) => {
        if (!window.WebSocket) {
            assert.ok(true, 'Browser does not support WebSocket');
            return;
        }

        const done = assert.async();
        const ws = new WebSocket(`${baseUrl}/ws?blocked`);

        ws.onopen = () => {
            assert.notOk('Connection is open');
            done();
        };

        /* eslint-disable-next-line no-multi-assign */
        ws.onerror = ws.onclose = () => {
            assert.ok('Connection is blocked');
            done();
            ws.onerror = null;
            ws.onclose = null;
        };
    });
});
