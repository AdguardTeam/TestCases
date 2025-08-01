/* global QUnit */

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
    return exceptions
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
        const testRunner = getQunitRunner(id, exceptions);
        // the testcase id should be displayed explicitly
        // because QUnit may change the order of tests
        testRunner(`Testcase ${id} — ${name}`, callback);
    };
};

/**
 * Checks whether the Subscribe button with the `id` displayed.
 *
 * @param {string} id Element id.
 *
 * @returns True if the element is hidden, false otherwise.
 */
export const isSubscribed = (id) => {
    const subscribeElement = window.document.getElementById(id);
    return getComputedStyle(subscribeElement, null).display === 'none';
};

/**
 * Does fetch request and checks if request is blocked:
 * - for corelibs — if response.ok is false;
 * - for browser extension — if request is failed.
 *
 * @param {string} url
 * @param {object} options
 *
 * @returns True if fetch request is blocked, false otherwise.
 */
export const isBlockedFetch = async (url, options) => {
    let isRejected;
    try {
        const response = await fetch(url, options);
        // corelibs do not reject fetch promise, response with status 500 and 'ok: false' is returned
        isRejected = !response.ok;
    } catch (e) {
        // fetch calls are simply fail if blocked by the browser extension
        isRejected = true;
    }
    return isRejected;
};

/**
 * @returns true if the browser is Safari.
 */
const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

/**
 * This is a proxy resolve function which is only required to slow down
 * iframe load event in the case of Safari.
 *
 * @param {Function} resolve Promise resolve function.
 */
const resolveProxy = (resolve) => {
    if (isSafari()) {
        // 100ms wait should be enough for Web Extension.
        setTimeout(resolve, 100);
    } else {
        resolve();
    }
};

/**
 * Waits for iframe to load and only after that calls the resolve function.
 * This function does one additional thing: slow down iframe load event in the
 * case of Safari as Web Extension is slower there and without waiting extra
 * time the tests start flapping. This is of course an ugly solution, but we
 * have a different set of tests to check for injection speed and in other
 * places we only need to check that rules are interpreted correctly.
 *
 * @param {HTMLIFrameElement} frame Iframe HTML element.
 */
export const waitIframeLoad = async (frame) => {
    return new Promise((resolve) => {
        if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
            resolveProxy(resolve);
        } else {
            frame.addEventListener('load', () => resolveProxy(resolve), { once: true });
        }
    });
};
