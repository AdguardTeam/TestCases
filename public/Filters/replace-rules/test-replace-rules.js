import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */

const download = async (url) => {
    const response = await fetch(url);
    const responseText = await response.text();
    return responseText;
};

window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-replace-rules-filter');

    agTest(1, 'text response', async (assert1) => {
        const case1 = await download('test-files/case1-text-response.txt');
        assert1.equal(case1, 'Test passed', '$replace rule works');
    });

    agTest(2, 'response is more then 10MB', async (assert) => {
        const case2 = await download('test-files/case2-response-over-10mb.txt');
        assert.ok(
            adgCheck && case2.substring(0, 7) === 'Adguard',
            '$replace rule should not be applied to respond more than 10MB',
        );
    });

    agTest(3, 'using with other rules (without $replace modifier) for a same request', async (assert) => {
        const case3 = await download('test-files/case3-using-with-other-rules.txt');
        assert.equal(
            case3,
            'Test passed',
            '$replace rule has higher priority over rules without $replace applied for a same request',
        );
    });

    agTest(4, 'multiple $replace rules matching a single request', async (assert) => {
        const case4 = await download('test-files/case4-multiple-replace-rules.txt');
        assert.equal(
            case4,
            'first replace rule work and second as well',
            'All $replace rules matching the same request should be applied.',
        );
    });

    agTest(5, 'disabling $replace rules', async (assert) => {
        const case5 = await download('test-files/case5-disabling-replace-rule.txt');
        assert.ok(
            adgCheck && case5 === 'Adguard',
            'Exception $replace rule should disable all other $replace rules.',
        );
    });

    agTest(6, 'multiple $replace rules and disabling', async (assert) => {
        const case6 = await download('test-files/case6-disabling-multiple-replace-rules.txt');
        assert.equal(
            case6,
            'first replace rule works',
            'Exception $replace rule should disable only $replace rule with matching pattern.',
        );
    });

    agTest(7, 'using with $script content type modifier for a same request', async (assert) => {
        const case7 = await download('test-files/case7-content-type-modifier.js');
        assert.equal(
            case7,
            'const tmp = 1',
            '$replace rule has higher priority over rules with $script content type modifier',
        );
    });
});
