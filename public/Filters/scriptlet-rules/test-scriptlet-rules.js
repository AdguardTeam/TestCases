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

const clearProperties = (...props) => {
    props.forEach((prop) => {
        delete window[prop];
    });
};

window.addEventListener('load', () => {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-scriptlet-rules-filter'), null).display === 'none';  

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
        let propReadCaseAG = null;
        assert.throws(
            () => {
                propReadCaseAG = window.propReadCaseAG;
            },
            /ReferenceError/,
            'AdGuard Syntax throws error',
        );
        assert.notOk(propReadCaseAG, 'AG syntax prop remained undefined');

        window.propReadCaseUBO = 'propReadCaseUBO';
        let propReadCaseUBO = null;
        assert.throws(
            () => {
                propReadCaseUBO = window.propReadCaseUBO;
            },
            /ReferenceError/,
            'UBO Syntax throws error',
        );
        assert.notOk(propReadCaseAG, 'UBO syntax prop remained undefined');

        window.propReadCaseABP = 'propReadCaseABP';
        let propReadCaseABP = null;
        assert.throws(
            () => {
                propReadCaseABP = window.propReadCaseABP;
            },
            /ReferenceError/,
            'ABP Syntax throws error',
        );
        assert.notOk(propReadCaseABP, 'ABP syntax prop remained undefined');
    });

    QUnit.test('nowebrtc', (assert) => {
        const localConnection = new RTCPeerConnection();
        const sendChannelAG = localConnection.createDataChannel('sendChannelAG');
        assert.notOk(sendChannelAG, 'AG syntax, channel is undefined');
    });

    QUnit.test('prevent-addEventListener', (assert) => {

        const sampleElement = document.createElement('div');
        const preventListenerSample = 'simple';
        sampleElement.addEventListener('click', () => {
            window[preventListenerSample] = preventListenerSample;
        });
        sampleElement.click();

        assert.strictEqual(window[preventListenerSample], preventListenerSample, 'property should defined');

        const agElement = document.createElement('div');
        const preventListenerCaseAG = 'preventListenerCaseAG';
        agElement.addEventListener('click', () => {
            window[preventListenerCaseAG] = preventListenerCaseAG;
        });
        agElement.click();

        assert.strictEqual(window[preventListenerCaseAG], undefined, 'AG syntax, after click property should be undefined');

        agElement.addEventListener('focus', () => {
            window[preventListenerCaseAG] = preventListenerCaseAG;
        });
        agElement.dispatchEvent(new Event('focus'));
        assert.strictEqual(window[preventListenerCaseAG], undefined, 'AG syntax, after focus property should be undefined');

        const uboElement = document.createElement('div');
        const preventListenerCaseUBO = 'preventListenerCaseUBO';
        uboElement.addEventListener('click', () => {
            window[preventListenerCaseUBO] = preventListenerCaseUBO;
        });
        uboElement.click();

        assert.strictEqual(window[preventListenerCaseUBO], undefined, 'UBO syntax, property should be undefined');
    });

    QUnit.test('prevent-bab', (assert) => {
        const preventBabCaseSampleEval = 'preventBabCaseSampleEval';
        eval(`(function test() { window.${preventBabCaseSampleEval} = 'test';})()`);
        assert.strictEqual(window[preventBabCaseSampleEval], 'test', 'eval function works for other scripts');

        const preventBabCase1 = 'preventBabCase1';
        eval(`(function test() { const temp = 'blockadblock'; window.${preventBabCase1} = 'test';})()`);
        assert.strictEqual(window[preventBabCase1], undefined, 'bab script did not run in the setTimeout');

        const preventBabCase2 = 'preventBabCase2';
        eval(`(function test() { const temp = 'babasbm'; window.${preventBabCase2} = 'test';})()`);
        assert.strictEqual(window[preventBabCase2], undefined, 'bab script did not run in the setTimeout');

        const preventBabCase3 = 'preventBabCase3';
        const func = `(function test(id) {window.${preventBabCase3} = 'test'})(test.bab_elementid)`;
        setTimeout(func);
        const done = assert.async();
        setTimeout(() => {
            assert.strictEqual(window[preventBabCase3], undefined, 'bab script did not run in the setTimeout');
            done();
        }, 20);
    });

    QUnit.test('prevent-setInterval AG syntax', (assert) => {
        const done = assert.async();

        window.setIntervalAGSyntax = 'value';
        const intervalId = setInterval(() => { window.setIntervalAGSyntax = 'new value'; }, 10);

        setTimeout(() => {
            assert.equal(window.setIntervalAGSyntax, 'value', 'Target property did not changed');
            clearInterval(intervalId);
            done();
        }, 15);
    });

    QUnit.test('prevent-setInterval UBO syntax', (assert) => {
        const done = assert.async();

        window.setIntervalUBOSyntax = 'value';
        const intervalId = setInterval(() => { window.setIntervalUBOSyntax = 'new value'; }, 10);

        setTimeout(() => {
            assert.equal(window.setIntervalUBOSyntax, 'value', 'Target property did not changed');
            clearInterval(intervalId);
            done();
        }, 15);
    });

    QUnit.test('prevent-setTimeout AG syntax', (assert) => {
        const done = assert.async();

        window.setTimeoutAGSyntax = 'value';

        setTimeout(() => { window.setTimeoutAGSyntax = 'new value'; }, 10);

        const property = 'setTimeoutAGSyntax';
        setTimeout(() => {
            assert.equal(window[property], 'value', 'Target property did not changed');
            done();
        }, 15);
    });

    QUnit.test('prevent-setTimeout UBO syntax', (assert) => {
        const done = assert.async();

        window.setTimeoutUBOSyntax = 'value';
        setTimeout(() => { window.setTimeoutUBOSyntax = 'new value'; }, 10);

        const property = 'setTimeoutUBOSyntax';
        setTimeout(() => {
            assert.equal(window[property], 'value', 'Target property did not changed');
            done();
        }, 15);
    });

    QUnit.test('set-constant', (assert) => {
        assert.strictEqual(window.setConstantAGSyntax, true, 'AG syntax');
        assert.strictEqual(window.setConstantUBOSyntax, true, 'UBO syntax');


        // setting constant to true;
        const trueProp = 'trueProp';
        assert.strictEqual(window[trueProp], true, trueProp);
        clearProperties(trueProp);

        // setting constant to false;
        const falseProp = 'falseProp';
        assert.strictEqual(window[falseProp], false, falseProp);
        clearProperties(falseProp);

        // setting constant to undefined;
        const undefinedProp = 'undefinedProp';
        assert.strictEqual(window[undefinedProp], undefined, undefinedProp);
        clearProperties(undefinedProp);

        // setting constant to null;
        const nullProp = 'nullProp';
        assert.strictEqual(window[nullProp], null, nullProp);
        clearProperties(nullProp);

        // setting constant to noopFunc;
        const noopFuncProp = 'noopFuncProp';
        assert.strictEqual(window[noopFuncProp](), undefined, noopFuncProp);
        clearProperties(noopFuncProp);

        // setting constant to trueFunc;
        const trueFuncProp = 'trueFuncProp';
        assert.strictEqual(window[trueFuncProp](), true, trueFuncProp);
        clearProperties(trueFuncProp);

        // setting constant to falseFunc;
        const falseFuncProp = 'falseFuncProp';
        assert.strictEqual(window[falseFuncProp](), false, falseFuncProp);
        clearProperties(falseFuncProp);

        // setting constant to number;
        const numberProp = 'numberProp';
        assert.strictEqual(window[numberProp], 111, numberProp);
        clearProperties(numberProp);

        // setting constant to empty string;
        const emptyStringProp = 'emptyStringProp';
        assert.strictEqual(window[emptyStringProp], '', emptyStringProp);
        clearProperties(emptyStringProp);

        // setting constant to illegalNumber doesn't works;
        const illegalNumberProp = 'illegalNumberProp';
        assert.strictEqual(window[illegalNumberProp], undefined, illegalNumberProp);
        clearProperties(illegalNumberProp);
    });

    QUnit.test('prevent-window-open', (assert) => {
        let result;

        const window1 = window.open('window1');
        result = window1();
        assert.equal(typeof window1, 'function', 'Prevented by string "window1"');
        assert.equal(result, undefined, 'window.open has been replaced by noopFunc (by default)');
        if (typeof window1.close === 'function') window1.close();

        const window2 = window.open('window2');
        result = window2();
        assert.equal(typeof window2, 'function', 'Prevent by regexp "/window2/"');
        assert.equal(result, undefined, 'window.open has been replaced by noopFunc');
        if (typeof window2.close === 'function') window2.close();

        const window3 = window.open('reversed');
        result = window3();
        assert.equal(typeof window3, 'function', 'Prevent by reversing to string "window"');
        assert.equal(result, undefined, 'window.open has been replaced by noopFunc');
        if (typeof window3.close === 'function') window3.close();

        const window4 = window.open('window4');
        result = window4();
        assert.ok(adgCheck && typeof window4 === 'function', 'UBO RULE: Prevent by string "window4"');
        assert.equal(result, undefined, 'window.open has been replaced by noopFunc');
        if (typeof window4.close === 'function') window4.close();

        const window5 = window.open('window5');
        result = window5();
        assert.equal(typeof window5, 'function', 'Prevent by reversing to string "anyOther"');
        assert.equal(result, undefined, 'window.open has been replaced by noopFunc');
        if (typeof window5.close === 'function') window5.close();
    });

    QUnit.test('prevent-eval-if', (assert) => {
        eval('function(preventIfTest) { window.test = "value" }');
        assert.notEqual(window.test, 'value', 'Prevent eval by string "preventIfTest"');

        eval('function(preventIfTest1) { window.test1 = "value" }');
        assert.notEqual(window.test1, 'value', 'UBO RULE: Prevent eval by string "preventIfTest1"');
    });

    QUnit.test('remove-cookie', (assert) => {
        assert.ok(adgCheck && document.cookie.indexOf('example') === -1, "All cookies was deleted");
        document.cookie = 'example=test';
        // todo check why remove-cookie with params does not work
    });

    QUnit.test('prevent-popads-net', (assert) => {
        assert.throws(() => {
            window.PopAds = 'Som value'
        }, /Reference/, 'Try to write in "PopAds" prop');

        assert.throws(() => {
            window.PopAds = 'Som value'
        }, /Reference/, 'Try to write in "popns" prop');
    });

    // no tests for
    // noeval
    // prevent-fab-3.2.0
    // set-popads-dummy
    // prevent-adfly
});
