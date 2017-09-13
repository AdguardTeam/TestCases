// ==UserScript==
// @name Userscripts API Tester
// @namespace adguard
// @version      2.0.2
// @description AdGuard's userscripts API tester
// @match			      https://testcases.adguard.com/Userscripts/*
// @match			      http://testcases.adguard.com/Userscripts/*
// @require         https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/jquery-2.1.1.min.js
// @resource		1x1.png https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/1x1.png
// @resource        testResource.js  https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/resource.js
// @downloadURL	    https://github.com/AdguardTeam/TestCases/raw/master/Userscripts/apiTester/api-tester.user.js
// @updateURL		https://github.com/AdguardTeam/TestCases/raw/master/Userscripts/apiTester/api-tester.user.js
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
		'GM_deleteValue': function(assert) {
			GM_setValue('int', '1');
			var value = GM_getValue('int');
			assert.equal(value, '1');
			GM_deleteValue('int');
			value = GM_getValue('int');
			assert.notOk(value);
		},

		'GM_listValues': function(assert) {
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
			assert.equal(resource, '"resource"');
		},
		'GM_getResourceURL': function (assert) {
			var resource = GM_getResourceURL('1x1.png');
			var base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEA\nAAAASUVORK5CYII=\n";
			assert.equal(resource, base64);

			// TODO: Actually, I am not sure what should be returned here.
			// I guess instead of checking if base64 is equal, we should use some other way.
			// Create a Blob and compare its contents?
		},
		'GM_addStyle': function (assert) {
			var css = '#some-selector {}';
			GM_addStyle(css);
			var childs = $('head').children();
			var resultCss = childs.last().html();
			assert.equal(resultCss, css);
		},
		'GM_xmlhttpRequest': function (assert) {
			var done = assert.async();

			GM_xmlhttpRequest({
				method: "GET",
				url: "https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/resource.js",
				onload: function (response) {
					assert.equal(response.responseText, '"resource"');
					done();
				},
				onerror: function() {
					assert.ok(0);
					done();
				}
			});
		}
	};

	unsafeWindow.tests = tests;
})();