import React from 'react';
import PropTypes from 'prop-types';

import {
    ALL_PRODUCTS,
} from '../constants';

const Compatibility = (data) => {
    const { compatibility } = data;
    const isFullyCompatible = compatibility?.full;
    const isPartlyCompatible = typeof compatibility?.partial !== 'undefined';
    const isImcompatible = typeof compatibility?.none !== 'undefined';

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
        if (isImcompatible) {
            productsData.none.push(...compatibility.none.products);
            noneFullProducts.push(...compatibility.none.products);
        }
        productsData.full.push(...ALL_PRODUCTS.filter(p => !noneFullProducts.includes(p)));
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
    compatibility: PropTypes.shape({}).isRequired,
};
