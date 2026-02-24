import {
    PRODUCT_TYPES,
    CORELIBS_PRODUCTS,
    NONE_CORELIBS_PRODUCTS,
    NO_REPLACE_CONTENT_PRODUCTS,
    NO_CSP_PRODUCTS,
    NO_METHOD_PRODUCTS,
    NO_TO_PRODUCTS,
    FIREFOX_BUILDS,
    SAFARI_CONVERTER_LIB_PRODUCTS,
    LEGACY_PRODUCTS,
} from './constants';

/**
 * Exception data for partial compatibility,
 * `cases` or `desc` should be set.
 *
 * @typedef PartialException
 * @property {string} product Product name.
 * @property {number[]} [cases] Exception cases.
 * @property {string} [desc] Exception description which is not related to test cases.
 */

/**
 * Special compatibility data.
 * Used for specific Firefox build versions.
 *
 * @typedef SpecialCompatibility
 * @property {string[]} compatible List of supported products.
 * @property {string[]} incompatible List of unsupported products.
 */

/**
 * Describes the compatibility for a test,
 * at least one of properties should be set
 *
 * @typedef CompatibilityData
 * @property {boolean} [full] `true` for full compatibility which means all products are compatible.
 * @property {PartialException[]} [partial] Almost full compatibility:
 * products which are listed in the array are compatible except listed cases,
 * all other products are fully compatible.
 * @property {string[]} [none] Array of non-compatible products,
 * all other products should be considered as fully compatible.
 * @property {SpecialCompatibility} [special] Special compatibility data.
 */

/**
 * @typedef TestItemData
 * @property {number} id
 * @property {string} title
 * @property {string} link
 * @property {string} rulesUrl
 * @property {string} [readmeUrl]
 * @property {CompatibilityData} compatibility
 * @property {boolean} [manual] `true` if test should be run manually.
 */

/**
 * Tests data
 * @type {TestItemData[]} array of objects
 */
const testsData = [
    {
        id: 1,
        title: 'Element hiding rules',
        link: 'Filters/element-hiding-rules/test-element-hiding-rules.html',
        rulesUrl: 'Filters/element-hiding-rules/test-element-hiding-rules.txt',
        compatibility: {
            partial: [
                // 6 will work after AG-24593 done.
                {
                    product: PRODUCT_TYPES.MV3,
                    cases: [6],
                },
            ],
        },
        readmeUrl: 'Filters/element-hiding-rules/README.md',
    },
    {
        id: 2,
        title: 'Generic hide rules',
        link: 'Filters/generichide-rules/generichide-rules.html',
        rulesUrl: 'Filters/generichide-rules/generichide-rules.txt',
        compatibility: {
            partial: [
                {
                    product: FIREFOX_BUILDS.FOX_AMO,
                    desc: 'check Readme',
                },
                {
                    product: PRODUCT_TYPES.SAF,
                    cases: [2],
                },
                // 3 will work after release adgext v5.3.1.
                {
                    product: PRODUCT_TYPES.MV3,
                    cases: [3],
                },
            ],
        },
        readmeUrl: 'Filters/generichide-rules/README.md',
    },
    {
        id: 3,
        title: 'CSS rules',
        link: 'Filters/css-rules/css-rules.html',
        rulesUrl: 'Filters/css-rules/css-rules.txt',
        compatibility: {
            none: [PRODUCT_TYPES.CON],
        },
        readmeUrl: 'Filters/css-rules/README.md',
    },
    {
        id: 4,
        title: 'Extended CSS rules',
        link: 'Filters/extended-css-rules/test-extended-css-rules.html',
        rulesUrl: 'Filters/extended-css-rules/test-extended-css-rules.txt',
        compatibility: {
            none: [PRODUCT_TYPES.CON],
        },
        readmeUrl: 'Filters/extended-css-rules/README.md',
    },
    {
        id: 5,
        title: 'Extended CSS rules injection into iframe created with js',
        link: 'Filters/extended-css-rules/extended-css-iframejs-injection/extended-css-iframejs-injection.html',
        rulesUrl: 'Filters/extended-css-rules/extended-css-iframejs-injection/extended-css-iframejs-injection.txt',
        compatibility: {
            none: [
                ...CORELIBS_PRODUCTS,
                PRODUCT_TYPES.CON,
            ],
        },
        readmeUrl: 'Filters/extended-css-rules/extended-css-iframejs-injection/README.md',
    },
    {
        id: 6,
        title: '$important rules',
        link: 'Filters/important-rules/test-important-rules.html',
        rulesUrl: 'Filters/important-rules/test-important-rules.txt',
        compatibility: {
            full: true,
        },
        readmeUrl: 'Filters/important-rules/README.md',
    },
    {
        id: 7,
        title: '$important rule vs $urlblock exception',
        link: 'Filters/important-rules/important-vs-urlblock/test-important-vs-urlblock.html',
        rulesUrl: 'Filters/important-rules/important-vs-urlblock/test-important-vs-urlblock.txt',
        compatibility: {
            none: [
                PRODUCT_TYPES.SAF,
                PRODUCT_TYPES.IOS,
                PRODUCT_TYPES.CON,
                // $urlblock has not been implemented correctly (AG-24598)
                PRODUCT_TYPES.MV3,
            ],
        },
        readmeUrl: 'Filters/important-rules/important-vs-urlblock/README.md',
    },
    {
        id: 8,
        title: '$replace rules',
        link: 'Filters/replace-rules/test-replace-rules.html',
        rulesUrl: 'Filters/replace-rules/test-replace-rules.txt',
        compatibility: {
            none: NO_REPLACE_CONTENT_PRODUCTS,
        },
        readmeUrl: 'Filters/replace-rules/README.md',
    },
    {
        id: 9,
        title: '$replace rule vs $generichide exception',
        link: 'Filters/replace-rules/replace-vs-generichide-rule/replace-vs-generichide-rule.html',
        rulesUrl: 'Filters/replace-rules/replace-vs-generichide-rule/replace-vs-generichide-rule.txt',
        compatibility: {
            none: NO_REPLACE_CONTENT_PRODUCTS,
        },
    },
    {
        id: 10,
        title: '$replace rule vs $content exception',
        link: 'Filters/replace-rules/replace-vs-content-rule/replace-vs-content-rule.html',
        rulesUrl: 'Filters/replace-rules/replace-vs-content-rule/replace-vs-content-rule.txt',
        compatibility: {
            none: NO_REPLACE_CONTENT_PRODUCTS,
        },
    },
    {
        id: 11,
        title: '$replace rule vs $elemhide exception',
        link: 'Filters/replace-rules/replace-vs-elemhide-rule/replace-vs-elemhide-rule.html',
        rulesUrl: 'Filters/replace-rules/replace-vs-elemhide-rule/replace-vs-elemhide-rule.txt',
        compatibility: {
            none: NO_REPLACE_CONTENT_PRODUCTS,
        },
    },
    {
        id: 12,
        title: '$csp rules',
        link: 'Filters/csp-rules/test-csp-rules.html',
        rulesUrl: 'Filters/csp-rules/test-csp-rules.txt',
        compatibility: {
            partial: [
                // Exception rules not supported.
                {
                    product: PRODUCT_TYPES.MV3,
                    cases: [3],
                },
            ],
            none: [
                ...NO_CSP_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/csp-rules/README.md',
    },
    {
        id: 13,
        title: '$csp global exception test',
        link: 'Filters/csp-rules/csp-global-exception/csp-global-exception.html',
        rulesUrl: 'Filters/csp-rules/csp-global-exception/csp-global-exception.txt',
        compatibility: {
            none: [
                ...NO_CSP_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/csp-rules/csp-global-exception/README.md',
    },
    {
        id: 14,
        title: 'Websocket blocking',
        link: 'Filters/websockets/test-websockets.html',
        rulesUrl: 'Filters/websockets/test-websockets.txt',
        compatibility: {
            none: [PRODUCT_TYPES.CON],
        },
    },
    {
        id: 15,
        title: 'Content (HTML filtering) rules',
        link: 'Filters/content-rules/test-content-rules.html',
        rulesUrl: 'Filters/content-rules/test-content-rules.txt',
        compatibility: {
            none: NO_REPLACE_CONTENT_PRODUCTS,
            partial: CORELIBS_PRODUCTS.map((product) => ({
                product,
                cases: [8, 9, 10],
            })),
        },
        readmeUrl: 'Filters/content-rules/README.md',
    },
    {
        id: 16,
        title: '$content modifier tests',
        link: 'Filters/content-rules/content-modifier-test/content-modifier-test.html',
        rulesUrl: 'Filters/content-rules/content-modifier-test/content-modifier-test.txt',
        compatibility: {
            none: NO_REPLACE_CONTENT_PRODUCTS,
        },
    },
    {
        id: 17,
        title: 'Script rules',
        link: 'Filters/script-rules/test-script-rules.html',
        rulesUrl: 'Filters/script-rules/test-script-rules.txt',
        compatibility: {
            special: {
                compatible: [
                    PRODUCT_TYPES.MV3,
                    FIREFOX_BUILDS.FOX_STDLN,
                    ...CORELIBS_PRODUCTS,
                    PRODUCT_TYPES.CHR,
                    PRODUCT_TYPES.EDG,
                    PRODUCT_TYPES.OPR,
                    PRODUCT_TYPES.EDL,
                    ...SAFARI_CONVERTER_LIB_PRODUCTS,
                ],
                incompatible: [
                    FIREFOX_BUILDS.FOX_AMO,
                    PRODUCT_TYPES.CON,
                ],
            },
        },
        readmeUrl: 'Filters/script-rules/README.md',
    },
    {
        id: 18,
        title: 'Script rules test for Firefox AMO',
        link: 'Filters/script-rules/test-script-firefox/test-script-firefox.html',
        rulesUrl: 'Filters/script-rules/test-script-firefox/test-script-firefox.txt',
        compatibility: {
            special: {
                compatible: [FIREFOX_BUILDS.FOX_AMO],
                incompatible: [
                    FIREFOX_BUILDS.FOX_STDLN,
                    ...CORELIBS_PRODUCTS,
                    PRODUCT_TYPES.CHR,
                    PRODUCT_TYPES.EDG,
                    PRODUCT_TYPES.OPR,
                    ...SAFARI_CONVERTER_LIB_PRODUCTS,
                    ...LEGACY_PRODUCTS,
                ],
            },
        },
    },
    {
        id: 19,
        title: 'Scriptlet rules',
        link: 'Filters/scriptlet-rules/test-scriptlet-rules.html',
        rulesUrl: 'Filters/scriptlet-rules/test-scriptlet-rules.txt',
        compatibility: {
            none: LEGACY_PRODUCTS,
        },
        readmeUrl: 'Filters/scriptlet-rules/README.md',
    },
    {
        // IMPORTANT: Update USERSCRIPTS_TEST_IDS if this id is changed
        id: 20,
        title: 'Userscripts',
        link: 'Userscripts/test-userscripts.html',
        rulesUrl: 'Userscripts/apiTester/api-tester.user.js',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Userscripts/README.md',
    },
    {
        // IMPORTANT: Update USERSCRIPTS_TEST_IDS if this id is changed
        id: 21,
        title: 'Userscripts: GM API v4 tests',
        link: 'Userscripts/gmapi-v4-tests.html',
        rulesUrl: 'Userscripts/GMapiV4Tester/GMapi_v4-tester.user.js',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Userscripts/README.md',
    },
    {
        id: 22,
        title: 'Popup blocker',
        link: 'PopupBlocker/test-popup-blocker.html',
        readmeUrl: 'PopupBlocker/README.md',
        rulesUrl: 'PopupBlocker/test-popup-blocker-rules.txt',
        compatibility: {
            none: [
                PRODUCT_TYPES.IOS,
                PRODUCT_TYPES.CON,
                PRODUCT_TYPES.MV3,
            ],
        },
        manual: true,
    },
    {
        id: 23,
        title: 'Popup blocker event recovery',
        link: 'PopupBlocker/test-event-recovery.html',
        compatibility: {
            none: [
                PRODUCT_TYPES.IOS,
                PRODUCT_TYPES.CON,
                PRODUCT_TYPES.MV3,
            ],
        },
        manual: true,
    },
    {
        id: 24,
        title: '$badfilter rules',
        link: 'Filters/badfilter-rules/test-badfilter-rules.html',
        rulesUrl: 'Filters/badfilter-rules/test-badfilter-rules.txt',
        compatibility: {
            none: [PRODUCT_TYPES.CON],
        },
        readmeUrl: 'Filters/badfilter-rules/README.md',
    },
    {
        id: 25,
        title: '$network rules',
        link: 'Filters/network-rules/test-network-rules.html',
        rulesUrl: 'Filters/network-rules/test-network-rules.txt',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Filters/network-rules/README.md',
    },
    {
        id: 26,
        title: '$redirect rules',
        link: 'Filters/redirect-rules/test-redirect-rules.html',
        rulesUrl: 'Filters/redirect-rules/test-redirect-rules.txt',
        compatibility: {
            none: [
                ...SAFARI_CONVERTER_LIB_PRODUCTS,
                ...LEGACY_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/redirect-rules/README.md',
    },
    {
        id: 27,
        title: '$redirect resources security test',
        link: 'Filters/redirect-security/test-redirect-security.html',
        rulesUrl: 'Filters/redirect-security/test-redirect-security.txt',
        compatibility: {
            none: [
                ...CORELIBS_PRODUCTS,
                ...SAFARI_CONVERTER_LIB_PRODUCTS,
                ...LEGACY_PRODUCTS,
                PRODUCT_TYPES.FOX,
                PRODUCT_TYPES.MV3,
            ],
        },
        readmeUrl: 'Filters/redirect-security/README.md',
    },
    {
        id: 28,
        title: '$jsinject rules test',
        link: 'Filters/script-rules/jsinject-rules/test-jsinject-rules.html',
        rulesUrl: 'Filters/script-rules/jsinject-rules/test-jsinject-rules.txt',
        compatibility: {
            none: [
                PRODUCT_TYPES.CON,
                // not implemented yet (AG-24586)
                PRODUCT_TYPES.MV3,
            ],
        },
        readmeUrl: 'Filters/script-rules/jsinject-rules/README.md',
    },
    {
        id: 29,
        title: '$removeparam rules',
        link: 'Filters/removeparam-rules/test-removeparam-rules.html',
        rulesUrl: 'Filters/removeparam-rules/test-removeparam-rules.txt',
        compatibility: {
            none: [
                ...SAFARI_CONVERTER_LIB_PRODUCTS,
                ...LEGACY_PRODUCTS,
                // Almost all tests fail due to a single possible redirect
                // in DNR (AG-26824).
                PRODUCT_TYPES.MV3,
            ],
        },
        readmeUrl: 'Filters/removeparam-rules/README.md',
    },
    {
        id: 30,
        title: '$specifichide rules',
        link: 'Filters/specifichide-rules/test-specifichide-rules.html',
        rulesUrl: 'Filters/specifichide-rules/test-specifichide-rules.txt',
        compatibility: {
            none: [
                ...SAFARI_CONVERTER_LIB_PRODUCTS,
                ...LEGACY_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/specifichide-rules/README.md',
    },
    {
        id: 31,
        title: '$denyallow rules',
        link: 'Filters/denyallow-rules/test-denyallow-rules.html',
        rulesUrl: 'Filters/denyallow-rules/test-denyallow-rules.txt',
        compatibility: {
            none: LEGACY_PRODUCTS,
        },
        readmeUrl: 'Filters/denyallow-rules/README.md',
    },
    {
        id: 32,
        title: '$removeheader rules',
        link: 'Filters/removeheader-rules/test-removeheader-rules.html',
        rulesUrl: 'Filters/removeheader-rules/test-removeheader-rules.txt',
        compatibility: {
            partial: [
                // Allowrules not supported.
                {
                    product: PRODUCT_TYPES.MV3,
                    cases: [2, 4],
                },
            ],
            none: [
                ...SAFARI_CONVERTER_LIB_PRODUCTS,
                ...LEGACY_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/removeheader-rules/README.md',
    },
    {
        id: 33,
        title: '$ping, $websocket, $xmlhttprequest rules',
        link: 'Filters/blocking-request-rules/test-blocking-request-rules.html',
        rulesUrl: 'Filters/blocking-request-rules/test-blocking-request-rules.txt',
        compatibility: {
            none: CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Filters/blocking-request-rules/README.md',
    },
    {
        id: 34,
        title: 'Test $subdocument rules for Safari 15+',
        link: 'Filters/subdocument-rules/test-subdocument-rules.html',
        rulesUrl: 'Filters/subdocument-rules/test-subdocument-rules.txt',
        compatibility: {
            none: [
                ...CORELIBS_PRODUCTS,
                PRODUCT_TYPES.CHR,
                PRODUCT_TYPES.FOX,
                PRODUCT_TYPES.EDG,
                PRODUCT_TYPES.OPR,
                PRODUCT_TYPES.MV3,
                ...LEGACY_PRODUCTS,
            ],
        },
    },
    {
        id: 35,
        title: 'Non-basic $path modifier',
        link: 'Filters/nonbasic-path-modifier/test-nonbasic-path-modifier.html',
        rulesUrl: 'Filters/nonbasic-path-modifier/test-nonbasic-path-modifier.txt',
        compatibility: {
            none: LEGACY_PRODUCTS,
        },
        readmeUrl: 'Filters/nonbasic-path-modifier/README.md',
    },
    {
        id: 36,
        title: 'Advanced $domain modifier',
        link: 'Filters/advanced-domain-modifier/test-advanced-domain-modifier.html',
        rulesUrl: 'Filters/advanced-domain-modifier/test-advanced-domain-modifier.txt',
        compatibility: {
            none: LEGACY_PRODUCTS,
            partial: [
                {
                    product: PRODUCT_TYPES.MV3,
                    cases: [2, 7],
                    desc: 'Not yet implemented',
                },
                {
                    product: PRODUCT_TYPES.IOS,
                    cases: [6, 7],
                    desc: 'Not yet implemented',
                },
                {
                    product: PRODUCT_TYPES.SAF,
                    cases: [6, 7],
                    desc: 'Not yet implemented',
                },
            ],
        },
        readmeUrl: 'Filters/advanced-domain-modifier/README.md',
    },
    {
        id: 37,
        title: '$jsonprune modifier tests',
        link: 'Filters/jsonprune-rules/test-jsonprune-rules.html',
        rulesUrl: 'Filters/jsonprune-rules/test-jsonprune-rules.txt',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Filters/jsonprune-rules/README.md',
    },
    {
        id: 38,
        title: '$hls modifier tests',
        link: 'Filters/hls-rules/test-hls-rules.html',
        rulesUrl: 'Filters/hls-rules/test-hls-rules.txt',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Filters/hls-rules/README.md',
    },
    {
        id: 39,
        title: '$method modifier tests',
        link: 'Filters/method-rules/test-method-rules.html',
        rulesUrl: 'Filters/method-rules/test-method-rules.txt',
        compatibility: {
            none: NO_METHOD_PRODUCTS,
        },
        readmeUrl: 'Filters/method-rules/README.md',
    },
    {
        id: 40,
        title: '$to modifier tests',
        link: 'Filters/to-rules/test-to-rules.html',
        rulesUrl: 'Filters/to-rules/test-to-rules.txt',
        compatibility: {
            none: NO_TO_PRODUCTS,
        },
        readmeUrl: 'Filters/to-rules/README.md',
    },
    {
        id: 41,
        title: '$cookie modifier tests',
        link: 'Filters/cookie-rules/test-cookie-rules.html',
        rulesUrl: 'Filters/cookie-rules/test-cookie-rules.txt',
        compatibility: {
            partial: [
                {
                    /**
                     * Can be fully supported after this issue will be resolved
                     * https://github.com/w3c/webextensions/issues/439
                     */
                    product: PRODUCT_TYPES.MV3,
                    cases: [3, 4, 5, 6],
                    desc: 'Not supported by MV3',
                },
            ],
            none: [
                PRODUCT_TYPES.SAF,
                PRODUCT_TYPES.IOS,
                PRODUCT_TYPES.CON,
            ],
        },
        readmeUrl: 'Filters/cookie-rules/README.md',
    },
    {
        id: 42,
        title: '$match-case modifier tests',
        link: 'Filters/match-case-rules/test-match-case-rules.html',
        rulesUrl: 'Filters/match-case-rules/test-match-case-rules.txt',
        compatibility: {
            full: true,
        },
        readmeUrl: 'Filters/match-case-rules/README.md',
    },
    {
        id: 43,
        title: 'Scriptlet allowlist specific rules',
        link: 'Filters/scriptlet-rules/allowlist-specific/test-scriptlet-allowlist-specific-rules.html',
        rulesUrl: 'Filters/scriptlet-rules/allowlist-specific/test-scriptlet-allowlist-specific-rules.txt',
        compatibility: {
            none: [
                PRODUCT_TYPES.SAF,
                PRODUCT_TYPES.IOS,
                ...LEGACY_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/scriptlet-rules/README.md',
    },
    {
        id: 44,
        title: 'Scriptlet allowlist general rules',
        link: 'Filters/scriptlet-rules/allowlist-general/test-scriptlet-allowlist-general-rules.html',
        rulesUrl: 'Filters/scriptlet-rules/allowlist-general/test-scriptlet-allowlist-general-rules.txt',
        compatibility: {
            none: [
                PRODUCT_TYPES.SAF,
                PRODUCT_TYPES.IOS,
                ...LEGACY_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/scriptlet-rules/README.md',
    },
    {
        id: 45,
        title: '$urltransform rules test',
        link: 'Filters/urltransform-rules/test-urltransform-rules.html',
        rulesUrl: 'Filters/urltransform-rules/test-urltransform-rules.txt',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Filters/urltransform-rules/README.md',
    },
    {
        id: 46,
        title: '$permissions rules test',
        link: 'Filters/permissions-rules/test-permissions-rules.html',
        rulesUrl: 'Filters/permissions-rules/test-permissions-rules.txt',
        compatibility: {
            none: [
                // TODO: Wait until Permissions-Policy header bug is resolved to remove Firefox from the list
                PRODUCT_TYPES.FOX,
                PRODUCT_TYPES.EDL,
                PRODUCT_TYPES.SAF,
                PRODUCT_TYPES.IOS,
                PRODUCT_TYPES.CON,
                PRODUCT_TYPES.MV3,
            ],
        },
        readmeUrl: 'Filters/permissions-rules/README.md',
    },
    {
        id: 47,
        title: 'Strict party (strict-third-party and strict-first-party) modifiers tests',
        link: 'Filters/strict-party-rules/test-strict-party-rules.html',
        rulesUrl: 'Filters/strict-party-rules/test-strict-party-rules.txt',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        readmeUrl: 'Filters/strict-party-rules/README.md',

    },
    {
        id: 48,
        title: 'JS and Scriptlet rules: CSP and Trusted Types tests',
        link: 'csp',
        rulesUrl: 'Filters/content-security-policy/test-content-security-policy.txt',
        compatibility: {
            partial: [
                {
                    product: PRODUCT_TYPES.MV3,
                    desc: '',
                },
                {
                    product: PRODUCT_TYPES.SAF,
                    desc: '',
                },
                {
                    product: PRODUCT_TYPES.IOS,
                    desc: '',
                },
            ],
            none: [
                PRODUCT_TYPES.EDL,
                PRODUCT_TYPES.CON,
            ],
        },
        manual: true,
    },
    {
        id: 49,
        title: 'Injection speed tests',
        link: 'Filters/injection-speed/index.html',
        rulesUrl: 'Filters/injection-speed/test-injection-speed.txt',
        compatibility: {
            none: [
                PRODUCT_TYPES.EDL,
                PRODUCT_TYPES.CON,
            ],
        },
        manual: true,
    },
    /**
     * TODO: This is copy of `$permissions rules test` but slightly
     * adjusted for MV3, we may remove it after AG-22490 done.
     */
    {
        id: 50,
        title: '$permissions rules test for MV3',
        link: 'Filters/permissions-rules-mv3/test-permissions-rules-mv3.html',
        rulesUrl: 'Filters/permissions-rules-mv3/test-permissions-rules-mv3.txt',
        compatibility: {
            none: [
                ...CORELIBS_PRODUCTS,
                PRODUCT_TYPES.CHR,
                PRODUCT_TYPES.FOX,
                PRODUCT_TYPES.EDG,
                PRODUCT_TYPES.OPR,
                PRODUCT_TYPES.SAF,
                PRODUCT_TYPES.IOS,
                ...LEGACY_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/permissions-rules-mv3/README.md',
    },
    {
        // IMPORTANT: Update USERSCRIPTS_TEST_IDS if this id is changed
        id: 51,
        title: 'Userscripts: Content security policy (CSP) tests',
        link: 'userscripts-csp',
        rulesUrl: 'Userscripts/cspTester/csp-tester.user.js',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
        manual: true,
    },
    {
        id: 52,
        title: '$header rules',
        link: 'Filters/header-rules/test-header-rules.html',
        rulesUrl: 'Filters/header-rules/test-header-rules.txt',
        compatibility: {
            none: [
                ...SAFARI_CONVERTER_LIB_PRODUCTS,
                ...LEGACY_PRODUCTS,
                PRODUCT_TYPES.MV3, // TODO: AG-41087
            ],
        },
        readmeUrl: 'Filters/header-rules/README.md',
    },
    {
        // IMPORTANT: Update USERSCRIPTS_TEST_IDS if this id is changed
        id: 53,
        title: 'Userscripts: Single Page Application (SPA) tests',
        link: 'Userscripts/spa-tests.html',
        rulesUrl: 'Userscripts/spaTester/spa-tester.user.js',
        compatibility: {
            none: NONE_CORELIBS_PRODUCTS,
        },
    },
    {
        id: 54,
        title: 'CSP reports tests',
        link: 'Filters/csp-reports/test-csp-reports.html',
        rulesUrl: 'Filters/csp-reports/test-csp-reports.txt',
        compatibility: {
            none: [
                ...NO_CSP_PRODUCTS,
            ],
        },
        readmeUrl: 'Filters/csp-reports/README.md',
        manual: true,
    },
];

export default testsData;
