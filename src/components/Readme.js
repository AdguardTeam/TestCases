import React from 'react';

const Readme = ({ readmeUrl }) => (
    <a
        href={window.location.href + readmeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn readme ${readmeUrl === '' ? ' disabled' : ''}`}
        title="README.md"
    >
        Readme
    </a>
);

export default Readme;
