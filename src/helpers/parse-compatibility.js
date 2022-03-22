import { ALL_PRODUCTS } from '../constants';

/**
 * Simplified compatibility object
 * @typedef SimpleCompatibilityData
 * @property {string[]} full
 * @property {string[]} partial
 * @property {string[]} none
 */

/**
 * Parses CompatibilityData type object from testsData to SimpleCompatibilityData
 * @param {import('../testsData').CompatibilityData} compatibility
 * @returns {SimpleCompatibilityData}
 */
export const parseCompatibility = (compatibility) => {
    const isFullyCompatible = compatibility && compatibility.full;
    const isPartlyCompatible = compatibility && typeof compatibility.partial !== 'undefined';
    const isIncompatible = compatibility && typeof compatibility.none !== 'undefined';
    const specialCompatibility = compatibility && typeof compatibility.special !== 'undefined';

    const getPartlyCompatible = exceptions => (exceptions
        .map((ex) => {
            const cases = ex.cases ? ` (exception cases: ${ex.cases.join(', ')})` : '';
            const description = ex.desc ? ` (${ex.desc})` : '';
            return `${ex.product}${cases}${description}`;
        })
    );

    const productsData = {
        full: [],
        partial: [],
        none: [],
    };

    if (isFullyCompatible) {
        productsData.full.push(...ALL_PRODUCTS);
    } else {
        const noneFullProducts = [];
        if (isPartlyCompatible) {
            productsData.partial = getPartlyCompatible(compatibility.partial.exceptions);
            noneFullProducts.push(...compatibility.partial.exceptions.map(ex => ex.product));
        }
        if (isIncompatible) {
            productsData.none.push(...compatibility.none.products);
            noneFullProducts.push(...compatibility.none.products);
        }
        productsData.full.push(
            ...ALL_PRODUCTS.filter(p => !(noneFullProducts.indexOf(p) > -1))
        );
    }

    if (specialCompatibility) {
        productsData.full = [...compatibility.special.compatible];
        productsData.none = [...compatibility.special.incompatible];
    }

    return productsData;
};
