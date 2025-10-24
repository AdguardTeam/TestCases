import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

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

        // Cleanup after test
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, 1000);
    });
};

/**
 * Setup manual tests when page loads
 */
window.addEventListener('DOMContentLoaded', () => {
    agTest(1, 'CSP allowed image loading test', async (assert) => {
        const result = await testAllowedImageAutomated();

        assert.ok(result, 'Allowed image (data URI) should load successfully');
    });

    agTest(2, 'CSP report blocking test (automated)', async (assert) => {
        return new Promise((resolve) => {
            let reportSent = false;

            const handleViolation = () => {
                reportSent = true;
            };

            const img = document.createElement('img');
            img.style.display = 'none';
            img.src = 'https://httpbin.agrd.dev/image/png';

            img.onerror = () => {
                setTimeout(() => {
                    assert.ok(reportSent, 'CSP violation generated and report should be blocked');

                    resolve();
                }, 1000);
            };

            img.onload = () => {
                assert.ok(false, 'External image should not load due to CSP policy');

                resolve();
            };

            document.addEventListener('securitypolicyviolation', handleViolation);
            document.body.appendChild(img);
        });
    });
});
