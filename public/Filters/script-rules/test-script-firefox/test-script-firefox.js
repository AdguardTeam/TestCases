/* global QUnit */

/**
 * Before doing the test, import test-script-firefox.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-script-firefox-filter'), null).display === 'none';

    QUnit.test('1. Test script rule', (assert) => {
        assert.ok(adgCheck && !window.__firefoxTest1, 'Script rule does not work in Firefox');
    });

    QUnit.test('2. Test script rule for cookie', (assert) => {
        const cookies = document.cookie;
        assert.ok(adgCheck && !cookies.includes('adg_test'), 'Script rule for cookies does not work in Firefox');
    });
});
