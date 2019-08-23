import React from 'react';

import PropTypes from 'prop-types';
import getFile from '../helpers/getFile';
import toClipboard from '../helpers/toClipboard';

export default class CopyRulesBtn extends React.Component {
    state = {
        rulesText: '',
    }
    componentDidMount = async () => {
        this.state.rulesText = await getFile(this.props.rulesUrl);
    }

    copyRules = async () => {
        await toClipboard(this.state.rulesText, `The rules for the test "${this.props.title}" have been copied to your clipboard.`);
    }

    render() {
        const { copyRulesBtn } = this.props;
        return (
            <button
                className={`btn copyRules ${copyRulesBtn}`}
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
    copyRulesBtn: PropTypes.string.isRequired,
};

CopyRulesBtn.defaultProps = {
    rulesUrl: '',
};
