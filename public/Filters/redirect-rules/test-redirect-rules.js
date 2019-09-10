/**
 * Before doing the test, import test-redirect-rules.txt to AdGuard
 */

const download = async (url) => {
    let response = await fetch(url);
    let responseText = await response.text();
    return responseText;
};

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-redirect-rules-filter'), null).display == 'none';

    QUnit.test("Case 1: $redirect noopcss test", function (assert) {
        assert.ok(getComputedStyle(document.querySelector("#case1")).width !== "500px", "$redirect noopcss rule works");
    });

    QUnit.test("Case 2: $redirect noopjs test", function (assert) {
        assert.ok(adgCheck && document.querySelector("#case2").innerText !== "JS script was here", "$redirect noopjs rule works");
    });

    QUnit.test("Case 3: $redirect images test", function (assert) {
        const pic1 = getComputedStyle(document.querySelector("#case3 > .pic1")).width === "1px";
        const pic2 = getComputedStyle(document.querySelector("#case3 > .pic2")).width === "2px";
        const pic3 = getComputedStyle(document.querySelector("#case3 > .pic3")).width === "3px";
        const pic4 = getComputedStyle(document.querySelector("#case3 > .pic4")).width === "32px";
        assert.ok(pic1 && pic2 && pic3 && pic4, "$redirect image rule works");
    });

    QUnit.test("Case 35: FETCH $redirect images test", async assert => {
        const case35 = await download(`${document.location.hostname}/Filters/redirect-rules/test-files/noimage.png`);
        console.log(`IMAGE: ${case35}`);
        assert.ok(case35, "$redirect image rule works");
    });

    QUnit.test("Case 4: $redirect noopframe test", function (assert) {
        assert.ok(getComputedStyle(document.querySelector("#case4 > iframe")).height === "0px", "$redirect noopframe rule works");
    });

    QUnit.test("Case 5: $redirect nooptext test", function (assert) {
        assert.ok(document.getElementById("case5").innerText === "", "$redirect nooptext rule works");
    });

    QUnit.test("Case 6: $redirect exception test", function (assert) {
        assert.ok(adgCheck && getComputedStyle(document.querySelector("#case6 > img")).height === "40px", "$redirect exception rule should disable $redirect rule");
    });

    QUnit.test("Case 7: $redirect priority test", function (assert) {
        assert.ok(getComputedStyle(document.querySelector("#case7 > img")).height === "32px", "$redirect rule should have priority over basic rule with $important modifier");
    });
});