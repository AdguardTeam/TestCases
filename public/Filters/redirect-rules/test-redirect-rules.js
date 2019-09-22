/**
 * Before doing the test, import test-redirect-rules.txt to AdGuard
 */

const download = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            console.log(`URL: ${url}; STATUS: ${xhr.status}`)
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            }
            resolve(xhr.responseText);
        };
        xhr.open("GET", url, true);
        xhr.send();
    })
}

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-redirect-rules-filter'), null).display == 'none';

    QUnit.test("Case 1: $redirect noopcss test", async assert => {
        const case1 = await download("/test/redirect-test.css");
        console.log(`RESPONSE #1: ${case1}`);
        assert.equal(case1, "", "$redirect noopcss rule works");
    });

    QUnit.test("Case 2: $redirect noopjs test", async assert => {
        const case2 = await download("/test/redirect-test.js");
        console.log(`RESPONSE #2: ${case2}`);
        assert.equal(case2, "(function() {})()", "$redirect noopjs rule works");
    });

    QUnit.test("Case 3: $redirect images test", async assert => {
        const case3 = await download("/test/redirect-test.jpg");
        console.log(`RESPONSE #3: ${case3}`);
        assert.equal(case3.substring(0,4), "�PNG", "$redirect 2x2-transparent.png rule works");
    });

    QUnit.test("Case 4: $redirect noopframe test", async assert => {
        const case4 = await download("/test/redirect-test.html");
        console.log(`RESPONSE #4: ${case4}`);
        assert.equal(case4.replace(/\n/g, ""), "<!DOCTYPE html><html>    <head><title></title></head>    <body></body></html>", "$redirect noopframe rule works");
    });

    QUnit.test("Case 5: $redirect nooptext test", async assert => {
        const case5 = await download("/test/redirect-test.txt");
        console.log(`RESPONSE #5: ${case5}`);
        assert.equal(case5, "", "$redirect nooptext rule works");
    });

    QUnit.test("Case 6: $redirect exception test", async assert => {
        try {
            await download("/test/redirect-exception-test.js");
        } catch (error) {
            assert.ok(error === "Not Found" && adgCheck, "$redirect exception rule should disable $redirect rule");
        }
    });

    QUnit.test("Case 7: $redirect priority test", async assert => {
        const case7 = await download("/test/redirect-priority-test.js");
        console.log(`RESPONSE #7: ${case7}`);
        assert.equal(case7, "(function() {})()", "$redirect rule should have priority over basic rule with $important modifier");
    });

});