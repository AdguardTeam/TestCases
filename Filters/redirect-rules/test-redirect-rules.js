/* global QUnit */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-redirect-rules.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-redirect-rules-filter'), null).display === 'none';

    agTest(1, '$redirect noopcss', async (assert) => {
        const case1 = document.getElementById('case1').style.width;
        assert.ok(adgCheck && case1 !== '200px', '$redirect noopcss rule works');
    });

    agTest(2, '$redirect noopjs', async (assert) => {
        const case2 = document.getElementById('case2').innerText;
        assert.ok(adgCheck && case2 !== 'redirect test', '$redirect noopjs rule works');
    });

    agTest(3, '$redirect images', async (assert) => {
        const case3 = document.querySelector('#case3 > img').width;
        assert.ok(case3 === 2, '$redirect 2x2-transparent.png rule works');
    });

    agTest(4, '$redirect noopframe', async (assert) => {
        const frame = document.querySelector('#case4 > iframe');
        try {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const case4 = innerDoc.querySelector('#frame_inner');
            assert.ok(!case4, '$redirect noopframe rule works');
        } catch (error) {
            assert.ok(error.name === 'SecurityError', '$redirect noopframe rule works');
        }
    });

    agTest(5, '$redirect nooptext', async (assert) => {
        const frame = document.querySelector('#case5 > iframe');
        try {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const preTag = innerDoc.querySelector('body > pre');
            // Chrome adds 'pre' tag into 'body' if iframe content is text file, but FF doesn't
            const case5 = preTag
                ? preTag.innerText === 'redirect test\n'
                : innerDoc.querySelector('body').firstElementChild;
            assert.ok(!case5, '$redirect nooptext rule works');
        } catch (error) {
            assert.ok(error.name === 'SecurityError', '$redirect nooptext rule works');
        }
    });

    agTest(6, '$redirect exception', async (assert) => {
        const case6 = document.getElementById('case6').innerText;
        assert.ok(adgCheck && case6 === 'redirect test', '$redirect exception rule should disable $redirect rule');
    });

    agTest(7, '$redirect priority', async (assert) => {
        const case7 = document.getElementById('case7').innerText;
        assert.ok(case7 !== 'redirect test', '$redirect rule should have priority over basic rule with $important modifier');
    });
});
