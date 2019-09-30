/* global QUnit */
/**
 * Before doing the test, import test-redirect-rules.txt to AdGuard
 */

const download = (url) => {
    return new Promise((resolve, reject) => {
        const typeCheck = new XMLHttpRequest();
        typeCheck.open("GET", url, true);
        typeCheck.send();
        typeCheck.onload = () => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            if (typeCheck.getResponseHeader("Content-Type").indexOf("image") !== -1) {
                xhr.responseType = 'blob';
            }
            xhr.send();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    if (xhr.responseType === 'blob') {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result);
                        }
                        reader.readAsDataURL(xhr.response);
                    } 
                    else resolve(xhr.responseText);
                } 
                else {
                    reject(xhr.statusText);
                }
            };
        }
    })
}

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-redirect-rules-filter'), null).display === 'none';

    QUnit.test("Case 1: $redirect noopcss test", async assert => {
        const case1 = await download("/test/redirect-test.css");
        assert.ok(case1 === "", "$redirect noopcss rule works");
    });

    QUnit.test("Case 2: $redirect noopjs test", async assert => {
        const case2 = await download("/test/redirect-test.js");
        assert.ok(case2 === "(function() {})()", "$redirect noopjs rule works");
    });

    QUnit.test("Case 3: $redirect images test", async assert => {
        const case3 = await download("/test/redirect-test.jpg");
        assert.ok(case3 === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAC0lEQVQI12NgQAcAABIAAe+JVKQAAAAASUVORK5CYII=", "$redirect 2x2-transparent.png rule works");
    });

    QUnit.test("Case 4: $redirect noopframe test", async assert => {
        const case4 = await download("/test/redirect-test.html");
        assert.ok(case4.replace(/\n/g, "") === "<!DOCTYPE html><html>    <head><title></title></head>    <body></body></html>", "$redirect noopframe rule works");
    });

    QUnit.test("Case 5: $redirect nooptext test", async assert => {
        const case5 = await download("/test/redirect-test.txt");
        assert.ok(case5 === "", "$redirect nooptext rule works");
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
        assert.ok(case7 === "(function() {})()", "$redirect rule should have priority over basic rule with $important modifier");
    });

});
