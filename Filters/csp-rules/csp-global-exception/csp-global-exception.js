/**
 * Before doing the test, import csp-global-exception.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-csp-global-exception-rules-filter'), null).display == 'none';

    QUnit.test("Case 1: $csp global exception (no arguments) test", function (assert) {
        assert.ok(adgCheck && document.getElementById("csp-global-exception").innerHTML == "Inline script works", "$csp exception rule should disable other $csp rules.");
        document.body.removeChild(tmp);
    });

});