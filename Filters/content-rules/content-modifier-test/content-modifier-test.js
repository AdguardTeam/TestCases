import { getAgTestRunner, isSubscribed } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import content-modifier-test.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-content-modifier-filter');

    agTest(1, "$content modifier with 'div' element", (assert) => {
        assert.ok(
            adgCheck && document.querySelector('#case1'),
            'exception rule with $content modifier should disable all content rules',
        );
    });

    agTest(2, "$content modifier with 'a' element and 'tag-content' attribute", (assert) => {
        assert.ok(
            adgCheck && document.querySelector('#case2'),
            'exception rule with $content modifier should disable all content rules',
        );
    });

    agTest(3, "$content modifier with 'div' element and 'wildcard' attribute", (assert) => {
        assert.ok(
            adgCheck && document.querySelector('#case3'),
            'exception rule with $content modifier should disable all content rules',
        );
    });

    agTest(4, "$content modifier with 'class' element", (assert) => {
        assert.ok(
            adgCheck && document.querySelector('#case4'),
            'exception rule with $content modifier should disable all content rules',
        );
    });
});
