/* global QUnit */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-header-rules.txt to AdGuard
 */

// eslint-disable-next-line compat/compat
const baseUrl = `${window.location.origin}/Filters/header-rules/test-files`;

const fetchWrapper = async (url) => fetch(`${baseUrl}/${url}`);

window.addEventListener('DOMContentLoaded', () => {
    let testFileName;
    agTest('1.1', 'Case 1.1: Request is being matched header name only.', async (assert) => {
        testFileName = 'case-1-1.json';
        assert.rejects(
            fetchWrapper(testFileName),
            'Simple rule blocks by header name only.',
        );
    });

    agTest('1.2', 'Case 1.2: Request is being matched by header name and header value.', async (assert) => {
        testFileName = 'case-1-2.json';
        assert.rejects(
            fetchWrapper(testFileName),
            'Simple rule blocks by header name and header value.',
        );
    });

    agTest('1.3', 'Case 1.3: Request is being matched by header name and header value.', async (assert) => {
        testFileName = 'case-1-3.json';
        assert.rejects(
            fetchWrapper(testFileName),
            'Simple rule blocks by header name and header value regexp.',
        );
    });

    agTest('2', 'Case 2: Rule wont block the request if header is not matched', async (assert) => {
        testFileName = 'case-2.json';
        const response = await fetchWrapper(testFileName);
        assert.ok(response.ok, 'Headers not matched, request is ok.');
    });

    agTest('3', 'Case 3: Request unblocked by basic allowlist rule', async (assert) => {
        testFileName = 'case-3.json';
        const response = await fetchWrapper(testFileName);
        assert.ok(response.ok, 'Basic allowlist rule unblocks request.');
    });

    agTest('4.1', 'Case 4.1: Request unblocked by $header allowlist rule', async (assert) => {
        testFileName = 'case-4-1.json';
        const response = await fetchWrapper(testFileName);
        assert.ok(response.ok, 'Allowlist rule works, request is ok.');
    });

    agTest('4.2', 'Case 4.2: Request is not unblocked by $header allowlist rule', async (assert) => {
        testFileName = 'case-4-2.json';
        assert.rejects(
            fetchWrapper(testFileName),
            '$header values were not matched, request is blocked.',
        );
    });

    agTest('5', 'Case 5: important blocking rule blocks through matching allowlist rule', async (assert) => {
        testFileName = 'case-5.json';
        assert.rejects(
            fetchWrapper(testFileName),
            'Request is blocked by important $header rule.',
        );
    });

    agTest('6', 'Case 6: matching @@$header rule won`t cancel basic blocking rule', async (assert) => {
        testFileName = 'case-6.json';
        assert.rejects(
            fetchWrapper(testFileName),
            '@@$header rule matches the request, but don`t cancel basic blocking rule.',
        );
    });

    agTest('7', 'Allowlist rule must fully match blocking rule`s $header value to cancel it', async (assert) => {
        testFileName = 'case-7.json';
        assert.rejects(
            fetchWrapper(testFileName),
            '$header values don`t match, allowlist rule is not applied.',
        );
    });

    agTest('9.1', '$header,removeheader works of $header matches', async (assert) => {
        testFileName = 'case-9-1.json';
        const response = await fetchWrapper(testFileName);
        assert.ok(
            !response.headers.get('vary'),
            '$header,removeheader rule removes passed parameter in a response',
        );
    });

    agTest('9.2', '$header,removeheader doesn`t apply if $header doesn`t match', async (assert) => {
        testFileName = 'case-9-2.json';
        const response = await fetchWrapper(testFileName);
        assert.ok(
            !!response.headers.get('vary'),
            '$header,removeheader rule is not applied',
        );
    });

    agTest('9.3', '$header,removeheader is cancelled by corresponding @@ rule', async (assert) => {
        testFileName = 'case-9-3.json';
        const response = await fetchWrapper(testFileName);
        assert.ok(
            !!response.headers.get('vary'),
            '$header,removeheader rule is not applied',
        );
    });

    agTest('9.4', '$header,removeheader is not cancelled by @@$header rule', async (assert) => {
        testFileName = 'case-9-4.json';
        const response = await fetchWrapper(testFileName);
        assert.ok(
            !response.headers.get('vary'),
            '$header,removeheader rule is applied',
        );
    });
});
