import { getAgTestRunner } from '../helpers.js';

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
    const result = await fetch(`${baseUrl}/httpbin/cookies`);
    const cookies = await result.json();
    return !!cookies[name];
};

window.addEventListener('load', () => {
    agTest(1, '$cookie rule blocks request cookie', async (assert) => {
        await setCookie('case1');
        assert.notOk(await hasCookie('case1'), '$cookie rule blocks request cookie');
        await deleteCookie('case1');
    });

    agTest(2, '$cookie rule blocks response cookie', async (assert) => {
        await setCookie('case2');
        assert.notOk(await hasCookie('case2'), '$cookie rule blocks response cookie');
        await deleteCookie('case2');
    });

    agTest(3, '$cookie allowlist rule bypass request cookie', async (assert) => {
        await setCookie('case3');
        assert.ok(await hasCookie('case3'), '$cookie allowlist rule bypass request cookie');
        await deleteCookie('case3');
    });

    agTest(4, '$cookie allowlist rule bypass response cookie', async (assert) => {
        await setCookie('case4');
        assert.ok(await hasCookie('case4'), '$cookie allowlist rule bypass response cookie');
        await deleteCookie('case4');
    });
});
