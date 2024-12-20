// ==UserScript==
// @name            Userscripts CSP Tester
// @name:ru         CSP Тестер Юзерскриптов
// @description     Adguard's userscripts CSP tester
// @description:ru  CSP тестер юзерскриптов для AdGuard
// @namespace       adguard
// @version         0.0.1
// @match           https://testcases.agrd.dev/userscripts-csp/*
// @match           http://testcases.agrd.dev/userscripts-csp/*
// @match           https://local.testcases.agrd.dev/userscripts-csp/*
// @match           http://local.testcases.agrd.dev/userscripts-csp/*
// @match           https://*.pages.dev/userscripts-csp/*
// @match           http://*.pages.dev/userscripts-csp/*
// @grant           none
// @run-at          document-end
// @downloadURL     https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/cspTester/csp-tester.user.js
// @updateURL       https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Userscripts/cspTester/csp-tester.user.js
// ==/UserScript==

/**
 * This script is used to test different CSP configurations.
 * It tries to inject different types of payloads and checks if they are executed or blocked by the CSP.
 * It also tests the same payloads with trusted types if supported.
 * The results are printed to the console.
 * The script is intended to be used with the CSP test page.
 * Also, try to switch to `@grant unsafeWindow` to test sandboxed execution.
 */

(function () {
    let policy = null;
    try {
        console.info('Creating trusted types policy');

        if (!window.trustedTypes) {
            console.warn('Trusted types not supported');
        } else {
            policy = window.trustedTypes.createPolicy('AGPolicy', {
                createHTML: (input) => input,
                createScript: (input) => input,
                createScriptURL: (input) => input,
            });
            console.info('Trusted types policy created');
        }
    } catch (e) {
        console.error('Creating trusted types policy failed:', e);
    }

    function test(name, converter, caseExecutor) {
        try {
            console.info(`\n\nTesting "${name}":`);
            caseExecutor((input) => input);
            console.info(`Test "${name}" passed`);
        } catch (e) {
            console.error(`Testing "${name}" failed:`, e);
        }

        if (!policy) {
            return;
        }

        try {
            console.info(`Testing "${name}" with trusted types:`);
            switch (converter) {
                case 'script':
                    caseExecutor((input) => policy.createScript(input));
                    break;
                case 'scriptURL':
                    caseExecutor((input) => policy.createScriptURL(input));
                    break;
                case 'html':
                    caseExecutor((input) => policy.createHTML(input));
                    break;
            }
            console.info(`Test "${name}" with trusted types passed`);
        } catch (e) {
            console.error(`Testing "${name}" with trusted types failed:`, e);
        }
    }

    test('eval', 'script', (converter) => {
        eval(converter('console.log("Eval executed")'));
    });

    test('inline script', 'script', (converter) => {
        const script = document.createElement('script');
        script.textContent = converter('console.log("Inline script executed")');
        document.body.appendChild(script);
    });

    test('inline script with nonce', 'script', (converter) => {
        const script = document.createElement('script');
        script.textContent = converter('console.log("Inline script with nonce executed")');
        script.nonce = 'AGTEST';
        document.body.appendChild(script);
    });

    test('inline script src', 'scriptURL', (converter) => {
        const script = document.createElement('script');
        script.src = converter('data:,console.log("Inline script src executed")');
        document.body.appendChild(script);
    });

    test('inline script src with nonce', 'scriptURL', (converter) => {
        const script = document.createElement('script');
        script.src = converter('data:,console.log("Inline script src with nonce executed")');
        script.nonce = 'AGTEST';
        document.body.appendChild(script);
    });

    test('inline style', 'html', (converter) => {
        const style = document.createElement('style');
        style.textContent = converter('body { background-color: red; }');
        document.head.appendChild(style);
    });

    test('inline style with nonce', 'html', (converter) => {
        const style = document.createElement('style');
        style.textContent = converter('body { background-color: red; }');
        style.nonce = 'AGTEST';
        document.head.appendChild(style);
    });

    test('inline style src', 'html', (converter) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = converter('data:text/css,body { background-color: green; }');
        document.head.appendChild(link);
    });

    test('inline style src with nonce', 'html', (converter) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = converter('data:text/css,body { background-color: green; }');
        link.nonce = 'AGTEST';
        document.head.appendChild(link);
    });

    test('inline html', 'html', (converter) => {
        const div = document.createElement('div');
        div.innerHTML = converter('<p>Inline html executed</p>');
        document.body.appendChild(div);
    });
}());
