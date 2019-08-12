import React from 'react';

import PropTypes from 'prop-types';
import TestItem from './TestItem';
import testsData from '../testsData';

const TestList = () => {
    const testList = testsData.map(item => (
        <TestItem key={item.id} {...item} />
    ));
    return (
        <div className="testList-container">
            {testList}
        </div>
    );
};

TestItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    rulesUrl: PropTypes.string,
    readmeUrl: PropTypes.string,
    compatibility: PropTypes.string,
    incompatibility: PropTypes.string,
};

TestItem.defaultProps = {
    rulesUrl: '',
    readmeUrl: '',
    compatibility: '',
    incompatibility: '',
};

export default TestList;
