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

    QUnit.test("Case 1: $redirect noopcss test", async assert => {
        try {
            const case1 = await download("/test/redirect-test.css");
            assert.notOk(case1, "$redirect noopcss rule doesn't work");
        }
        catch {
            assert.ok(true, "$redirect noopcss rule works");
        }
    });

    QUnit.test("Case 2: $redirect noopjs test", async assert => {
        try {
            const case2 = await download("/test/redirect-test.js");
            assert.notOk(case2, "$redirect noopjs rule doesn't work");
        }
        catch {
            assert.ok(true, "$redirect noopjs rule works");
        }
    });

    QUnit.test("Case 3: $redirect images test", async assert => {
        try {
            const case3 = await download("/test/redirect-test.jpg");
            assert.notOk(case3, "$redirect 2x2-transparent.png rule doesn't work");
        }
        catch {
            assert.ok(true, "$redirect 2x2-transparent.png rule works");
        }
    });

    QUnit.test("Case 4: $redirect noopframe test", async assert => {
        try {
            const case4 = await download("/test/redirect-test.html");
            assert.notOk(case4, "$redirect noopframe rule doesn't work");
        }
        catch {
            assert.ok(true, "$redirect noopframe rule works");
        }
    });

    QUnit.test("Case 5: $redirect nooptext test", async assert => {
        try {
            const case5 = await download("/test/redirect-test.txt");
            assert.notOk(case5, "$redirect nooptext rule doesn't work");
        }
        catch {
            assert.ok(true, "$redirect nooptext rule works");
        }
    });

    QUnit.test("Case 6: $redirect exception test", async assert => {
        try {
            const case6 = await download("/test/redirect-exception-test.png");
            assert.ok(adgCheck && case6, "$redirect exception rule should disable $redirect rule");
        }
        catch {
            assert.notOk(true, "$redirect exception rule error");
        }
    });

    QUnit.test("Case 7: $redirect priority test", async assert => {
        try {
            const case7 = await download("/test/redirect-priority-test.js");
            assert.notOk(case7, "$redirect priority test error");
        }
        catch {
            assert.ok(true, "$redirect rule should have priority over basic rule with $important modifier");
        }
    });

});