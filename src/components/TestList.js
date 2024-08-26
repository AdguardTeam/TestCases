/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import TestItem from './TestItem';
import testsData from '../testsData';
import { parseCompatibility } from '../helpers';
import { FIREFOX_BUILDS, PRODUCT_TYPES } from '../constants';

const ANY_PRODUCT = 'All products';

export default class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: ANY_PRODUCT,
        };
    }

    onSearch = (event) => {
        const { value } = event.target;
        const escapedValue = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const searchTerm = new RegExp(escapedValue.toLowerCase());
        this.setState({ searchTerm });
    };

    onProductFilter = (event) => {
        const { value } = event.target;
        this.setState({ selectedProduct: value });
    };

    renderTestsData = (testsData) => testsData
        // eslint-disable-next-line react/jsx-props-no-spreading
        .map((testsData) => <TestItem key={testsData.id} {...testsData} />);

    filterTests = (testsData, searchTerm, selectedProduct) => {
        // default state - nothing in search field and no specific product selected
        if (!searchTerm
            && selectedProduct === ANY_PRODUCT) {
            return testsData;
        }

        let filteredTests = [];

        // filter by product first
        if (selectedProduct === ANY_PRODUCT) {
            filteredTests = testsData;
        } else {
            // filter test data objects by supported products
            testsData.forEach((testData) => {
                const { compatibility, exceptions } = parseCompatibility(testData.compatibility).publicData;
                // array of fully or partially supported products
                if (compatibility.includes(selectedProduct)) {
                    const exceptionCases = [];
                    const productExceptionsData = exceptions
                        && exceptions.find((ex) => Object.keys(ex)[0] === selectedProduct);
                    if (productExceptionsData) {
                        exceptionCases.push(...productExceptionsData[selectedProduct]);
                    }
                    // add exceptions to the test data object
                    // so they can be retrieved later and added into query string during rendering
                    const preparedTestData = {
                        ...testData,
                        exceptions: exceptionCases,
                    };
                    filteredTests.push(preparedTestData);
                }
            });
        }

        // if search term is empty, we need to match any test name
        const searchRegexp = searchTerm || /.?/;

        // filters by test name
        filteredTests = filteredTests.filter((testData) => {
            const testTitle = testData.title.toLowerCase();
            return searchRegexp.test(testTitle);
        });

        if (filteredTests.length > 0) {
            return filteredTests;
        }

        return null;
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    renderTests = (testsData, searchTerm, selectedProduct) => {
        const filteredTests = this.filterTests(testsData, searchTerm, selectedProduct);

        return filteredTests
            ? this.renderTestsData(filteredTests)
            : <div className="no-test-found">No test found</div>;
    };

    getProductOptions = () => {
        const anyProductOption = <option key={ANY_PRODUCT} value={ANY_PRODUCT}>{ANY_PRODUCT}</option>;
        const specificProductOptions = Object.values(PRODUCT_TYPES)
            .map((product) => <option key={product} value={product}>{product}</option>);
        const specificFirefoxBuilds = Object.values(FIREFOX_BUILDS)
            .map((product) => <option key={product} value={product}>{product}</option>);
        return [
            anyProductOption,
            ...specificProductOptions,
            ...specificFirefoxBuilds,
        ];
    };

    render() {
        const { searchTerm, selectedProduct } = this.state;
        return (
            <div className="testList-container">
                <form className="testList-control">
                    <input
                        type="text"
                        className="search-form"
                        placeholder="Search by test name"
                        onChange={this.onSearch}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                    />
                </form>
                <form className="testList-control product-form">
                    <select
                        size="1"
                        name="product"
                        className="product-select"
                        onChange={this.onProductFilter}
                        value={selectedProduct}
                    >
                        {this.getProductOptions()}
                    </select>
                </form>
                <div>
                    {this.renderTests(testsData, searchTerm, selectedProduct)}
                </div>
            </div>
        );
    }
}
