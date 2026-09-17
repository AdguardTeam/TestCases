import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-html-filtering-rules.txt to AdGuard.
 *
 * These tests verify the CoreLibs semantics of quoted `:contains()`
 * arguments in HTML filtering rules (AG-43979):
 * 1. Wrapping quotes must be stripped from `:contains("...")` arguments.
 * 2. A quoted regexp-lookalike (`:contains("/regexp/")`) must keep
 *    regexp semantics after unquoting.
 */

const isRemoved = (id) => document.getElementById(id) === null;

window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-html-filtering-rules-filter');

    agTest(1, 'quoted plain-text :contains() argument', (assert) => {
        assert.ok(adgCheck, 'test filter is active');
        assert.ok(
            isRemoved('case1-target'),
            'script matching the unquoted text is removed (wrapping quotes are stripped)',
        );
        assert.ok(
            !isRemoved('case1-control'),
            'script without the needle is kept',
        );
    });

    agTest(2, 'quoted regexp-lookalike :contains() argument', (assert) => {
        assert.ok(
            isRemoved('case2-regexp-target'),
            'script matching the regexp is removed (quoted argument keeps regexp semantics)',
        );
        assert.ok(
            !isRemoved('case2-literal-target'),
            'script containing the pattern literally is kept (argument is not matched literally)',
        );
        assert.ok(
            !isRemoved('case2-control'),
            'script without the needle is kept',
        );
    });

    agTest(3, 'unquoted regexp :contains() argument', (assert) => {
        assert.ok(
            isRemoved('case3-target'),
            'script matching the regexp is removed',
        );
        assert.ok(
            !isRemoved('case3-control'),
            'script without the needle is kept',
        );
    });
});
