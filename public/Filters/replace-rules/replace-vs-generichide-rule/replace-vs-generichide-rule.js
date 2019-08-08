/**
 * Before doing the test, import replace-vs-generichide-rule.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', function () {

    QUnit.test("Case 1: using with exception rule including $generichide modifier for a same request", assert => {
        const element = document.getElementById("case1-block1").textContent;
        const expect = "$generichide rule doesn't block a replace rule."
        assert.equal(element, expect, "Exception rule with $generichide modifier should not disable the $replace rule");
    });

});