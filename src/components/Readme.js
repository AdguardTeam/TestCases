import React from 'react';

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
