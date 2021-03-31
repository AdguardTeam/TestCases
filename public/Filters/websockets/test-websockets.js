/* global QUnit */

/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-websockets-filter'), null).display === 'none';

    QUnit.test('1. Test valid websocket connection', (assert) => {
        const done = assert.async();

        const ws = new WebSocket('wss://echo.websocket.org/?valid');

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
        // const finished = false;
        const done = assert.async();

        const ws = new WebSocket('wss://echo.websocket.org/?blocked');

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
