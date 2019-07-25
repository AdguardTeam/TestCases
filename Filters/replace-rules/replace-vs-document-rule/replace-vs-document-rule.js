/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', function () {

    QUnit.test("Case 1: using with exception rule including $document modifier for a same request", assert => {
        const block1 = document.getElementById("case1-block1").textContent;
        const block2 = getComputedStyle(window.document.getElementById("case1-block2"), null).display == "block";
        assert.ok(block1 != "replace rule works" && block2, "PASSED! exception rule with $document modifier disables the $replace rule");
    });

});