/* global QUnit */

/**
 * Before doing the test, import test-blocking-request-rules.txt to Adguard
 */

window.addEventListener('load', () => {
    const adgCheck = window.getComputedStyle(
        window.document.getElementById('subscribe-to-test-blocking-request-rules-filter'),
        null
    ).display === 'none';

    QUnit.test('1. Test $ping modifier', (assert) => {
        assert.ok(
            // eslint-disable-next-line compat/compat
            adgCheck && navigator.sendBeacon('https://adguard.com', 'Testdata'),
            'Rule with $ping modifier blocks navigator.sendBeacon request, check the devtools console'
        );
    });

    QUnit.test('2. Test $xmlhttprequest modifier', async (assert) => {
        await assert.rejects(
            // eslint-disable-next-line compat/compat
            fetch('https://adguard-vpn.com', { mode: 'no-cors' }),
            'Rule with $xmlhttprequest modifier should block xmlhttprequest request'
        );
    });

    QUnit.test('3. Test $websocket modifier', (assert) => {
        const done = assert.async();
        // eslint-disable-next-line compat/compat
        const websocket = new WebSocket('wss://echo.websocket.org');
        websocket.onopen = () => websocket.send('Test message');
        websocket.onerror = () => {
            assert.ok(true, 'Rule with $websocket modifier blocks websocket request');
            done();
        };
        assert.timeout(3000);
    });
});
