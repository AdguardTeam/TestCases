/* eslint-disable no-eval */

import { getAgTestRunner } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-scriptlet-allowlist-specific-rules.txt to AdGuard
 */

const clearProperties = (...props) => {
    props.forEach((prop) => {
        try {
            delete window[prop];
        } catch (e) {
            try {
                // sometimes property deleting is not allowed
                // e.g. in Safari
                window[prop] = null;
            } catch (e) {
                // ignore
            }
        }
    });
};

window.addEventListener('load', () => {
    agTest(1, 'allowlist-specific', (assert) => {
        // Rule not allowlisted
        const firstVal = 'firstVal';
        assert.strictEqual(window[firstVal], true, firstVal);
        clearProperties(firstVal);

        // Rule allowlisted
        const secondVal = 'secondVal';
        assert.strictEqual(window[secondVal], undefined, secondVal);
        clearProperties(secondVal);
    });

    agTest(2, 'allowlist-by-name', (assert) => {
        // `prevent-eval-if` allowlisted
        eval('(function(preventIfTest) { window.test = "value" }) ()');
        assert.equal(window.test, 'value', 'Do not prevent eval by string "preventIfTest"');

        // `set-constant` scriptlet still works
        const testVal = 'testVal';
        assert.strictEqual(window[testVal], true, testVal);
        clearProperties(testVal);
    });
});
