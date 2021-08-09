/* global QUnit */

/**
 * Before doing the test, import test-blocking-request-rules.txt to Adguard
 */

window.addEventListener('load', () => {
    const adgCheck = window.getComputedStyle(
        window.document.getElementById('subscribe-to-test-blocking-request-rules-filter'),
        null
    ).display === 'none';

    // eslint-disable-next-line compat/compat
    const request = async url => fetch(url, { mode: 'no-cors' });

    QUnit.test('1. Test $ping modifier', (assert) => {
        // eslint-disable-next-line compat/compat
        assert.ok(adgCheck && navigator.sendBeacon('https://adguard.com', 'Testdata'), 'Rule with $ping modifier blocks navigator.sendBeacon request, check the devtools console');
    });

    QUnit.test('2. Test $xmlhttprequest modifier', async (assert) => {
        try {
            await request('https://adguard-vpn.com');
            assert.ok(false, 'Rule with $xmlhttprequest modifier should block xmlhttprequest request');
        } catch (e) {
            assert.ok(true, 'Rule with $xmlhttprequest modifier blocks xmlhttprequest request');
        }
    });

    QUnit.test('3. Test $websocket modifier', async (assert) => {
        // eslint-disable-next-line compat/compat
        const websocket = new WebSocket('wss://echo.websocket.org');
        websocket.onopen = () => websocket.send('Test message');
        assert.timeout(3000);

        websocket.onerror = () => {
            assert.ok(true, 'Rule with $websocket modifier blocks websocket request');
        };
    });
});
