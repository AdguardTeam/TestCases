import React from 'react';
import PropTypes from 'prop-types';

import {
    ALL_PRODUCTS,
} from '../constants';

const Compatibility = ({ compatibility }) => {
    const isFullyCompatible = compatibility?.full;
    const isPartlyCompatible = typeof compatibility?.partial !== 'undefined';
    const isIncompatible = typeof compatibility?.none !== 'undefined';
    const specialCompatibility = typeof compatibility?.special !== 'undefined';

    const getPartlyCompatible = exceptions => (exceptions
        .map(ex => `${ex.product} (exception cases: ${ex.cases.join(', ')})`));

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
            productsData.partial.push(getPartlyCompatible(compatibility.partial.exceptions));
            noneFullProducts.push(...compatibility.partial.exceptions.map(ex => ex.product));
        }
        if (isIncompatible) {
            productsData.none.push(...compatibility.none.products);
            noneFullProducts.push(...compatibility.none.products);
        }
        productsData.full.push(...ALL_PRODUCTS.filter(p => !noneFullProducts.includes(p)));
    }

    if (specialCompatibility) {
        productsData.full = [...compatibility.special.compatibile];
        productsData.none = [...compatibility.special.incompatibile];
    }

    return (
        <div className="compatibility">
            <div className="full-compatibility">
                {productsData.full.join(', ')}
            </div>
            {
                productsData.partial.length > 0
                && (
                <div className="partial-compatibility">
                    {productsData.partial.join(', ')}
                </div>
                )
            }
            {
                productsData.none.length > 0
                && (
                <div className="none-compatibility">
                    {productsData.none.join(', ')}
                </div>
                )
            }
        </div>
    );
};

export default Compatibility;

Compatibility.propTypes = {
    compatibility: PropTypes.shape({
        full: PropTypes.bool,
        partial: PropTypes.shape({
            exceptions: PropTypes.arrayOf(PropTypes.shape({
                products: PropTypes.string,
                cases: PropTypes.arrayOf(PropTypes.number),
            })),
        }),
        none: PropTypes.shape({
            products: PropTypes.arrayOf(PropTypes.string),
        }),
        special: PropTypes.shape({
            compatibile: PropTypes.arrayOf(PropTypes.string),
            incompatibile: PropTypes.arrayOf(PropTypes.string),
        }),
    }).isRequired,
};
