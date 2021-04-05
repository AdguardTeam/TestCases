/* global QUnit */

/**
 * Before doing the test, install apiTester userscript
 */
window.addEventListener('load', () => {
    if (!window.tests) {
        alert('You need to have apiTester userscript installed!');
        return;
    }

    const startTest = function (testName, assert) {
        const testFunction = window.tests[testName];
        assert.ok(testFunction);
        testFunction(assert);
    };

    QUnit.test('GM_info', (assert) => {
        startTest('GM_info', assert);
    });

    QUnit.test('GM_setValue', (assert) => {
        startTest('GM_setValue', assert);
    });

    QUnit.test('GM_deleteValue', (assert) => {
        startTest('GM_deleteValue', assert);
    });

    QUnit.test('GM_listValues', (assert) => {
        startTest('GM_listValues', assert);
    });

    QUnit.test('GM_getResourceText', (assert) => {
        startTest('GM_getResourceText', assert);
    });

    QUnit.test('GM_getResourceURL', (assert) => {
        startTest('GM_getResourceURL', assert);
    });

    QUnit.test('GM_addStyle', (assert) => {
        startTest('GM_addStyle', assert);
    });

    QUnit.test('GM_xmlhttpRequest', (assert) => {
        startTest('GM_xmlhttpRequest', assert);
    });
});
