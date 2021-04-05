/* global QUnit */

/**
 * Before doing the test, import test-jsinject-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-jsinject-rules-filter'), null).display === 'none';

    QUnit.test('1. Test script rule', (assert) => {
        assert.ok(adgCheck && !document.__jsinjectTest);
    });
});
