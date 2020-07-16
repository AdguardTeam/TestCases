import React from 'react';
import TestItem from './TestItem';
import testsData from '../testsData';

export default class TestList extends React.Component {
    state = {};

    onSearch = (event) => {
        const { value } = event.target;
        const escapedValue = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const searchTerm = new RegExp(escapedValue.toLowerCase());
        this.setState({ searchTerm });
    };

    renderTestsData = testsData => testsData
        .map(testsData => <TestItem key={testsData.id} {...testsData} />)

    filterTests = (testsData, searchTerm) => {
        if (!searchTerm) {
            return this.renderTestsData(testsData);
        }
        const filteredTests = testsData.filter((testData) => {
            const testTitle = testData.title.toLowerCase();
            return searchTerm.test(testTitle);
        });
        if (filteredTests.length > 0) {
            return this.renderTestsData(filteredTests);
        }
        return 'There is no test matching this name.';
    };

    render() {
        const { searchTerm } = this.state;
        return (
            <div className="testList-container">
                <form>
                    <input
                        type="text"
                        className="search-form"
                        placeholder="Search for the test"
                        onChange={this.onSearch}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                    />
                </form>
                {this.filterTests(testsData, searchTerm)}
            </div>
        );
    }
}
