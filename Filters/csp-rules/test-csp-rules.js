/**
 * Before doing the test, import test-csp-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    QUnit.test("Case 1: Using with basic rules", function (assert) {
        assert.notOk(document.getElementById("csp-test") && document.getElementById("some-element"), "$csp rule should work together with basic rules.");
    });

    QUnit.test("Case 2: multiple $csp rules", function (assert) {
        assert.ok(getComputedStyle(document.querySelector("#google-logo"), null).display === "inline" && getComputedStyle(document.querySelector("#yandex-logo"), null).display === "none", "multiple $csp rules should work toghther.");
    });

    QUnit.test("Case 3: $scp exception and multiple $csp rules", function (assert) {
        assert.equal(getComputedStyle(document.querySelector("#case3"), null).display, "none", "$scp exception should disable the $csp rule with matching pattern.");
    });
});