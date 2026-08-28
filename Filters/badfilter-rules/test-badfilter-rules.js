/* global QUnit */

/**
 * Before doing the test, import test-badfilter-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-badfilter-rules-filter')).display === 'none';

    QUnit.test("Case 1: $badfilter rule test", function (assert) {
        const imageDisplayed = getComputedStyle(document.querySelector("#case1 > img")).display !== "none";
        assert.ok(adgCheck && imageDisplayed, "$badfilter rule should disable the rule to which it refers.");
    });

    QUnit.test("Case 2: $badfilter exception rule test", function (assert) {
        const testImg = document.querySelector("#case2 > img");
        const isBlocked = !testImg
            || (getComputedStyle(testImg).display === "none")
            || (getComputedStyle(testImg).height === "0px");
        assert.ok(isBlocked, "$badfilter exception rule should disable the exception rule to which it refers.");
    });

    QUnit.test("Case 3: $badfilter rule test with $domain modifier", function (assert) {
        const imageDisplayed = getComputedStyle(document.querySelector("#case3 > img")).display !== "none";
        assert.ok(adgCheck && imageDisplayed, "$badfilter rule should disable the rule with $domain modifier to which it refers.");
    });
});
