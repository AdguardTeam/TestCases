import { getAgTestRunner } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * Before doing the test, import extended-css-iframejs-injection.txt to AdGuard
 */
window.addEventListener('load', () => {
    agTest(1, 'rules injection into iframe created by JS (with URL)', async (assert) => {
        const frame = document.querySelector('#case1 > #frame1');

        // Wait until the frame was fully loaded.
        await new Promise(resolve => {
            if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
                if (isSafari()) {
                    // Slow it down for Safari (Web Extension is slower there)
                    setTimeout(resolve, 50);
                } else {
                    resolve();
                }
            } else {
                frame.addEventListener('load', resolve, { once: true });
            }
        });

        const innerDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(
            innerDoc.querySelector('#inframe1').style.display === 'none',
            'Extended CSS rules should work inside of iframes created by JS',
        );
    });

    agTest(2, 'rules injection into iframe created by JS (about:blank)', async (assert) => {
        const frame = document.querySelector('#case2 > #frame2');

        // Wait until the frame was fully loaded.
        await new Promise(resolve => {
            if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
                if (isSafari()) {
                    // Slow it down for Safari (Web Extension is slower there)
                    setTimeout(resolve, 50);
                } else {
                    resolve();
                }
            } else {
                frame.addEventListener('load', resolve, { once: true });
            }
        });

        const innerDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(
            innerDoc.querySelector('#inframe2').style.display === 'none',
            'Extended CSS rules should work inside of iframes created by JS',
        );
    });

    agTest(3, 'rules injection into iframe created by JS (about:srcdoc)', async (assert) => {
        const frame = document.querySelector('#case3 > #frame3');

        // Wait until the frame was fully loaded.
        await new Promise(resolve => {
            if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
                if (isSafari()) {
                    // Slow it down for Safari (Web Extension is slower there)
                    setTimeout(resolve, 50);
                } else {
                    resolve();
                }
            } else {
                frame.addEventListener('load', resolve, { once: true });
            }
        });

        const innerDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(
            innerDoc.querySelector('#inframe3').style.display === 'none',
            'Extended CSS rules should work inside of iframes created by JS',
        );
    });
});
