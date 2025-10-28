import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Manual CSP Test 2: Load external image (should be blocked by CSP)
 */
const testBlockedImage = () => {
    const container = document.getElementById('image-container');
    if (container) container.innerHTML = '<p>Loading external image (should be blocked)...</p>';

    const img = document.createElement('img');
    img.src = 'https://httpbin.agrd.dev/image/png'; // External image - violates CSP
    img.style.display = 'none';

    img.onload = () => {
        const statusEl = document.getElementById('blocked-status');
        if (statusEl) statusEl.textContent = 'LOADED (CSP not working?) ⚠️';
        if (container) {
            container.innerHTML = '⚠️ External image loaded unexpectedly!';
            container.appendChild(img);
        }
    };

    img.onerror = () => {
        const statusEl = document.getElementById('blocked-status');
        if (statusEl) statusEl.textContent = 'BLOCKED BY CSP ✓';
        if (container) container.innerHTML = '✅ External image correctly blocked by CSP!';
    };

    if (container) container.appendChild(img);
};

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

    if (blockedBtn) {
        blockedBtn.addEventListener('click', () => {
            testBlockedImage();
        });
    }

    agTest(1, 'CSP allowed image loading test', async (assert) => {
        const result = await testAllowedImageAutomated();

        assert.ok(result, 'Allowed image (data URI) should load successfully');
    });
});
