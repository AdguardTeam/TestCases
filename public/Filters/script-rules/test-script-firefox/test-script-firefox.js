/* global QUnit */

/**
 * Before doing the test, import test-script-firefox.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-script-firefox-filter'), null).display === 'none';

    QUnit.test('1. Test script rule', (assert) => {
        assert.ok(adgCheck && !window.__firefoxTest1, 'Script rule works');
    });
});
