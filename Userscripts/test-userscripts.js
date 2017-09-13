/**
 * Before doing the test, install apiTester userscript
 */
window.addEventListener('load', function() {

    if (!window.tests) {
        alert('You need to have apiTester userscript installed!');
        return;
    }
    
    QUnit.test("1. GM_setValue", function(assert) {
        
        var testFunction = window.tests.GM_setValue;
        assert.ok(testFunction);
        testFunction(assert);
    });
});