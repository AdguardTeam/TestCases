// ==UserScript==
// @name Userscripts API Tester
// @name:ru API Тестер Юзерскриптов
// @namespace adguard
// @version      2.0.9
// @description AdGuard's userscripts API tester
// @description:ru API тестер юзерскриптов для AdGuard
// @match  https://testcases.adguard.com/Userscripts/*
// @match  http://testcases.adguard.com/Userscripts/*
// @match  https://*.surge.sh/Userscripts/*
// @match  http://*.surge.sh/Userscripts/*
// @require         jquery-2.1.1.min.js
// @resource	    1x1.png 1x1.png
// @resource        testResource.js resource.js
// @downloadURL     https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/apiTester/api-tester.user.js
// @updateURL       https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/apiTester/api-tester.user.js
// @grant GM_info
// @grant GM_addStyle
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// @noframes
// @run-at document-start
// ==/UserScript==
(function () {
    // Hiding "install test userscript" alert
    GM_addStyle('#install-test-userscript { display: none!important; }');

    const tests = {

        GM_info(assert) {
            const info = GM_info;
            assert.equal(info.script.name, 'Userscripts API Tester');
            assert.equal(info.script.namespace, 'adguard');
            assert.ok(info.version);
        },
        GM_setValue(assert) {
            GM_setValue('int', '1');
            const value = GM_getValue('int');
            assert.equal(value, '1');
        },
        GM_deleteValue(assert) {
            GM_setValue('int', '1');
            let value = GM_getValue('int');
            assert.equal(value, '1');
            GM_deleteValue('int');
            value = GM_getValue('int');
            assert.notOk(value);
        },

        GM_listValues(assert) {
            const values = ['int1', 'int2'];
            for (var i = 0; i < values.length; i++) {
                GM_setValue(values[i], true);
            }
            const list = GM_listValues();
            assert.ok(list);
            for (var i = 0; i < values.length; i++) {
                assert.ok(list.indexOf(values[i]) >= 0);
            }
        },
        GM_getResourceText(assert) {
            const resource = GM_getResourceText('testResource.js');
            assert.equal(resource, '"привет, я resource"');
        },
        GM_getResourceURL(assert) {
            const done = assert.async();

            const resource = GM_getResourceURL('1x1.png');

            // Load retrieved image, convert to base64 and compare
            const retrievedImage = document.createElement('img');
            retrievedImage.src = resource;
            retrievedImage.onload = function () {
                assert.equal(retrievedImage.width, 1);
                assert.equal(retrievedImage.height, 1);
                // TODO: Can we compare content somehow?
                done();
            };
            retrievedImage.onerror = function () {
                assert.ok(0);
                done();
            };
        },
        GM_addStyle(assert) {
            const element = document.createElement('span');
            element.setAttribute('id', 'test-span-element');
            document.body.appendChild(element);

            const css = '#test-span-element { display: none; }';
            GM_addStyle(css);

            const computedStyle = window.getComputedStyle(element);

            assert.equal(computedStyle.display, 'none');
        },
        GM_xmlhttpRequest(assert) {
            const done = assert.async();

            GM_xmlhttpRequest({
                method: 'GET',
                url: '/Userscripts/apiTester/resource.js',
                onload(response) {
                    assert.equal(response.responseText, '"привет, я resource"');
                    done();
                },
                onerror() {
                    assert.ok(0);
                    done();
                },
            });
        },
    };

    unsafeWindow.tests = tests;
}());
