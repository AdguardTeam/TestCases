/**
 * Before doing the test, import replace-vs-elemhide-rule.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', function () {

    QUnit.test("Case 1: using with exception rule including $elemhide modifier for a same request", assert => {
        const element = document.getElementById("subscribe-to-replace-vs-elemhide-rule-filter").innerText;
        assert.equal(element, "", "Exception rule with $elemhide modifier should not disable the $replace rule");
    });

});