import { getObjectValues } from './helpers/object-utils';

/**
 * IDs of tests which are userscripts
 * in testsData array in testsData.js
 */
export const USERSCRIPTS_TEST_IDS = [
    20,
    21,
    51,
    53,
];

export const PRODUCT_TYPES = {
    WIN: 'Windows',
    MAC: 'MacOS',
    AND: 'Android',
    CHR: 'Chrome MV2',
    EDG: 'Edge MV2',
    FOX: 'Firefox',
    OPR: 'Opera MV2',
    EDL: 'Edge Legacy', // Edge Legacy MV2, can be removed already
    SAF: 'Safari',
    IOS: 'iOS',
    CON: 'Content Blocker',
    MV3: 'Browser Extension MV3', // Chrome/Edge/Opera MV3
};

export const FIREFOX_BUILDS = {
    FOX_AMO: 'Firefox AMO',
    FOX_STDLN: 'Firefox Standalone',
};

export const ALL_PRODUCTS = getObjectValues(PRODUCT_TYPES);

/**
 * Windows, MacOS, Android
 */
export const CORELIBS_PRODUCTS = [
    PRODUCT_TYPES.WIN,
    PRODUCT_TYPES.MAC,
    PRODUCT_TYPES.AND,
];

/**
 * Chrome, Edge, Firefox, Opera, Edge Legacy, Safari, iOS, Content Blocker
 */
export const NONE_CORELIBS_PRODUCTS = ALL_PRODUCTS
    .filter((p) => !(CORELIBS_PRODUCTS.indexOf(p) > -1));

/**
 * Edge Legacy and Content Blocker
 */
export const LEGACY_PRODUCTS = [
    PRODUCT_TYPES.EDL,
    PRODUCT_TYPES.CON,
];

/**
 * Safari and iOS
 */
export const SAFARI_CONVERTER_LIB_PRODUCTS = [
    PRODUCT_TYPES.SAF,
    PRODUCT_TYPES.IOS,
];

/**
 * Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker, Browser Extension MV3
 */
export const NO_REPLACE_CONTENT_PRODUCTS = [
    PRODUCT_TYPES.CHR,
    PRODUCT_TYPES.EDG,
    PRODUCT_TYPES.EDL,
    PRODUCT_TYPES.OPR,
    PRODUCT_TYPES.SAF,
    PRODUCT_TYPES.IOS,
    PRODUCT_TYPES.CON,
    PRODUCT_TYPES.MV3,
];

/**
 * Edge Legacy, Safari, iOS, Content Blocker
 */
export const NO_CSP_PRODUCTS = [
    ...LEGACY_PRODUCTS,
    ...SAFARI_CONVERTER_LIB_PRODUCTS,
];

/**
 * Edge Legacy, Safari, iOS, Content Blocker
 */
export const NO_METHOD_PRODUCTS = [
    ...LEGACY_PRODUCTS,
    ...SAFARI_CONVERTER_LIB_PRODUCTS,
];

export const NO_TO_PRODUCTS = [
    ...LEGACY_PRODUCTS,
    ...SAFARI_CONVERTER_LIB_PRODUCTS,
];
