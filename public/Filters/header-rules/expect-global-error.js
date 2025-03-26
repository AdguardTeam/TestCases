/**
 * Expect parsing error to be thrown from a url that responds
 * with a Content-Type header of 'application/javascript; charset=UTF-8'.
 */
window.onerror = function onerror(msg, url) {
    return url.includes('Content-Type=application%2Fjavascript%3B+charset%3DUTF-8');
};
