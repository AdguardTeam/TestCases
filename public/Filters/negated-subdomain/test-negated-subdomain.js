/* global QUnit */

/**
 * Before doing the test, import test-negated-subdomain.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-negated-subdomain-filter')).display === 'none';

    QUnit.test('Case 1: rule with domain and negated subdomain: testing subdomain', (assert) => {
        const testElm1 = document.querySelector('#app');
        const isNotBlocked = testElm1 && (getComputedStyle(testElm1).display !== 'none');
        // test element shouldn't be blocked if rule works fine and if rule is invalid as well
        assert.ok(adgCheck && isNotBlocked, 'rule with domain and negated subdomain is valid except Safari');
    });

    QUnit.test('Case 2: rule with domain and negated subdomain: testing domain', (assert) => {
        let testResult;
        const testElm2 = document.querySelector('#case2');
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
            // test element shouldn't be blocked if rule is invalid
            testResult = testElm2 && (getComputedStyle(testElm2).display !== 'none');
        } else {
            // test element should be blocked if rule works fine
            testResult = testElm2 && (getComputedStyle(testElm2).display === 'none');
        }
        assert.ok(adgCheck && testResult, 'rule with domain and negated subdomain is valid except Safari');
    });
});
