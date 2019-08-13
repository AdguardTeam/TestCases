import React from 'react';

import PropTypes from 'prop-types';
import toClipboard from '../helpers/toClipboard';

export default class CopyRules extends React.Component {
    copyRules = async () => {
        const url = window.location.href + this.props.rulesUrl;
        const response = await fetch(url);
        const responseText = await response.text();
        toClipboard(responseText);
        alert(`The rules for the test "${this.props.title}" have been copied to your clipboard.`);
    }

    render() {
        const { rulesBtnState } = this.props;
        return (
            <button
                className={`btn copyRules ${rulesBtnState}`}
                type="button"
                name="Copy rules list"
                onClick={this.copyRules}
            >
                Copy rules
            </button>
        );
    }
}

CopyRules.propTypes = {
    rulesUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rulesBtnState: PropTypes.string.isRequired,
};

CopyRules.defaultProps = {
    rulesUrl: '',
};
