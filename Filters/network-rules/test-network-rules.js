/* global QUnit */

/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

const download = async (url) => {
    // eslint-disable-next-line compat/compat
    const response = await fetch(url);
    const responseText = await response.text();
    return responseText;
};

// eslint-disable-next-line compat/compat
const request = async url => fetch(url, { mode: 'no-cors' });

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-network-rules-filter')).display === 'none';

    QUnit.test('Case 1: $network rule test', async (assert) => {
        try {
            await request('https://94.140.14.14/');
        } catch (e) {
            assert.ok(true, '$network rule should block request');
        }
    });

    QUnit.test('Case 2: $network exception and priority test', async (assert) => {
        const result = await download('https://94.140.14.15/info.txt');
        assert.ok(adgCheck && result.startsWith('dns2-'), '$network exception rule should disable $network rule and reject all other rules.');
    });
});
