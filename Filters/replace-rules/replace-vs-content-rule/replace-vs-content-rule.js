/**
 * Before doing the test, import replace-vs-content-rule.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-replace-vs-content-rule-filter'), null).display == 'none';

    QUnit.test("Case 1: using with exception rule including $content modifier for a same request", assert => {
        const block1 = document.getElementById("case1-block1").innerText;
        const block2 = getComputedStyle(window.document.getElementById("case1-block2"), null).display == "block";
        assert.ok(block1 !== "replace rule works" && block2 && adgCheck, "Exception rule with $content modifier should disable the $replace rule");
    });

});