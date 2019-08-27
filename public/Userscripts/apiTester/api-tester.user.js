// ==UserScript==
// @name Userscripts API Tester
// @name:ru API Тестер Юзерскриптов
// @namespace adguard
// @version      2.0.9
// @description AdGuard's userscripts API tester
// @description:ru API тестер юзерскриптов для AdGuard
// @match			      https://testcases.adguard.com/Userscripts/*
// @match			      http://testcases.adguard.com/Userscripts/*
// @match			      https://*.surge.sh/Userscripts/*
// @match			      http://*.surge.sh/Userscripts/*
// @require         jquery-2.1.1.min.js
// @resource		1x1.png 1x1.png
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

	var tests = {

		'GM_info': function (assert) {
			var info = GM_info;
			assert.equal(info.script.name, "Userscripts API Tester");
			assert.equal(info.script.namespace, "adguard");
			assert.ok(info.version);
		},
		'GM_setValue': function (assert) {
			GM_setValue('int', '1');
			var value = GM_getValue('int');
			assert.equal(value, '1');
		},
		'GM_deleteValue': function (assert) {
			GM_setValue('int', '1');
			var value = GM_getValue('int');
			assert.equal(value, '1');
			GM_deleteValue('int');
			value = GM_getValue('int');
			assert.notOk(value);
		},

		'GM_listValues': function (assert) {
			var values = ['int1', 'int2'];
			for (var i = 0; i < values.length; i++) {
				GM_setValue(values[i], true);
			}
			var list = GM_listValues();
			assert.ok(list);
			for (var i = 0; i < values.length; i++) {
				assert.ok(list.indexOf(values[i]) >= 0);
			}
		},
		'GM_getResourceText': function (assert) {
			var resource = GM_getResourceText('testResource.js');
			assert.equal(resource, '"привет, я resource"');
		},
		'GM_getResourceURL': function (assert) {

			var done = assert.async();

			var resource = GM_getResourceURL('1x1.png');

			// Load retrieved image, convert to base64 and compare
			var retrievedImage = document.createElement('img');
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
		'GM_addStyle': function (assert) {
			var element = document.createElement('span');
			element.setAttribute('id', 'test-span-element');
			document.body.appendChild(element);

			var css = '#test-span-element { display: none; }';
			GM_addStyle(css);

			var computedStyle = window.getComputedStyle(element);

			assert.equal(computedStyle.display, 'none');
		},
		'GM_xmlhttpRequest': function (assert) {
			var done = assert.async();

			GM_xmlhttpRequest({
				method: "GET",
				url: "/Userscripts/apiTester/resource.js",
				onload: function (response) {
					assert.equal(response.responseText, '"привет, я resource"');
					done();
				},
				onerror: function () {
					assert.ok(0);
					done();
				}
			});
		}
	};

	unsafeWindow.tests = tests;
})();