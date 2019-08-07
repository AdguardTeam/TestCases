/**
 * Before doing the test, import test-csp-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-csp-rules-filter'), null).display == 'none';

    QUnit.test("Case 1: Using with basic rules", function (assert) {
        assert.notOk(document.getElementById("csp-test") && document.getElementById("some-element"), "$csp rule should work together with basic rules.");
    });

    QUnit.test("Case 2: multiple $csp rules", function (assert) {
        const pic1 = getComputedStyle(document.querySelector("#pic1"), null).height == "40px";
        const pic2 = getComputedStyle(document.querySelector("#pic2"), null).height == "40px";
        const pic3 = getComputedStyle(document.querySelector("#pic3"), null).height == "40px";
        const pic4 = getComputedStyle(document.querySelector("#pic4"), null).height == "40px";
        assert.ok(pic1 && !pic2 && !pic3 && !pic4, "multiple $csp rules should work together.");
    });

    QUnit.test("Case 3: $scp exception and multiple $csp rules", function (assert) {
        assert.ok(adgCheck && getComputedStyle(document.querySelector("#case3"), null).display == "none", "$scp exception should disable the $csp rule with matching pattern.");
    });
});