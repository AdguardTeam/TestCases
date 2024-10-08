import { ALL_PRODUCTS } from '../constants';

/**
 * Compatibility data with arrays of strings for frontend.
 *
 * @typedef FrontendDataCompatibility
 * @property {string[]} full List of fully supported products.
 * @property {string[]} partial List of partially supported products.
 * @property {string[]} none List of unsupported products.
 */

/**
 * Exception data object for public data where
 * - key is a product name
 * - value is an array of exception cases for the product.
 *
 * @typedef {Object} PublicException
 */

/**
 * Compatibility data with for public data.json preparation.
 *
 * @typedef PublicDataCompatibility
 * @property {string[]} compatibility List of supported products - fully and partially.
 * @property {PublicException[]} exceptions List of exceptions for partially supported products.
 */

/**
 * Compatibility data for public data.json and frontend preparation.
 *
 * @typedef ParsedCompatibilityData
 * @property {FrontendDataCompatibility} frontendData
 * @property {PublicDataCompatibility} publicData
 */

/**
 * Parses partial compatibility data into array of strings.
 *
 * @param {import('../testsData').PartialException[]} exceptions
 *
 * @returns {string[]} Array of strings formatted for frontend — exceptions and descriptions.
 */
const getPartlyCompatibleStrings = (exceptions) => (exceptions
    .map((ex) => {
        const cases = ex.cases ? ` (exception cases: ${ex.cases.join(', ')})` : '';
        const description = ex.desc ? ` (${ex.desc})` : '';
        return `${ex.product}${cases}${description}`;
    })
);

/**
 * Parses partial compatibility data into array of objects
 * where key is the product name and value is the array of exception cases.
 *
 * @param {import('../testsData').PartialException[]} exceptions
 *
 * @returns Partial compatibility case exceptions, no info descriptions.
 */
const getPartlyCompatibleExceptions = (exceptions) => {
    const caseExceptions = [];
    exceptions.forEach((ex) => {
        if (ex.cases) {
            // get the product name as the key and the cases as the value of the result object
            caseExceptions.push({ [ex.product]: ex.cases });
        }
    });
    return caseExceptions;
};

/**
 * Parses CompatibilityData type object from testsData.
 * `compatibility` may contain such properties: `full`, `none`, `partial`, `special`,
 * and only one of them should be defined.
 *
 * @param {import('../testsData').CompatibilityData} compatibility
 *
 * @returns {ParsedCompatibilityData}
 */
export const parseCompatibility = (compatibility) => {
    if (!compatibility) {
        throw new Error('No compatibility data provided');
    }

    const { full, special } = compatibility;
    const isFullOrSpecialSet = typeof full !== 'undefined'
        || typeof special !== 'undefined';

    // for 'full' or 'special' there is no sense to define other properties
    if (isFullOrSpecialSet && Object.keys(compatibility).length > 1) {
        throw new Error("Invalid compatibility: 'full' or 'special' should be defined alone");
    }

    const frontendData = {
        full: [],
        partial: [],
        none: [],
    };
    const publicData = {
        compatibility: [],
        exceptions: [],
    };

    /**
     * FULL
     */
    if (compatibility.full) {
        frontendData.full = ALL_PRODUCTS;
        publicData.compatibility = ALL_PRODUCTS;
    }
    /**
     * SPECIAL
     */
    if (typeof compatibility.special !== 'undefined') {
        frontendData.full = compatibility.special.compatible;
        frontendData.none = compatibility.special.incompatible;
        publicData.compatibility = compatibility.special.compatible;
        publicData.none = compatibility.special.incompatible;
    }

    /**
     * Since `full` and `special` should not be set with any other compatibility properties,
     * `none` and 'partial' can be combined:
     *
     * For example, 'Extended CSS rules':
     * - supported by MV3 extension but partially — except case 22 (until ExtendedCss v2.0.52)
     * - absolutely not supported by Android Content Blocker
     * - fully supported by all other products.
     */
    let supportedProducts = ALL_PRODUCTS;

    /**
     * NONE
     */
    if (typeof compatibility.none !== 'undefined') {
        supportedProducts = supportedProducts.filter((p) => !(compatibility.none.indexOf(p) > -1));

        frontendData.full = supportedProducts;
        frontendData.none = compatibility.none;

        publicData.compatibility = supportedProducts;
        publicData.none = compatibility.none;
    }

    /**
     * PARTIAL
     */
    if (typeof compatibility.partial !== 'undefined') {
        // needed to exclude products from "green" supported products in the frontend
        const noneFullProducts = compatibility.partial.map((ex) => ex.product);
        // we should check the products which were filtered by 'none' property
        // as it may be set along with 'partial'.
        // this filtering is needed to display the compatibility on frontend correctly
        supportedProducts = supportedProducts.filter((p) => !(noneFullProducts.indexOf(p) > -1));

        frontendData.full = supportedProducts;
        frontendData.partial = getPartlyCompatibleStrings(compatibility.partial);

        // not fully supported products considered as supported for public data
        publicData.compatibility = [...supportedProducts, ...noneFullProducts];
        publicData.exceptions = getPartlyCompatibleExceptions(compatibility.partial);
    }

    return {
        frontendData,
        publicData,
    };
};
