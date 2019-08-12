import React from 'react';
import PropTypes from 'prop-types';

const Readme = ({ readmeBtnState, readmeUrl }) => (
    <a
        href={window.location.href + readmeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn readme ${readmeBtnState}`}
        title="README.md"
    >
        Readme
    </a>
);

export default Readme;

Readme.propTypes = {
    readmeUrl: PropTypes.string,
    readmeBtnState: PropTypes.string.isRequired,
};

Readme.defaultProps = {
    readmeUrl: '',
};