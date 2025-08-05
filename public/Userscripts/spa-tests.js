/* global QUnit */

function navigate(path) {
    history.pushState({}, '', path);
}

/**
 * Note: "install test userscript" alert will be hidden only on route navigation.
 */
window.addEventListener('load', function() {
    const initialPath = window.location.pathname;
    const testPath = '/Userscripts/spa-tests/test-nav';

    // Create userscript execution counter
    window.spaUserscriptExecutedCounter = 0;

    function getExecutedCounters() {
        return window.spaUserscriptExecutedCounter;
    }

    function waitForUserscriptExecution(timeout = 200) {
        const before = getExecutedCounters();

        return new Promise((resolve) => {
            const startTime = Date.now();

            const checkExecution = () => {
                if (Date.now() - startTime > timeout) {
                    resolve(false);
                    return;
                }

                if (getExecutedCounters() !== before) {
                    resolve(true);
                } else {
                    setTimeout(checkExecution, 10); // Check again after 10ms
                }
            };

            checkExecution();
        });
    }

    QUnit.test('userscript should correctly execute on spa navigation', async (assert) => {
        assert.equal(getExecutedCounters(), 0, 'before navigation userscript should not be executed');

        // Navigate to the test page
        navigate(testPath);

        // Wait for the userscript execution
        const executed1 = await waitForUserscriptExecution();

        // Check if the userscript was executed
        assert.ok(executed1, 'userscript should be executed');
        assert.equal(getExecutedCounters(), 1, 'userscript execution count should be 1');

        // Check if "install test userscript" alert exists
        const alert = document.getElementById('install-test-userscript');
        assert.ok(alert, 'Alert should exist');

        // Check if "install test userscript" alert is hidden
        const computedStyle = window.getComputedStyle(alert);
        assert.equal(computedStyle.display, 'none', 'Alert should be hidden');

        // Return to the initial path
        navigate(initialPath);

        // And navigate back to the test page
        navigate(testPath);

        // Wait for the userscript execution
        const executed2 = await waitForUserscriptExecution();

        // Check if the userscript was executed again
        assert.notOk(executed2, 'userscript should not be executed again');
        assert.equal(getExecutedCounters(), 1, 'userscript execution count should still be 1');

        // Navigate to the initial path
        navigate(initialPath);
    });
});
