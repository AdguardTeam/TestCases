/**
 * Converts object to array of values.
 * Object.values() polyfill because it is not supported by IE
 * https://caniuse.com/?search=Object.values
 * @param {Object} object
 * @returns {Array} array of values
 */
export const getObjectValues = (object) => {
    const keys = Object.keys(object);
    const values = [];
    keys.forEach((key) => values.push(object[key]));
    return values;
};
