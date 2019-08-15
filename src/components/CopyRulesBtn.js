import React from 'react';

import PropTypes from 'prop-types';
import getFile from '../helpers/getFile'
import toClipboard from '../helpers/toClipboard';

export default class CopyRulesBtn extends React.Component {
    copyRules = async () => {
        const rules = await getFile(this.props.rulesUrl)
        toClipboard(rules);
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

CopyRulesBtn.propTypes = {
    rulesUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rulesBtnState: PropTypes.string.isRequired,
};

CopyRulesBtn.defaultProps = {
    rulesUrl: '',
};
