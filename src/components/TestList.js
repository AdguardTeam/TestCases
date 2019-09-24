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
        document.querySelector(".search-form").focus();
    }

    searchName = (event) => {
        const filteredList = [...testList].filter((item) => {
            return item.props.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        })
        filteredList.length === 0 ?
            this.setState({ list: "There is no test matching this name"}) :
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
                    />
                </form>
                {list}
            </div>
        );
    }
}
