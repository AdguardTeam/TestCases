/* global QUnit */

/**
 * Before doing the test, import test_filter.txt to Adguard
 */

window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(
        window.document.getElementById('subscribe-to-test-ping-rules-filter'),
        null
    ).display === 'none';

    QUnit.test('1. Test $ping modifier', (assert) => {
        assert.ok(adgCheck && navigator.sendBeacon('https://adguard.com', 'Testdata'), 'Rule with $ping modifier blocks navigator.sendBeacon request, check the devtools console');
    });
});
