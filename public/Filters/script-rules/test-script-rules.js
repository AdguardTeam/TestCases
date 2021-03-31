/* global QUnit */

/**
 * Before doing the test, import test-script-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-script-rules-filter'), null).display === 'none';

    QUnit.test('1. Test script rule', (assert) => {
        assert.ok(window.__testCase1);
    });

    QUnit.test('2. Test script rule exception', (assert) => {
        assert.ok(adgCheck && !window.__testCase2);
    });
});
