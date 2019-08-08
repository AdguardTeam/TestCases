import React from 'react'

import TestItem from './testItem'
import testsData from '../testsData'

const TestList = () => {
    const testList = testsData.map(item =>
        <TestItem title = {item.title}
                  link = {item.link}
                  rules = {item.rules}
                  compatibility = {item.compatibility}
                  incompatibility = {item.incompatibility} />
    )
    return (
        <div className="test-container">
            {testList}
        </div>
    )
}

export default TestList