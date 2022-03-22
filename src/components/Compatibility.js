import React from 'react';
import PropTypes from 'prop-types';
import { parseCompatibility } from '../helpers';

const Compatibility = ({ compatibility }) => {
    const productsData = parseCompatibility(compatibility);

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
            compatible: PropTypes.arrayOf(PropTypes.string),
            incompatible: PropTypes.arrayOf(PropTypes.string),
        }),
    }).isRequired,
};
