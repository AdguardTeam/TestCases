import React from 'react';
import PropTypes from 'prop-types';

const StartTestBtn = ({ link }) => (
    <a
        href={link}
        className="btn startTest"
        title="Start test"
        target="_blank"
        rel="noopener noreferrer"
    >
        Start test
    </a>
);

export default StartTestBtn;

StartTestBtn.propTypes = {
    link: PropTypes.string.isRequired,
};
