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
// @grant unsafeWindow
// @run-at document-start
// ==/UserScript==
(function() {
	// Hiding "install test userscript" alert
	GM_addStyle('#install-test-userscript { display: none!important; }');
	
	var tests = {

		'GM_setValue': function (assert) {
			GM_setValue('int', '1');
			var value = GM_getValue('int');
			assert.equal(value, '1');
		},
		'GM_getResourceText': function(assert) {
			var resource = GM_getResourceText('testResource.js');
			assert.equal(resource, '"resource"');
		},
		'GM_getResourceURL': function(assert) {
			var resource = GM_getResourceURL('1x1.png');
			var base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEA\nAAAASUVORK5CYII=\n";
			assert.equal(resource, base64);
		},
		'GM_addStyle': function(assert) {
			var css = '#some-selector {}';
			GM_addStyle(css);
			var childs = $('head').children();
			var resultCss = childs.last().html();
			assert.equal(resultCss, css);
		}
	};

	unsafeWindow.tests = tests;
})();

// window.onerror = function () {
// 	ApiTester.error = true;
// };

// (function (open) {

// 	XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {

// 		this.addEventListener("readystatechange", function () {
// 			if (this && this.status == 500) ApiTester.error = true;
// 		}, false);

// 		open.call(this, method, url, async, user, pass);
// 	};

// })(XMLHttpRequest.prototype.open);

// var body = $('body');
// for (var testMethod in ApiTester) {
// 	if (!ApiTester.hasOwnProperty(testMethod)) continue;
// 	var currentTestFunc = ApiTester[testMethod];
// 	if (typeof (currentTestFunc) != "function") continue;
// 	var wrapFunc = function (testFunc) {
// 		var testFunc = testFunc;
// 		return function () {
// 			ApiTester.error = false;
// 			var passed = testFunc();
// 			setTimeout(function () {
// 				var text = $(this).text();
// 				$(this).text(text + ' passed:' + (passed && !ApiTester.error));
// 				ApiTester.error = false;
// 			}.bind(this), 500);
// 		}
// 	}(currentTestFunc);
// 	var link = $('<a>').text(testMethod).on('click', wrapFunc);
// 	body.append(link);
// 	body.append($('<br>'));
// }