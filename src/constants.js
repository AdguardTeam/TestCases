import { getObjectValues } from './helpers/object-utils';

export const PRODUCT_TYPES = {
    WIN: 'Windows',
    MAC: 'MacOS',
    AND: 'Android',
    CHR: 'Chrome',
    EDG: 'Edge',
    FOX: 'Firefox',
    OPR: 'Opera',
    EDL: 'Edge Legacy',
    SAF: 'Safari',
    IOS: 'iOS',
    CON: 'Content Blocker',
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
    .filter(p => !CORELIBS_PRODUCTS.indexOf(p) > -1);

/**
 * Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker
 */
export const NO_REPLACE_CONTENT_PRODUCTS = [
    PRODUCT_TYPES.CHR,
    PRODUCT_TYPES.EDG,
    PRODUCT_TYPES.EDL,
    PRODUCT_TYPES.OPR,
    PRODUCT_TYPES.SAF,
    PRODUCT_TYPES.IOS,
    PRODUCT_TYPES.CON,
];

/**
 * Edge Legacy, Safari, iOS, Content Blocker
 */
export const NO_CSP_PRODUCTS = [
    PRODUCT_TYPES.EDL,
    PRODUCT_TYPES.SAF,
    PRODUCT_TYPES.IOS,
    PRODUCT_TYPES.CON,
];
