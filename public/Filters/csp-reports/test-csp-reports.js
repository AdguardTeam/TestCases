import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Manual CSP Test 2: Load external image (should be blocked by CSP)
 */
const testBlockedImage = () => {
    const img = document.createElement('img');
    img.src = 'https://httpbin.agrd.dev/image/png'; // External image - violates CSP

    img.onerror = () => {
        const statusEl = document.getElementById('blocked-status');
        if (statusEl) {
            statusEl.textContent = 'BLOCKED BY CSP. Check dev tools to see CSP report status';
        }
    };
};

/**
 * Test 2: JSON fetch CSP violation (reports should be allowed)
 */
async function testAllowedScript() {
    const statusEl = document.getElementById('allowed-status');
    if (statusEl) {
        statusEl.textContent = 'Testing...';
    }

    // Create JSON fetch CSP violation
    const response = await fetch('https://httpbin.agrd.dev/json');

    if (response.ok) {
        if (statusEl) {
            statusEl.textContent = 'JSON LOADED (look at dev panel to see CSP report)';
        }
    }
}

/**
 * Automated test for allowed image loading
 */
const testAllowedImageAutomated = () => {
    return new Promise((resolve) => {
        const img = document.createElement('img');
        // 1x1 transparent GIF
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

        img.onload = () => {
            resolve(true);
        };

        img.onerror = () => {
            resolve(false);
        };

        // Add to DOM temporarily for testing
        img.style.display = 'none';
        document.body.appendChild(img);
    });
};

/**
 * Setup manual tests when page loads
 */
window.addEventListener('DOMContentLoaded', () => {
    const blockedBtn = document.getElementById('test-blocked-image');
    const allowedBtn = document.getElementById('test-allowed-script');

    blockedBtn.addEventListener('click', () => {
        testBlockedImage();
    });

    allowedBtn.addEventListener('click', () => {
        testAllowedScript();
    });

    agTest(1, 'CSP allowed image loading test', async (assert) => {
        const result = await testAllowedImageAutomated();

        assert.ok(result, 'Allowed image (data URI) should load successfully');
    });
});
