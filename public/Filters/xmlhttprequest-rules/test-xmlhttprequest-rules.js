/* global QUnit */

/**
 * Before doing the test, import test-xmlhttprequest-rules.txt to Adguard
 */

window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(
        window.document.getElementById('subscribe-to-test-xmlhttprequest-rules-filter'),
        null
    ).display === 'none';

    // const download = async (url) => {
    //     const response = await fetch(url);
    //     const responseText = await response.text();
    //     return responseText;
    // };

    const request = async url => fetch(url, { mode: 'no-cors' });

    QUnit.test('1. Test $xmlhttprequest modifier', async (assert) => {
        try {
            await request('https://adguard-vpn.com');
            assert.ok(false, 'Rule with $xmlhttprequest should block xmlhttprequest request');
        } catch (e) {
            assert.ok(true, 'Rule with $xmlhttprequest blocks xmlhttprequest request');
        }
    });
});
