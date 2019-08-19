/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', function() {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-websockets-filter'), null).display == 'none';

    QUnit.test("1. Test valid websocket connection", function(assert) {
        
        var done = assert.async();

        var ws = new WebSocket("wss://echo.websocket.org/?valid");

        ws.onopen = function(e) {
            assert.ok(adgCheck && 'Connection is open');
            done();
        };

        ws.onerror = ws.onclose = function(e) {
            assert.notOk('Connection error');
            done();
        };
    });

    QUnit.test("2. Test blocking simple websocket connection", function(assert) {
        
        var finished = false;
        var done = assert.async();

        var ws = new WebSocket("wss://echo.websocket.org/?blocked");

        ws.onopen = function(e) {
            assert.notOk('Connection is open');
            done();
        };

        ws.onerror = ws.onclose = function(e) {
            assert.ok('Connection is blocked');
            done();
            ws.onerror = null;
            ws.onclose = null;
        };
    });
});
