import React from 'react';

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

export default TestList;
