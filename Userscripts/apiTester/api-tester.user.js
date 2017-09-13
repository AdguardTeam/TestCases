 // ==UserScript==
// @name            Userscripts Tester
// @namespace       adguard
// @description     
// @version         1.0.2
// @require         js\jquery-2.1.1.min.js
// @resource        testResource.js  js\resource.js
// ==/UserScript==
ApiTester = {
	error: false,
	testGmSetGetValue: function () {
		GM_setValue('int', '1');
		var value = GM_getValue('int');
		return value == '1';
	},
	testGM_getResourceText: function () {
		var resource = GM_getResourceText('testResource.js');
		return resource == '"resource"';
	},
	testGM_addStyle: function () {
		var css = '#some-selector{}';
		GM_addStyle(css);
		var childs = $('head').children();
		var resultCss = childs.last().html();
		return resultCss == css;
	},
	testADG_addRule: function () {
		try {
			ADG_addRule('example.com###some-selector');
			return true;
		}
		catch (ex) {
			return false;
		}
	},
	testADG_removeRule: function () {
		try {
			ADG_removeRule('example.com###some-selector');
			return true;
		}
		catch (ex) {
			return false;
		}
	},
	testADG_temporaryDontBlock: function () {
		try {
			ADG_temporaryDontBlock();
			return true;
		}
		catch (ex) {
			return false;
		}
	},
	testADG_sendComplaint: function () {
		try {
			ADG_sendComplaint('','comment', '[SF]');
			return true;
		}
		catch (ex) {
			return false;
		}
	}
};

window.onerror = function () {
	ApiTester.error = true;
};

(function (open) {

	XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {

		this.addEventListener("readystatechange", function () {
			if (this && this.status == 500) ApiTester.error = true;
		}, false);

		open.call(this, method, url, async, user, pass);
	};

})(XMLHttpRequest.prototype.open);

var body = $('body');
for (var testMethod in ApiTester) {
	if (!ApiTester.hasOwnProperty(testMethod)) continue;
	var currentTestFunc = ApiTester[testMethod];
	if (typeof (currentTestFunc) != "function") continue;
	var wrapFunc = function (testFunc) {
		var testFunc = testFunc;
		return function () {
			ApiTester.error = false;
			var passed = testFunc();
			setTimeout(function () {
				var text = $(this).text();
				$(this).text(text + ' passed:' + (passed && !ApiTester.error));
				ApiTester.error = false;
			}.bind(this), 500);
		}
	}(currentTestFunc);
	var link = $('<a>').text(testMethod).on('click', wrapFunc);
	body.append(link);
	body.append($('<br>'));
}