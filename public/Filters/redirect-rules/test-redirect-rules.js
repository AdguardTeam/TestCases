/* global QUnit */
/**
 * Before doing the test, import test-redirect-rules.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-redirect-rules-filter'), null).display === 'none';

    QUnit.test("Case 1: $redirect noopcss test", async assert => {
        const case1 = document.getElementById("case1").style.width;
        assert.ok(adgCheck && case1 !== "200px", "$redirect noopcss rule works");
    });

    QUnit.test("Case 2: $redirect noopjs test", async assert => {
        const case2 = document.getElementById("case2").innerText;
        assert.ok(adgCheck && case2 !== "redirect test", "$redirect noopjs rule works");
    });

    QUnit.test("Case 3: $redirect images test", async assert => {
        const case3 = document.querySelector("#case3 > img").width;
        assert.ok(case3 === 2, "$redirect 2x2-transparent.png rule works");
    });

    QUnit.test("Case 4: $redirect noopframe test", async assert => {
        const frame = document.querySelector("#case4 > iframe");
        try {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const case4 = innerDoc.querySelector("#frame_inner");
            assert.ok(!case4, "$redirect noopframe rule works");
        } catch (error) {
            assert.ok(error.name === "SecurityError", "$redirect noopframe rule works");
        }
    });

    QUnit.test("Case 5: $redirect nooptext test", async assert => {
        const frame = document.querySelector("#case5 > iframe");
        try {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const preTag = innerDoc.querySelector("body > pre");
            const case5 = preTag ? // Chrome adds 'pre' tag into 'body' if iframe content is text file, but FF doesn't
                preTag.innerText === "redirect test\n" :
                innerDoc.querySelector("body").firstElementChild;
            assert.ok(!case5, "$redirect nooptext rule works");
        } catch (error) {
            assert.ok(error.name === "SecurityError", "$redirect nooptext rule works");
        }
    });

    QUnit.test("Case 6: $redirect exception test", async assert => {
        const case6 = document.getElementById("case6").innerText;
        assert.ok(adgCheck && case6 === "redirect test", "$redirect exception rule should disable $redirect rule");
    });

    QUnit.test("Case 7: $redirect priority test", async assert => {
        const case7 = document.getElementById("case7").innerText;
        assert.ok(case7 !== "redirect test", "$redirect rule should have priority over basic rule with $important modifier");
    });

    /**
     * Makes second request with the same secret key and checks the result
     *
     * @param url
     * @param assert
     */
    const securityTest = async (url, assert) => {
        const response1 = await fetch(url);
        assert.ok(
            response1.status === 200
            && response1.redirected
            && response1.url.includes('?secret='),
            `First request for ${url} is ok`
        );

        try {
            const response2 = await fetch(response1.url);
            assert.ok(response2.status !== 200);
        } catch (e) {
            assert.ok(e, "Second request with the same secret key should fail");
        }
    }

    QUnit.test("Case 8: $redirect resources security test", async assert => {
        await securityTest('test-files/redirect-test.png', assert);
        await securityTest('test-files/redirect-test.txt', assert);
        await securityTest('test-files/redirect-test.js', assert);
        await securityTest('test-files/redirect-test.html', assert);
    });
});
