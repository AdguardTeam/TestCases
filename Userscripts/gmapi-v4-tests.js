/**
 * Before doing the test, install Greasemonkey API v4 Tester userscrip
 */
window.addEventListener('load', () => {

    if (!window.GmTests) {
        alert('You need to have Greasemonkey API v4 Tester userscript installed!');
        return;
    }

    const startTest = (testName, assert) => {
        const testFunction = window.GmTests[testName];
        assert.ok(testFunction);
        testFunction(assert);
    };

    QUnit.test("GM.info", async (assert) => {
        startTest('GM.info', assert);
    });

    QUnit.test("GM.setValue and GM.getValue", async (assert) => {
        startTest('GM.setValue and GM.getValue', assert);
    });

    QUnit.test("GM.deleteValue", async (assert) => {
        startTest('GM.deleteValue', assert);
    });

    QUnit.test("GM.listValues", async (assert) => {
        startTest('GM.listValues', assert);
    });

    QUnit.test("GM.getResourceUrl", async (assert) => {
        startTest('GM.getResourceUrl', assert);
    });

    QUnit.test("GM.xmlHttpRequest", (assert) => {
        startTest('GM.xmlHttpRequest', assert);
    });

    QUnit.test("GM.notification", (assert) => {
        startTest('GM.notification', assert);
    });
});
