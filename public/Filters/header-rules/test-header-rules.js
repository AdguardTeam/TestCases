/* global QUnit */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-removeheader-rules.txt to AdGuard
 */

const request = async (url) => {
    // eslint-disable-next-line compat/compat
    const response = await fetch(url);
    return response;
};

// eslint-disable-next-line compat/compat
const baseUrl = window.location.origin;

window.addEventListener('DOMContentLoaded', () => {
    agTest(1, '', async (assert) => {});
});
