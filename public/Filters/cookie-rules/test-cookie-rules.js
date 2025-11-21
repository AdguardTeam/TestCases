import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-cookie-rules.txt to AdGuard
 */

const baseUrl = window.location.origin;

const setCookie = async (name, value = '1') => {
    return fetch(`${baseUrl}/httpbin/cookies/set?${name}=${value}`);
};

const deleteCookie = async (name) => {
    return fetch(`${baseUrl}/httpbin/cookies/delete?${name}`);
};

const hasCookie = async (name) => {
    const result = await fetch(`${baseUrl}/httpbin/cookies?${name}`);
    const cookies = await result.json();
    return !!cookies[name];
};

window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-cookie-rules-filter');

    agTest(1, '$cookie rule blocks request cookie', async (assert) => {
        assert.ok(adgCheck, 'Filter is subscribed');
        await setCookie('case1');
        assert.notOk(await hasCookie('case1'), '$cookie rule blocks request cookie');
        await deleteCookie('case1');
    });

    agTest(2, '$cookie rule blocks response cookie', async (assert) => {
        assert.ok(adgCheck, 'Filter is subscribed');
        await setCookie('case2');
        assert.notOk(await hasCookie('case2'), '$cookie rule blocks response cookie');
        await deleteCookie('case2');
    });

    agTest(3, '$cookie rule selective blocking request cookie', async (assert) => {
        assert.ok(adgCheck, 'Filter is subscribed');
        await setCookie('case3');
        assert.notOk(await hasCookie('case3'), '$cookie rule selective blocking request cookie');
        await deleteCookie('case3');
    });

    agTest(4, '$cookie rule selective blocking response cookie', async (assert) => {
        assert.ok(adgCheck, 'Filter is subscribed');
        await setCookie('case4');
        assert.notOk(await hasCookie('case4'), '$cookie rule selective blocking response cookie');
        await deleteCookie('case4');
    });

    agTest(5, '$cookie allowlist rule bypass request cookie', async (assert) => {
        assert.ok(adgCheck, 'Filter is subscribed');
        await setCookie('case5');
        assert.ok(await hasCookie('case5'), '$cookie allowlist rule bypass request cookie');
        await deleteCookie('case5');
    });

    agTest(6, '$cookie allowlist rule bypass response cookie', async (assert) => {
        assert.ok(adgCheck, 'Filter is subscribed');
        await setCookie('case6');
        assert.ok(await hasCookie('case6'), '$cookie allowlist rule bypass response cookie');
        await deleteCookie('case6');
    });
});
