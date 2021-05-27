/* global QUnit */

/**
 * Before doing the test, import test-websockets.txt to Adguard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-websockets-filter'), null).display === 'none';

    QUnit.test('1. Test valid websocket connection', (assert) => {
        if (!window.WebSocket) {
            assert.ok(true, 'Browser does not support WebSocket');
            return;
        }

        const done = assert.async();
        // eslint-disable-next-line compat/compat
        const ws = new WebSocket('wss://websocket-echo.agrd.workers.dev/ws?valid');

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

    QUnit.test('2. Test blocking simple websocket connection', (assert) => {
        if (!window.WebSocket) {
            assert.ok(true, 'Browser does not support WebSocket');
            return;
        }

        // const finished = false;
        const done = assert.async();
        // eslint-disable-next-line compat/compat
        const ws = new WebSocket('wss://websocket-echo.agrd.workers.dev/ws?blocked');

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
