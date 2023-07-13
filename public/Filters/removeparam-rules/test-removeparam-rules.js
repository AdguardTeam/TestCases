import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-removeparam-rules.txt to AdGuard
 */

const request = async (url, header) => {
    const headers = header || { Accept: 'text/html' };
    // eslint-disable-next-line compat/compat
    const response = await fetch(url, {
        headers,
    });
    return response;
};

const { log } = console;

// eslint-disable-next-line compat/compat
const baseUrl = window.location.origin;

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-removeparam-rules-filter');

    agTest(1, '$removeparam rule', async (assert) => {
        const testUrl = `${baseUrl}/?p1case1=true&p2case1=true`;
        log('\nCase 1:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            !result.url.includes('p1case1=true') && result.url.includes('p2case1=true'),
            '$removeparam rule removes passed parameter',
        );
    });

    agTest(2, '$removeparam with regexp', async (assert) => {
        const testUrl = `${baseUrl}/?p1case2=true&p2case2=true`;
        log('\nCase 2:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            result.url.includes('p1case2=true') && !result.url.includes('p2case2=true'),
            '$removeparam rule removes passed regexp parameter',
        );
    });

    agTest(
        3,
        'two $removeparam rules for the same request',
        async (assert) => {
            const testUrl = `${baseUrl}/?p1case3=true&p2case3=true`;
            log('\nCase 3:');
            log(`Requesting ${testUrl}`);
            const result = await request(testUrl);
            log(`result.url is ${result.url}`);
            assert.ok(
                !result.url.includes('p1case3=true') && !result.url.includes('p2case3=true'),
                'Both $removeparam rule are applied',
            );
        },
    );

    agTest(4, '$removeparam case sensitivity', async (assert) => {
        const testUrl = `${baseUrl}/?p1case4=true&P1Case4=true`;
        log('\nCase 4:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            adgCheck && result.url.includes('p1case4=true') && !result.url.includes('P1Case4=true'),
            '$removeparam is case sensitive',
        );
    });

    agTest(5, '$removeparam exception', async (assert) => {
        const testUrl = `${baseUrl}/?p1case5=true&p2case5=true`;
        log('\nCase 5:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            !result.url.includes('p1case5=true') && result.url.includes('p2case5=true'),
            '$removeparam exception prevents removing parameter',
        );
    });

    agTest(6, '$removeparam with $important', async (assert) => {
        const testUrl = `${baseUrl}/?p1case6=true&p2case6=true`;
        log('\nCase 6:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            !result.url.includes('p1case6=true') && !result.url.includes('p2case6=true'),
            '$removeparam rule with $important modifier has priority over $removeparam exception rule',
        );
    });

    agTest(7, '$removeparam with $domain', async (assert) => {
        const testUrl = `${baseUrl}/?p1case7=true&p2case7=true`;
        log('\nCase 7:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            !result.url.includes('p1case7=true') && !result.url.includes('p2case7=true'),
            '$removeparam works with $domain modifier',
        );
    });
    agTest(8, '$removeparam with inversion', async (assert) => {
        const testUrl = `${baseUrl}/?p1case8=true&p2case8=true`;
        log('\nCase 8:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            !result.url.includes('p1case8=true')
        && result.url.includes('p2case8=true'),
            '$removeparam works with inversion',
        );
    });
    agTest(9, 'negate $removeparam', async (assert) => {
        const testUrl = `${baseUrl}/?p1case9=true&p2case9=true`;
        log('\nCase 9');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            adgCheck && result.url.includes('p1case9=true') && result.url.includes('p2case9=true'),
            '$removeparam exception rule prevents removing parameter in a request',
        );
    });
    agTest(10, 'match parameter with value by $removeparam rule with regexp', async (assert) => {
        const testUrl = `${baseUrl}/?p1case10=xxx&p2case10=yyy`;
        log('\nCase 10:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl);
        log(`result.url is ${result.url}`);
        assert.ok(
            !result.url.includes('p1case10=xxx') && result.url.includes('p2case10=yyy'),
            '$removeparam with regexp matches parameter with value',
        );
    });
    agTest(11, '$removeparam rule for script request', async (assert) => {
        const testUrl = `${baseUrl}/Filters/removeparam-rules/test-removeparam-rules.js?p1case11=true&p2case11=true`;
        log('\nCase 11:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl, { 'Content-Type': 'text/javascript' });
        log(`result.url is ${result.url}`);
        assert.ok(
            adgCheck && result.url.includes('p1case11=true') && !result.url.includes('p2case11=true'),
            // eslint-disable-next-line max-len
            'Rule with $removeparam and $script modifier removes parameter for script request, but rule without $script modifier not',
        );
    });

    agTest(12, '$removeparam rule for image request', async (assert) => {
        const testUrl = `${baseUrl}/Filters/removeparam-rules/test-files/adg1.png?p1case12=true&p2case12=true`;
        log('\nCase 12:');
        log(`Requesting ${testUrl}`);
        const result = await request(testUrl, { 'Content-Type': 'image/png' });
        log(`result.url is ${result.url}`);
        assert.ok(
            adgCheck && result.url.includes('p1case12=true') && !result.url.includes('p2case12=true'),
            // eslint-disable-next-line max-len
            'Rule with $removeparam and $image modifier removes parameter for image request, but rule without $image modifier not',
        );
    });
});
