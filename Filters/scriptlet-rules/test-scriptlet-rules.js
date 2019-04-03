/* global window, QUnit */
/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */

const onError = assert => (message) => {
    const browserErrorMessage = 'Script error.';
    const nodePuppeteerErrorMessageRgx = /ReferenceError/;
    const checkResult = message === browserErrorMessage
        || nodePuppeteerErrorMessageRgx.test(message);
    assert.ok(checkResult);
};

const addAndRemoveInlineScript = (scriptText) => {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.innerText = scriptText;
    document.body.appendChild(scriptElement);
    scriptElement.parentNode.removeChild(scriptElement);
};

window.addEventListener('load', () => {
    QUnit.test('abort-on-property-write AdGuard syntax', (assert) => {
        assert.throws(
            () => {
                window.__testCase1 = 'ok';
            },
            /ReferenceError/,
            'should throw Reference error when try to access property',
        );

        assert.notOk(window.__testCase1);
    });

    QUnit.test('abort-on-property-write.js UBO syntax', (assert) => {
        assert.throws(
            () => {
                window.__testCase2 = 'ok';
            },
            /ReferenceError/,
            'should throw Reference error when try to access property',
        );

        assert.notOk(window.__testCase2);
    });

    QUnit.test('abort-on-property-write ABP syntax', (assert) => {
        assert.throws(
            () => {
                window.__testCase3 = 'ok';
            },
            /ReferenceError/,
            'should throw Reference error when try to access property',
        );
        assert.notOk(window.__testCase3);
    });

    QUnit.test('abort-current-inline-script', (assert) => {
        window.onerror = onError(assert);
        addAndRemoveInlineScript('window.__testCase4 = "ok"');
        assert.notOk(window.__testCase4, 'AdGuard syntax');

        addAndRemoveInlineScript('window.__testCase5 = "ok"');
        assert.notOk(window.__testCase5, 'UBO syntax');

        addAndRemoveInlineScript('window.__testCase6 = "ok"');
        assert.notOk(window.__testCase6, 'ABP syntax');

        window.__testCase7 = {};
        addAndRemoveInlineScript('window.__testCase7.__AG = "ok"');
        assert.notOk(window.__testCase7.__AG, 'AdGuard syntax, chained properties');

        addAndRemoveInlineScript('window.__testCase8 = "ok"');
        assert.notOk(window.__testCase8, 'AdGuard syntax, search inline script');
    });

    QUnit.test('abort-on-property-read', (assert) => {
        window.propReadCaseAG = 'propReadCaseAG';
        let propReadCaseAG;
        assert.throws(
            () => {
                propReadCaseAG = window.propReadCaseAG;
            },
            /ReferenceError/,
            'AdGuard Syntax throws error',
        );
        assert.notOk(propReadCaseAG, 'AG syntax prop remained undefined');

        window.propReadCaseUBO = 'propReadCaseUBO';
        let propReadCaseUBO;
        assert.throws(
            () => {
                propReadCaseUBO = window.propReadCaseUBO;
            },
            /ReferenceError/,
            'UBO Syntax throws error',
        );
        assert.notOk(propReadCaseAG, 'UBO syntax prop remained undefined');

        window.propReadCaseABP = 'propReadCaseABP';
        let propReadCaseABP;
        assert.throws(
            () => {
                propReadCaseABP = window.propReadCaseABP;
            },
            /ReferenceError/,
            'ABP Syntax throws error',
        );
        assert.notOk(propReadCaseABP, 'ABP syntax prop remained undefined');
    });
});
