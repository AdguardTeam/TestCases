import React from 'react';

import PropTypes from 'prop-types';
import TestItem from './testItem';
import testsData from '../testsData';

const TestList = () => {
    const testList = testsData.map(item => (
        <TestItem
            key={item.id}
            title={item.title}
            link={item.link}
            rules={item.rules}
            readmeUrl={item.readmeUrl}
            compatibility={item.compatibility}
            incompatibility={item.incompatibility}
        />
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
    rules: PropTypes.string,
    readmeUrl: PropTypes.string,
    compatibility: PropTypes.string,
    incompatibility: PropTypes.string,
};

TestItem.defaultProps = {
    rules: '',
    readmeUrl: '',
    compatibility: '',
    incompatibility: '',
};

export default TestList;
