/* global QUnit */

/**
 * Before doing the test, import test-specifichide-rules.txt to AdGuard
 */

window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-specifichide-rules-filter'), null).display === 'none';

    QUnit.test('1. Test rule with specifichide modifier', (assert) => {
        const element = document.querySelector('#case-1 > .test-banner-1');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block',
            'Rule with specifichide modifier should disable basic rule');
    });

    QUnit.test('2. Test rule with specifichide modifier vs generic basic rule', (assert) => {
        const element = document.querySelector('#case-2 > .test-banner-2');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'none',
            "Rule with specifichide modifier shouldn't disable generic basic rule");
    });

    QUnit.test('3. Test rule with specifichide modifier vs generic css rule', (assert) => {
        const element = document.querySelector('#case-3 > .test-banner-3');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block' && window.getComputedStyle(element).width === '200px',
            "Rule with specifichide modifier shouldn't disable generic css rule");
    });
});
