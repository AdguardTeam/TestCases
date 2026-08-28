/**
 * Before doing the test, import test-important-vs-urlblock.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-important-vs-urlblock-filter'), null).display == 'none';

    QUnit.test("Case 3: $important rule vs $urlblock exception", function (assert) {
        const imageDisplayed = getComputedStyle(document.querySelector("#case3 > img"), null).display !== "none";
        assert.ok(adgCheck && imageDisplayed, "$urlblock exception should disable $important rule.");
    });
});