/**
 * Before doing the test, import csp-global-exception.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-csp-global-exception-rules-filter'), null).display == 'none';

    QUnit.test("Case 1: Using with basic rules", function (assert) {
        assert.equal(adgCheck, true, "$csp rule should work together with basic rules.");
    });

});