import React from 'react';

import PropTypes from 'prop-types';
import { getFile, copyToClipboard } from '../helpers';

export default class CopyRulesBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rulesText: '',
        };
    }

    componentDidMount() {
        const { rulesUrl } = this.props;
        (async () => {
            const rulesText = await getFile(rulesUrl);
            this.setState({ rulesText });
        })();
    }

    copyRules = async () => {
        await copyToClipboard(
            this.state.rulesText,
            `The rules for the test "${this.props.title}" have been copied to your clipboard.`,
        );
    };

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
