/**
 * Before doing the test, install apiTester userscript
 */
window.addEventListener('load', function() {

    if (!window.tests) {
        alert('You need to have apiTester userscript installed!');
        return;
    }

    var startTest = function(testName, assert) {
        var testFunction = window.tests[testName];
        assert.ok(testFunction);
        testFunction(assert);
    };
    
    QUnit.test("GM_setValue", function(assert) {
        startTest('GM_setValue', assert);
    });

    QUnit.test("GM_getResourceText", function(assert) {
        startTest('GM_getResourceText', assert);
    });

    QUnit.test("GM_getResourceURL", function(assert) {
        startTest('GM_getResourceURL', assert);
    });

    QUnit.test("GM_addStyle", function(assert) {
        startTest('GM_addStyle', assert);
    });
});