import React from 'react';
import PropTypes from 'prop-types';

export default class Readme extends React.Component {

    readmeClick() {
        // const { readmeUrl } = this.props;
        window.open(this.props.readmeUrl, "_blank")
    }

    render() {
        const { readmeBtnState } = this.props;
        return (
            <button
                type="button"
                name="Show Readme file"
                onClick={this.readmeClick}
                rel="noopener noreferrer"
                className={`btn readme ${readmeBtnState}`}
                title="README.md"
            >
                Readme
            </button>
        );
    }
}

Readme.propTypes = {
    readmeUrl: PropTypes.string,
    readmeBtnState: PropTypes.string.isRequired,
};

Readme.defaultProps = {
    readmeUrl: '',
};