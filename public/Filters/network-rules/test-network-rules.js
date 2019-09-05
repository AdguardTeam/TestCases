/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-network-rules-filter')).display == 'none';

    QUnit.test("Case 1: $network rule test", function (assert) {
        const imageBlocked = document.querySelector("#case1 > img").naturalWidth === 0;
        assert.equal(imageBlocked, true, "$network rule should block image request by IP");
    });

    QUnit.test("Case 2: $network exception rule test", function (assert) {
        const imageDisplayed = document.querySelector("#case2 > img").naturalWidth !== 0;
        assert.ok(adgCheck && imageDisplayed, "$network exception rule should disable $network rule");
    });
});