/* global QUnit */

/**
 * Before doing the test, import test-blocking-request-rules.txt to Adguard
 */

window.addEventListener('load', () => {
    const adgCheck = window.getComputedStyle(
        window.document.getElementById('subscribe-to-test-blocking-request-rules-filter'),
        null
    ).display === 'none';

    const request = async url => fetch(url, { mode: 'no-cors' });

    QUnit.test('1. Test $ping modifier', (assert) => {
        assert.ok(adgCheck && navigator.sendBeacon('https://adguard.com', 'Testdata'), 'Rule with $ping modifier blocks navigator.sendBeacon request, check the devtools console');
    });

    QUnit.test('2. Test $xmlhttprequest modifier', async (assert) => {
        try {
            await request('https://adguard-vpn.com');
            assert.ok(false, 'Rule with $xmlhttprequest should block xmlhttprequest request');
        } catch (e) {
            assert.ok(true, 'Rule with $xmlhttprequest blocks xmlhttprequest request');
        }
    });
});
