/**
 * Before doing the test, import test-redirect-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-redirect-rules-filter'), null).display == 'none';

    QUnit.test("Case 1: $redirect CSS rule test", function (assert) {
        assert.ok(getComputedStyle(document.querySelector("#case1")).width !== "500px", "$redirect CSS rule works");
    });

    QUnit.test("Case 2: $redirect JS rule test", function (assert) {
        assert.ok(adgCheck && document.querySelector("#case2").innerText !== "JS script was here", "$redirect JS rule works");
    });
});