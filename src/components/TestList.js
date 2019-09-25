import React from 'react';

import TestItem from './TestItem';
import testsData from '../testsData';

const testList = testsData.map(item => (
    <TestItem key={item.id} {...item} />
));

export default class TestList extends React.Component {
    state = {}

    componentDidMount = () => {
        this.setState({ list: testList });
    }

    componentDidUpdate = () => {
        const message = document.querySelector('.not-found');
        this.state.list.length ?
            message.innerHTML = '' :
            message.innerHTML = 'There is no test matching this name';
    }

    searchName = (event) => {
        const filteredList = [...testList].filter((item) => {
            const escape = (string) => string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
            const keyword = new RegExp(escape(event.target.value, 'i'));
            const testTitle = item.props.title.toLowerCase();
            if (keyword.test(testTitle)) {
                return testTitle;
            } else return null;
        })
        this.setState({ list: filteredList})
    }

    render() {
        const { list } = this.state;
        return (
            <div className="testList-container">
                <form>
                    <input
                        type="text"
                        className="search-form"
                        placeholder="Search for the test"
                        onChange={this.searchName}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                    />
                </form>
                <span className="not-found" />
                {list}
            </div>
        );
    }
}
