// ==UserScript==
// @name Userscripts API Tester
// @namespace adguard
// @version      2.0.3
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

	/**
	 * Helper class that converts an image into a base64 string
	 * @param {*} img Image to convert
	 */
	function getBase64Image(img) {
		// Create an empty canvas element
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
	
		// Copy the image contents to the canvas
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
	
		// Get the data-URL formatted image
		// Firefox supports PNG and JPEG. You could check img.src to
		// guess the original format, but be aware the using "image/jpg"
		// will re-encode the image.
		var dataURL = canvas.toDataURL("image/png");
	
		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}

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

			var done = assert.async();

			var resource = GM_getResourceURL('1x1.png');

			var expectedImage = document.createElement('img');
			expectedImage.src = 'https://raw.githubusercontent.com/AdguardTeam/TestCases/master/Userscripts/apiTester/1x1.png';
			expectedImage.onload = function() {

				var retrievedImage = document.createElement('img');
				retrievedImage.src = resource;
				retrievedImage.onload = function() {
					var expected = getBase64Image(expectedImage);
					var retrieved = getBase64Image(retrievedImage);
					assert.equal(retrieved, expected);
					done();
				};
				retrievedImage.onerror = function() {
					assert.ok(0);
					done();
				};
			};
			expectedImage.onerror = function() {
				assert.ok(0);
				done();
			};
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