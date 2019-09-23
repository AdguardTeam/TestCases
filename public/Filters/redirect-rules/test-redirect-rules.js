/**
 * Before doing the test, import test-redirect-rules.txt to AdGuard
 */

const download = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(btoa(unescape(encodeURIComponent(xhr.responseText))));
            } else {
                reject(xhr.statusText);
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
        assert.equal(case1, "", "$redirect noopcss rule works");
    });

    QUnit.test("Case 2: $redirect noopjs test", async assert => {
        const case2 = await download("/test/redirect-test.js");
        assert.equal(case2, "(function() {})()", "$redirect noopjs rule works");
    });

    QUnit.test("Case 3: $redirect images test", async assert => {
        const case3 = await download("/test/redirect-test.jpg");
        // const tmp = btoa(case3.charCodeAt(0));
        const tmp = btoa(unescape(encodeURIComponent(case3)));
        console.log(`RESPONSE #3: ${case3}`);
        // console.log(`EXPECT #3: ${exp}`);
        assert.equal(tmp, "NjU1MzM=", "$redirect 2x2-transparent.png rule works");
    });

    QUnit.test("Case 4: $redirect noopframe test", async assert => {
        const case4 = await download("/test/redirect-test.html");
        assert.equal(case4.replace(/\n/g, ""), "<!DOCTYPE html><html>    <head><title></title></head>    <body></body></html>", "$redirect noopframe rule works");
    });

    QUnit.test("Case 5: $redirect nooptext test", async assert => {
        const case5 = await download("/test/redirect-test.txt");
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
        assert.equal(case7, "(function() {})()", "$redirect rule should have priority over basic rule with $important modifier");
    });

});