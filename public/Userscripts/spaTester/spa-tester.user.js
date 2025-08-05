// ==UserScript==
// @name            Userscripts SPA Tester
// @name:ru         SPA Тестер Юзерскриптов
// @namespace       adguard
// @version         1.0.0
// @description     AdGuard's userscripts SPA tester
// @description:ru  SPA тестер юзерскриптов для AdGuard
// @match           https://testcases.agrd.dev/Userscripts/spa-tests/test-nav
// @match           http://testcases.agrd.dev/Userscripts/spa-tests/test-nav
// @match           https://local.testcases.agrd.dev/Userscripts/spa-tests/test-nav
// @match           http://local.testcases.agrd.dev/Userscripts/spa-tests/test-nav
// @match           https://*.pages.dev/Userscripts/spa-tests/test-nav
// @match           http://*.pages.dev/Userscripts/spa-tests/test-nav
// @downloadURL     https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/spaTester/spa-tester.user.js
// @updateURL       https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/spaTester/spa-tester.user.js
// @grant           GM_addStyle
// @grant           unsafeWindow
// @run-at          document-start
// @noframes
// ==/UserScript==

(function () {
    // Hiding "install test userscript" alert
    GM_addStyle('#install-test-userscript { display: none!important; }');

    // Increase execution counter
    unsafeWindow.spaUserscriptExecutedCounter += 1;
}());
