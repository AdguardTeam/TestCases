/**
 * Before doing the test, import test-csp-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-csp-rules-filter'), null).display == 'none';

    QUnit.test("Case 1: Using with basic rules", function (assert) {
        assert.notOk(document.getElementById("csp-test") && document.getElementById("some-element"), "$csp rule should work together with basic rules.");
    });

    QUnit.test("Case 2: multiple $csp rules", function (assert) {
        const pic1 = document.getElementById("pic1").naturalWidth !== 0;
        const pic2 = document.getElementById("pic2").naturalWidth !== 0;
        const pic3 = document.getElementById("pic3").naturalWidth !== 0;
        const pic4 = document.getElementById("pic4").naturalWidth !== 0;
        assert.ok(!pic1 && !pic2 && pic3 && !pic4, "multiple $csp rules should work together.");
    });

    QUnit.test("Case 3: $scp exception and multiple $csp rules", function (assert) {
        assert.ok(adgCheck && getComputedStyle(document.querySelector("#case3"), null).display == "none", "$scp exception should disable the $csp rule with matching pattern.");
    });
});