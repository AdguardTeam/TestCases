// ==UserScript==
// @name Greasemonkey API v4 Tester
// @name:ru Greasemonkey API v4 Тестер
// @namespace adguard
// @version      1.0.0
// @description AdGuard's Greasemonkey API v4 tester
// @description:ru тестер Greasemonkey API v4 для AdGuard
// @match			      https://testcases.adguard.com/Userscripts/*
// @match			      http://testcases.adguard.com/Userscripts/*
// @match			      https://*.surge.sh/Userscripts/*
// @match			      http://*.surge.sh/Userscripts/*
// @require         jquery-2.1.1.min.js
// @resource		1x1.png 1x1.png
// @resource        testResource.js resource.js
// @downloadURL     https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/GMapiV4Tester/GMapi_v4-tester.user.js
// @updateURL       https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/GMapiV4Tester/GMapi_v4-tester.user.js
// @grant GM_addStyle
// @grant GM.info
// @grant GM.setValue
// @grant GM.getValue
// @grant GM.listValues
// @grant GM.deleteValue
// @grant GM.getResourceURL
// @grant GM.xmlHttpRequest
// @grant GM.notification
// @grant unsafeWindow
// @noframes
// @run-at document-start
// ==/UserScript==
(function () {
    // Hiding "install test userscript" alert
    GM_addStyle('#install-test-userscript { display: none!important; }');

    const GmTests = {

        'GM.info': (assert) => {
            var info = GM.info;
            assert.ok(info.script.name === "Greasemonkey API v4 Tester");
            assert.ok(info.script.namespace === "adguard");
            assert.ok(info.version);
        },

        'GM.setValue and GM.getValue': async (assert) => {
            await GM.setValue('int', '1');
            const value = await GM.getValue('int');
            assert.ok(value === '1');
        },

        'GM.deleteValue': async (assert) => {
            await GM.setValue('int', '1');
            let value = await GM.getValue('int');
            assert.ok(value === '1');
            await GM.deleteValue('int');
            value = await GM.getValue('int');
            assert.notOk(value);
        },

        'GM.listValues': async (assert) => {
            const keys = ['int1', 'int2'];
            for (const key of keys) {
                await GM.setValue(key, true);
            }
            const list = await GM.listValues();
            assert.ok(list);
            for (const key of keys) {
                assert.ok(list.indexOf(key) >= 0);
            }
        },
        'GM.getResourceUrl': async (assert) => {
            const resource = await GM.getResourceUrl('1x1.png');

            // Load retrieved image, convert to base64 and compare
            const retrievedImage = document.createElement('img');
            retrievedImage.src = resource;
            retrievedImage.onload = () => {
                assert.ok(retrievedImage.width === 1);
                assert.ok(retrievedImage.height === 1);
            };
            retrievedImage.onerror = function () {
                assert.ok(0);
            };
        },
        'GM.xmlHttpRequest': (assert) => {
            GM.xmlHttpRequest({
                method: "GET",
                synchronous: true,
                url: "/Userscripts/GMapiV4Tester/resource.js",
                onload: (response) => {
                    assert.ok(response.responseText === '"привет, я resource"');
                },
                onerror: () => {
                    assert.ok(0, 'Reguest error!');
                },
            });
        },
        'GM.notification': (assert) => {
            try {
                const title = 'What is Lorem Ipsum?';
                const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                    + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s';
                GM.notification(text, title);
                assert.ok(true);
            } catch (e) {
                assert.ok(0, 'Notification error!');
            }
        },
    };

    unsafeWindow.GmTests = GmTests;
})();
