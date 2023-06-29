/* global QUnit */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-permissions-rules.txt to AdGuard
 */


window.addEventListener('DOMContentLoaded', () => {
    agTest(1, '$permissions rule applies header', async (assert) => {

    });

    agTest(2, '$permissions rule sets multiple directives', async (assert) => {

    });

    agTest(3, 'multiple $permissions rules apply headers', async (assert) => {

    });

    agTest(4, 'allowlist rule disables all $permissions rules of the same pattern', async (assert) => {

    });
});
