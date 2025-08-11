/* eslint-disable no-undef */

import { getAgTestRunner, waitIframeLoad, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

function callIframeEval(iframeEl, scriptOrFn, { timeoutMs = 5000 } = {}) {
    const targetWindow = iframeEl?.contentWindow;
    if (!targetWindow) {
        throw new Error('iframe not ready');
    }

    // Accept string or Function
    let script;
    if (typeof scriptOrFn === 'function') {
        // Invoke the function in the iframe; supports sync/async functions
        script = `return (${scriptOrFn.toString()})();`;
    } else if (typeof scriptOrFn === 'string') {
        script = scriptOrFn;
    } else {
        throw new Error('scriptOrFn must be a string or Function');
    }

    const requestId = `${Date.now()}:${Math.random().toString(16).slice(2)}`;

    const request = { type: 'eval:request', requestId, script };

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            cleanup();
            reject(new Error('Iframe eval timed out'));
        }, timeoutMs);

        function cleanup() {
            clearTimeout(timer);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            window.removeEventListener('message', onMessage);
        }

        function onMessage(event) {
            const { data } = event;
            if (!data || data.type !== 'eval:response' || data.requestId !== requestId) return;

            cleanup();
            if (data.ok) {
                resolve(data.value);
            } else {
                const e = data.error || {};
                const err = new Error(e.message || 'Iframe eval error');
                err.name = e.name || 'Error';
                err.stack = e.stack || err.stack;
                reject(err);
            }
        }

        window.addEventListener('message', onMessage);
        targetWindow.postMessage(request, '*');
    });
}

/**
 * Before doing the test, import test-nonbasic-path-modifier.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-nonbasic-path-modifier');

    agTest(1, 'elemhide plain match', (assert) => {
        assert.ok(document.querySelector('#case1'), '#case1 element not found');
        const frame = document.querySelector('#case1 > [id="case1-subpage1"]');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case1');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'none',
            'Rule with subpage1 path should be found',
        );
    });

    agTest(2, 'elemhide plain no match', (assert) => {
        assert.ok(document.querySelector('#case2'), '#case2 element not found');
        const frame = document.querySelector('#case2 > [id="case2-subpage1"]');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case2');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'block',
            'Rule with subpage2 path should not be found',
        );
    });

    agTest(3, 'elemhide regex match', (assert) => {
        assert.ok(document.querySelector('#case3'), '#case3 element not found');
        const frame = document.querySelector('#case3 > [id="case3-subpage1"]');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case3');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'none',
            'Rule with sub regex path should be found',
        );
    });

    agTest(4, 'elemhide regex no match', (assert) => {
        assert.ok(document.querySelector('#case4'), '#case4 element not found');
        const frame = document.querySelector('#case4 > [id="case4-subpage1"]');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case4');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'block',
            'Rule with non-matching regex path should not be found',
        );
    });

    agTest(5, 'extended css plain match', async (assert) => {
        assert.ok(document.querySelector('#case5'), '#case5 element not found');
        const frame = document.querySelector('#case5 > [id="case5-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case5');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'none',
            'Rule with subpage1 path should be found',
        );
    });

    agTest(6, 'extended css plain no match', async (assert) => {
        assert.ok(document.querySelector('#case6'), '#case6 element not found');
        const frame = document.querySelector('#case6 > [id="case6-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case6');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'block',
            'Rule with subpage2 path should not be found',
        );
    });

    agTest(7, 'extended css regex match', async (assert) => {
        assert.ok(document.querySelector('#case7'), '#case7 element not found');
        const frame = document.querySelector('#case7 > [id="case7-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case7');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'none',
            'Rule with sub regex path should be found',
        );
    });

    agTest(8, 'extended css regex no match', async (assert) => {
        assert.ok(document.querySelector('#case8'), '#case8 element not found');
        const frame = document.querySelector('#case8 > [id="case8-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case8');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'block',
            'Rule with non-matching regex path should not be found',
        );
    });

    agTest(9, 'scriptlet plain match', async (assert) => {
        assert.ok(document.querySelector('#case9'), '#case9 element not found');
        const frame = document.querySelector('#case9 > [id="case9-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case9;
        });

        assert.ok(
            adgCheck && result,
            'Scriptlet has not been executed inside the iframe',
        );
    });

    agTest(10, 'scriptlet plain no match', async (assert) => {
        assert.ok(document.querySelector('#case10'), '#case10 element not found');
        const frame = document.querySelector('#case10 > [id="case10-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case10;
        });

        assert.ok(
            adgCheck && !result,
            'Scriptlet has been executed inside the iframe while it should not',
        );
    });

    agTest(11, 'scriptlet regex match', async (assert) => {
        assert.ok(document.querySelector('#case11'), '#case11 element not found');
        const frame = document.querySelector('#case11 > [id="case11-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case11;
        });

        assert.ok(
            adgCheck && result,
            'Scriptlet has not been executed inside the iframe',
        );
    });

    agTest(12, 'scriptlet regex no match', async (assert) => {
        assert.ok(document.querySelector('#case12'), '#case12 element not found');
        const frame = document.querySelector('#case12 > [id="case12-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case12;
        });

        assert.ok(
            adgCheck && !result,
            'Scriptlet has been executed inside the iframe while it should not',
        );
    });

    agTest(13, 'script rule plain match', async (assert) => {
        assert.ok(document.querySelector('#case13'), '#case13 element not found');
        const frame = document.querySelector('#case13 > [id="case13-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case13;
        });

        assert.ok(
            adgCheck && result,
            'Script rule has not been executed inside the iframe',
        );
    });

    agTest(14, 'script rule plain no match', async (assert) => {
        assert.ok(document.querySelector('#case14'), '#case14 element not found');
        const frame = document.querySelector('#case14 > [id="case14-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case14;
        });

        assert.ok(
            adgCheck && !result,
            'Script rule has been executed inside the iframe while it should not',
        );
    });

    agTest(15, 'script rule regex match', async (assert) => {
        assert.ok(document.querySelector('#case15'), '#case15 element not found');
        const frame = document.querySelector('#case15 > [id="case15-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case15;
        });

        assert.ok(
            adgCheck && result,
            'Script rule has not been executed inside the iframe',
        );
    });

    agTest(16, 'script rule regex no match', async (assert) => {
        assert.ok(document.querySelector('#case16'), '#case16 element not found');
        const frame = document.querySelector('#case16 > [id="case16-subpage1"]');

        // Wait until the frame was fully loaded.
        await waitIframeLoad(frame);

        const result = await callIframeEval(frame, () => {
            return window.__case16;
        });

        assert.ok(
            adgCheck && !result,
            'Script rule has been executed inside the iframe while it should not',
        );
    });
});
