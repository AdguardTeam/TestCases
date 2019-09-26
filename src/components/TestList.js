import React from 'react';

import TestItem from './TestItem';
import testsData from '../testsData';

export default class TestList extends React.Component {
    state = {}

    componentDidMount = () => {
        const fullTestList = testsData.map(item => (
            <TestItem key={item.id} {...item} />
        ))
        this.setState({
            fullTestList: fullTestList,
            actualTestList: fullTestList,
        });
    }

    escape = string => string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    searcher = (event) => {
        const keyword = new RegExp(this.escape(event.target.value).toLowerCase());
        const { fullTestList } = this.state;
        const actualTestList = [...fullTestList].filter((item) => {
            const testTitle = item.props.title.toLowerCase();
            if (keyword.test(testTitle)) {
                return testTitle;
            } else return '';
        })
        this.setState({ actualTestList: actualTestList })
    }

    render() {
        const { actualTestList } = this.state;
        const message = document.querySelector('.not-found');
        if (message) { 
            actualTestList.length ?
                message.innerHTML = '' :
                message.innerHTML = 'There is no test matching this name.';
        }
        return (
            <div className="testList-container">
                <form>
                    <input
                        type="text"
                        className="search-form"
                        placeholder="Search for the test"
                        onChange={this.searcher}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                    />
                </form>
                <span className="not-found" />
                {actualTestList}
            </div>
        );
    }
}
