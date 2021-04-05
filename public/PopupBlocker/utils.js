/**
 * CustomEvent polyfill
 * from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
/* eslint-disable-next-line func-names, consistent-return */
(function () {
    if (typeof window.CustomEvent === 'function') return false;

    function CustomEvent(event, params) {
        /* eslint-disable-next-line no-param-reassign */
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}());
