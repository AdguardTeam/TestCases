/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */

window.addEventListener('load', function () {

    QUnit.test("Case 1: using with exception rules including $generichide and $elemhide modifiers for a same request", assert => {
        const element1 = document.getElementById("case1-block1").textContent;
        const element2 = document.getElementById("case1-block2").textContent;
        const expect1 = "$generichide rule doesn't block a $replace rule."
        const expect2 = "$elemhide rule doesn't block a $replace rule."
        assert.ok(element1 == expect1 && element2 == expect2, "PASSED! exception rules with $generichide or $elemhide modifiers don't disable the $replace rule");
    });

});