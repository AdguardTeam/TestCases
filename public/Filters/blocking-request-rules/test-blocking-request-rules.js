import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-blocking-request-rules.txt to AdGuard
 */

window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-blocking-request-rules-filter');

    agTest(1, '$ping modifier', (assert) => {
        assert.ok(
            // eslint-disable-next-line compat/compat
            adgCheck && navigator.sendBeacon('https://adguard.com', 'Testdata'),
            'Rule with $ping modifier blocks navigator.sendBeacon request, check the devtools console',
        );
    });

    agTest(2, '$xmlhttprequest modifier', async (assert) => {
        await assert.rejects(
            // eslint-disable-next-line compat/compat
            fetch('https://adguard-vpn.com', { mode: 'no-cors' }),
            'Rule with $xmlhttprequest modifier should block xmlhttprequest request',
        );
    });

    agTest(3, '$websocket modifier', (assert) => {
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
