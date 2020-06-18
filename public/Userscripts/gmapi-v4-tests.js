/**
 * Before doing the test, install Greasemonkey API v4 Tester userscrip
 */
window.addEventListener('load', () => {

    if (!window.GmTests) {
        alert('You need to have Greasemonkey API v4 Tester userscript installed!');
        return;
    }

    const startTest = (testName, assert) => {
        const testFunction = window.tests[testName];
        assert.ok(testFunction);
        testFunction(assert);
    };

    QUnit.test("GM.info", async (assert) => {
        startTest('GM.info', assert);
    });

    QUnit.test("GM.setValue", async (assert) => {
        startTest('GM.setValue', assert);
    });

    QUnit.test("GM.deleteValue", async (assert) => {
        startTest('GM.deleteValue', assert);
    });

    QUnit.test("GM.listValues", async (assert) => {
        startTest('GM.listValues', assert);
    });

    QUnit.test("GM.getResourceURL", (assert) => {
        startTest('GM.getResourceURL', assert);
    });

    QUnit.test("GM.xmlhttpRequest", (assert) => {
        startTest('GM.xmlhttpRequest', assert);
    });
});
