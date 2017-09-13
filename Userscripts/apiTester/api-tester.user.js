// ==UserScript==
// @name Userscripts API Tester
// @namespace adguard
// @version      2.0
// @description AdGuard's userscripts API tester
// @match			      https://testcases.adguard.com/Userscripts/*
// @match			      http://testcases.adguard.com/Userscripts/*
// @require         https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/jquery-2.1.1.min.js
// @resource		1x1.png https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/1x1.png
// @resource        testResource.js  https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/resource.js
// @downloadURL	    https://github.com/AdguardTeam/TestCases/raw/master/Userscripts/apiTester/api-tester.user.js
// @updateURL		https://github.com/AdguardTeam/TestCases/raw/master/Userscripts/apiTester/api-tester.user.js
// @grant GM_addStyle
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_xmlhttprequest
// @grant unsafeWindow
// @run-at document-start
// ==/UserScript==
(function () {
	// Hiding "install test userscript" alert
	GM_addStyle('#install-test-userscript { display: none!important; }');

	var tests = {

		'GM_setValue': function (assert) {
			GM_setValue('int', '1');
			var value = GM_getValue('int');
			assert.equal(value, '1');
		},
		'GM_getResourceText': function (assert) {
			var resource = GM_getResourceText('testResource.js');
			assert.equal(resource, '"resource"');
		},
		'GM_getResourceURL': function (assert) {
			var resource = GM_getResourceURL('1x1.png');
			var base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEA\nAAAASUVORK5CYII=\n";
			assert.equal(resource, base64);
		},
		'GM_addStyle': function (assert) {
			var css = '#some-selector {}';
			GM_addStyle(css);
			var childs = $('head').children();
			var resultCss = childs.last().html();
			assert.equal(resultCss, css);
		},
		'GM_xmlhttprequest': function (assert) {
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