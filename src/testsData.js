import {
    PRODUCT_TYPES,
    CORELIBS_PRODUCTS,
    NONE_CORELIBS_PRODUCTS,
    NO_REPLACE_CONTENT_PRODUCTS,
    NO_CSP_PRODUCTS,
} from './constants';

/**
 * Exception data for partial compatibility
 * @typedef PartialException
 * @property {string} product
 * @property {number[]} cases
 */

/**
 * Partial compatibility data
 * @typedef PartialCompatiblityData
 * @property {PartialException[]} exceptions
 */

/**
 * Partial compatibility data
 * @typedef NoneCompatiblityData
 * @property {string[]} products
 */

/**
 * Describes the compatibility for test,
 * at least one of properties should be set
 * @typedef CompatiblityData
 * @property {boolean} [full] - true for full compatibility
 * @property {PartialCompatiblityData} [partial]
 * @property {NoneCompatiblityData} [none]
 */

/**
 * @typedef TestItemData
 * @property {number} id
 * @property {string} title
 * @property {string} link
 * @property {string} rulesUrl
 * @property {string} [readmeUrl]
 * @property {CompatiblityData} compatibility
 */

/**
 * Tests data
 * @type {TestItemData[]} array of objects
 */
const testsData = [
    {
        id: 1,
        title: 'Simple rules',
        link: 'Filters/simple-rules/test-simple-rules.html',
        rulesUrl: 'Filters/simple-rules/test-simple-rules.txt',
        compatibility: {
            full: true,
        },
    },
    {
        id: 2,
        title: 'Generic hide rules',
        link: 'Filters/simple-rules/generichide-test/generichide-test.html',
        rulesUrl: 'Filters/simple-rules/generichide-test/generichide-test.txt',
        compatibility: {
            partial: {
                exceptions: [
                    {
                        product: PRODUCT_TYPES.SAF,
                        cases: [2],
                    },
                ],
            },
        },
    },
    {
        id: 3,
        title: 'Extended Css rules',
        link: 'Filters/extended-css-rules/test-extended-css-rules.html',
        rulesUrl: 'Filters/extended-css-rules/test-extended-css-rules.txt',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON],
            },
        },
    },
    {
        id: 4,
        title: 'Extended CSS rules injection into iframe created with js',
        link: 'Filters/extended-css-rules/extended-css-iframejs-injection/extended-css-iframejs-injection.html',
        rulesUrl: 'Filters/extended-css-rules/extended-css-iframejs-injection/extended-css-iframejs-injection.txt',
        compatibility: {
            none: {
                products: [
                    ...CORELIBS_PRODUCTS,
                    PRODUCT_TYPES.IOS,
                    PRODUCT_TYPES.CON,
                ],
            },
        },
    },
    {
        id: 5,
        title: '$important rules',
        link: 'Filters/important-rules/test-important-rules.html',
        rulesUrl: 'Filters/important-rules/test-important-rules.txt',
        compatibility: {
            full: true,
        },
        readmeUrl: 'Filters/important-rules/README.md',
    },
    {
        id: 6,
        title: '$important rule vs $urlblock exception',
        link: 'Filters/important-rules/important-vs-urlblock/test-important-vs-urlblock.html',
        rulesUrl: 'Filters/important-rules/important-vs-urlblock/test-important-vs-urlblock.txt',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.SAF],
            },
        },
        readmeUrl: 'Filters/important-rules/important-vs-urlblock/README.md',
    },
    {
        id: 7,
        title: '$replace rules',
        link: 'Filters/replace-rules/test-replace-rules.html',
        rulesUrl: 'Filters/replace-rules/test-replace-rules.txt',
        compatibility: {
            none: {
                products: NO_REPLACE_CONTENT_PRODUCTS,
            },
        },
        readmeUrl: 'Filters/replace-rules/README.md',
    },
    {
        id: 8,
        title: '$replace rule vs $generichide exception',
        link: 'Filters/replace-rules/replace-vs-generichide-rule/replace-vs-generichide-rule.html',
        rulesUrl: 'Filters/replace-rules/replace-vs-generichide-rule/replace-vs-generichide-rule.txt',
        compatibility: {
            none: {
                products: NO_REPLACE_CONTENT_PRODUCTS,
            },
        },
    },
    {
        id: 9,
        title: '$replace rule vs $content exception',
        link: 'Filters/replace-rules/replace-vs-content-rule/replace-vs-content-rule.html',
        rulesUrl: 'Filters/replace-rules/replace-vs-content-rule/replace-vs-content-rule.txt',
        compatibility: {
            none: {
                products: NO_REPLACE_CONTENT_PRODUCTS,
            },
        },
    },
    {
        id: 10,
        title: '$replace rule vs $elemhide exception',
        link: 'Filters/replace-rules/replace-vs-elemhide-rule/replace-vs-elemhide-rule.html',
        rulesUrl: 'Filters/replace-rules/replace-vs-elemhide-rule/replace-vs-elemhide-rule.txt',
        compatibility: {
            none: {
                products: NO_REPLACE_CONTENT_PRODUCTS,
            },
        },
    },
    {
        id: 11,
        title: '$csp rules',
        link: 'Filters/csp-rules/test-csp-rules.html',
        rulesUrl: 'Filters/csp-rules/test-csp-rules.txt',
        compatibility: {
            none: {
                products: NO_CSP_PRODUCTS,
            },
        },
        readmeUrl: 'Filters/csp-rules/README.md',
    },
    {
        id: 12,
        title: '$csp exception test',
        link: 'Filters/csp-rules/csp-global-exception/csp-global-exception.html',
        rulesUrl: 'Filters/csp-rules/csp-global-exception/csp-global-exception.txt',
        compatibility: {
            none: {
                products: NO_CSP_PRODUCTS,
            },
        },
        readmeUrl: 'Filters/csp-rules/csp-global-exception/README.md',
    },
    {
        id: 13,
        title: 'Websocket blocking',
        link: 'Filters/websockets/test-websockets.html',
        rulesUrl: 'Filters/websockets/test-websockets.txt',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.SAF, PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON],
            },
        },
    },
    {
        id: 14,
        title: 'Content rules',
        link: 'Filters/content-rules/test-content-rules.html',
        rulesUrl: 'Filters/content-rules/test-content-rules.txt',
        compatibility: {
            none: {
                products: NO_REPLACE_CONTENT_PRODUCTS,
            },
        },
    },
    {
        id: 15,
        title: '$content modifier tests',
        link: 'Filters/content-rules/content-modifier-test/content-modifier-test.html',
        rulesUrl: 'Filters/content-rules/content-modifier-test/content-modifier-test.txt',
        compatibility: {
            none: {
                products: NO_REPLACE_CONTENT_PRODUCTS,
            },
        },
    },
    {
        id: 16,
        title: 'Script rules',
        link: 'Filters/script-rules/test-script-rules.html',
        rulesUrl: 'Filters/script-rules/test-script-rules.txt',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON],
            },
        },
    },
    {
        id: 17,
        title: 'Scriptlet rules',
        link: 'Filters/scriptlet-rules/test-scriptlet-rules.html',
        rulesUrl: 'Filters/scriptlet-rules/test-scriptlet-rules.txt',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.EDL, PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON],
            },
        },
    },
    {
        id: 18,
        title: 'Userscripts',
        link: 'Userscripts/test-userscripts.html',
        rulesUrl: 'Userscripts/apiTester/api-tester.user.js',
        compatibility: {
            none: {
                products: NONE_CORELIBS_PRODUCTS,
            },
        },
    },
    {
        id: 19,
        title: 'Userscripts: GM API v4 tests',
        link: 'Userscripts/gmapi-v4-tests.html',
        rulesUrl: 'Userscripts/GMapiV4Tester/GMapi_v4-tester.user.js',
        compatibility: {
            none: {
                products: NONE_CORELIBS_PRODUCTS,
            },
        },
    },
    {
        id: 20,
        title: 'Popup blocker',
        link: 'PopupBlocker/test-popup-blocker.html',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON],
            },
        },
    },
    {
        id: 21,
        title: 'Popup blocker event recovery',
        link: 'PopupBlocker/test-event-recovery.html',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON],
            },
        },
    },
    {
        id: 22,
        title: '$badfilter rules',
        link: 'Filters/badfilter-rules/test-badfilter-rules.html',
        rulesUrl: 'Filters/badfilter-rules/test-badfilter-rules.txt',
        compatibility: {
            none: {
                products: [...CORELIBS_PRODUCTS, PRODUCT_TYPES.CON],
            },
        },
        readmeUrl: 'Filters/badfilter-rules/README.md',
    },
    {
        id: 23,
        title: '$network rules',
        link: 'Filters/network-rules/test-network-rules.html',
        rulesUrl: 'Filters/network-rules/test-network-rules.txt',
        compatibility: {
            none: {
                products: NONE_CORELIBS_PRODUCTS,
            },
        },
        readmeUrl: 'Filters/network-rules/README.md',
    },
    {
        id: 24,
        title: '$redirect rules',
        link: 'Filters/redirect-rules/test-redirect-rules.html',
        rulesUrl: 'Filters/redirect-rules/test-redirect-rules.txt',
        compatibility: {
            none: {
                products: [
                    PRODUCT_TYPES.EDL, PRODUCT_TYPES.SAF, PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON,
                ],
            },
        },
        readmeUrl: 'Filters/redirect-rules/README.md',
    },
    {
        id: 25,
        title: '$redirect resources security test',
        link: 'Filters/redirect-security/test-redirect-security.html',
        rulesUrl: 'Filters/redirect-security/test-redirect-security.txt',
        compatibility: {
            none: {
                products: [
                    ...CORELIBS_PRODUCTS,
                    PRODUCT_TYPES.EDL, PRODUCT_TYPES.SAF, PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON,
                ],
            },
        },
        readmeUrl: 'Filters/redirect-security/README.md',
    },
    {
        id: 26,
        title: '$jsinject rules test',
        link: 'Filters/script-rules/jsinject-rules/test-jsinject-rules.html',
        rulesUrl: 'Filters/script-rules/jsinject-rules/test-jsinject-rules.txt',
        compatibility: {
            none: {
                products: [PRODUCT_TYPES.IOS, PRODUCT_TYPES.CON],
            },
        },
    },
    {
        id: 27,
        title: '$removeparam rules',
        link: 'Filters/removeparam-rules/test-removeparam-rules.html',
        rulesUrl: 'Filters/removeparam-rules/test-removeparam-rules.txt',
        compatibility: {
            none: {
                products: [
                    PRODUCT_TYPES.EDL,
                    PRODUCT_TYPES.SAF,
                    PRODUCT_TYPES.IOS,
                    PRODUCT_TYPES.CON,
                ],
            },
        },
    },
    {
        id: 28,
        title: '$specifichide rules',
        link: 'Filters/specifichide-rules/test-specifichide-rules.html',
        rulesUrl: 'Filters/specifichide-rules/test-specifichide-rules.txt',
        compatibility: {
            none: {
                products: [
                    PRODUCT_TYPES.CHR,
                    PRODUCT_TYPES.EDG,
                    PRODUCT_TYPES.FOX,
                    PRODUCT_TYPES.OPR,
                    PRODUCT_TYPES.EDL,
                    PRODUCT_TYPES.CON,
                ],
            },
        },
    },
    {
        id: 29,
        title: '$denyallow rules',
        link: 'Filters/denyallow-rules/test-denyallow-rules.html',
        rulesUrl: 'Filters/denyallow-rules/test-denyallow-rules.txt',
        compatibility: {
            none: {
                products: NONE_CORELIBS_PRODUCTS,
            },
        },
    },
    {
        id: 30,
        title: '$removeheader rules',
        link: 'Filters/removeheader-rules/test-removeheader-rules.html',
        rulesUrl: 'Filters/removeheader-rules/test-removeheader-rules.txt',
        compatibility: {
            none: {
                products: NONE_CORELIBS_PRODUCTS,
            },
        },
    },
];

export default testsData;
