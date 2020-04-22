/* global QUnit */

/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-network-rules-filter')).display === 'none';

    QUnit.test("Case 1: $network rule test", async assert => {
        const testImg = document.querySelector("#case1 > img");
        const isBlocked = (!testImg.style.display) || (getComputedStyle(testImg).width === "0px");
        assert.ok(adgCheck && isBlocked, "$network rule should block request.");
    });

    QUnit.test("Case 2: $network exception and priority test", async assert => {
        const testImg = document.querySelector("#case2 > img");
        const isBlocked = (!testImg.style.display) || (getComputedStyle(testImg).width === "0px");
        assert.ok(adgCheck && !isBlocked, "$network exception rule should disable $network rule and reject all other rules.");
    });

});
