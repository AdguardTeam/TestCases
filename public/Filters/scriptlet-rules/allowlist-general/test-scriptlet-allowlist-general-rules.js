/* eslint-disable no-eval */

import { getAgTestRunner } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-scriptlet-allowlist-general-rules.txt to AdGuard
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
    agTest(1, 'allowlist-all', (assert) => {
        // `set-constant` scriptlets allowlisted
        const testVal = 'testVal';
        assert.strictEqual(window[testVal], undefined, testVal);
        clearProperties(testVal);
        // `prevent-eval-if` also allowlisted
        eval('(function(preventIfTest) { window.test = "value" }) ()');
        assert.equal(window.test, 'value', 'Do not prevent eval by string "preventIfTest"');
    });
});
