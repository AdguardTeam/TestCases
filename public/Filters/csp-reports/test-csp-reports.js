import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);
const EXTERNAL_IMAGE_PNG = 'https://httpbin.agrd.dev/image/png';
const EXTERNAL_IMAGE_JPEG = 'https://httpbin.agrd.dev/image/jpeg';
const EXTERNAL_JSON_URL = 'https://httpbin.agrd.dev/json';

/**
 * Test 1: Automated test that CSP blocks external images and sends reports
 */
const testCSPBlocksExternalImage = () => {
    return new Promise((resolve) => {
        let imageBlocked = false;
        let cspReportSent = false;

        const handleViolation = (e) => {
            if (e.blockedURI === EXTERNAL_IMAGE_JPEG) {
                cspReportSent = true;

                if (imageBlocked && cspReportSent) {
                    resolve(true);
                }
            }
        };
        document.addEventListener('securitypolicyviolation', handleViolation);

        const img = document.createElement('img');

        img.onload = () => {
            resolve(false);
        };

        img.onerror = () => {
            imageBlocked = true;

            if (imageBlocked && cspReportSent) {
                resolve(true);
            }
        };
        img.src = EXTERNAL_IMAGE_JPEG;

        setTimeout(() => {
            resolve(imageBlocked && cspReportSent);
        }, 3000);
    });
};

/**
 * Test 2: Load external image (should be blocked by CSP)
 */
const testBlockedImage = () => {
    const img = document.createElement('img');
    img.src = EXTERNAL_IMAGE_PNG;

    img.onerror = () => {
        const statusEl = document.getElementById('blocked-status');
        statusEl.textContent = 'BLOCKED BY CSP. Check dev tools to see CSP report status';
    };
};

/**
 * Test 3: JSON fetch CSP violation (reports should be allowed)
 */
async function testAllowedScript() {
    const statusEl = document.getElementById('allowed-status');

    statusEl.textContent = 'Testing...';

    const response = await fetch(EXTERNAL_JSON_URL);

    if (response.ok) {
        statusEl.textContent = 'JSON LOADED (look at dev panel to see CSP report)';
    } else {
        statusEl.textContent = 'JSON LOAD FAILED (try to reload page and click test button again)';
    }
}

/**
 * Setup manual tests when page loads
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-csp-reports-filter');

    const blockedBtn = document.getElementById('test-blocked-image');
    const allowedBtn = document.getElementById('test-allowed-script');

    blockedBtn.addEventListener('click', () => {
        testBlockedImage();
    });

    allowedBtn.addEventListener('click', () => {
        testAllowedScript();
    });

    agTest(1, 'CSP blocks external image test', async (assert) => {
        const result = await testCSPBlocksExternalImage();

        assert.ok(adgCheck && result, 'External image should be blocked by CSP');
    });
});
