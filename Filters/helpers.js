/**
 * Some tests are not supported by some products.
 * For integration tests they may be passed in the query string.
 */
const EXCEPTIONS_QUERY_KEY = 'exceptions';

/**
 * Parses exceptions for test page from query string.
 *
 * @param {string} windowLocation window.location string.
 *
 * @returns {number[]} List of testcase ids to skip.
 */
const getExceptions = (windowLocation) => {
    const url = new URL(windowLocation);
    const exceptions = url.searchParams.get(EXCEPTIONS_QUERY_KEY);
    return !!exceptions
        ? exceptions.split(',').map((ex) => Number(ex))
        : [];
};

/**
 * Returns QUnit test runner due to exceptions.
 *
 * @param {number} testId Testcase id.
 * @param {number[]} testExceptions List of testcase ids to skip.
 * @returns
 */
const getQunitRunner = (testId, testExceptions) => {
    return testExceptions && testExceptions.includes(testId)
        ? QUnit.skip
        : QUnit.test;
};

/**
 * QUnit test runner callback.
 *
 * @callback QunitTestRunner
 * @param {number} id Testcase id.
 * @param {string} name Testcase name.
 * @param {(assert: Assert) => void | Promise<void>} callback Function to close over assertions.
 */

/**
 * Returns QUnit test runner for the test page.
 *
 * @param {string} windowLocation window.location string.
 *
 * @returns {QunitTestRunner} QUnit test runner:
 * `QUnit.skip()` for testcase exceptions passed in the query string,
 * `QUnit.test()` otherwise.
 */
export const getAgTestRunner = (windowLocation) => {
    const exceptions = getExceptions(windowLocation);

    return (id, name, callback) => {
        const testRunner = getQunitRunner(id, exceptions)
        // the testcase id should be displayed explicitly
        // because QUnit may change the order of tests
        testRunner(`Testcase ${id} — ${name}`, callback);
    };
}
