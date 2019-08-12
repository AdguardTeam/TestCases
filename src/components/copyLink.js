import React from 'react';

import PropTypes from 'prop-types';
import toClipboard from './toClipboard';

export default class CopyLink extends React.Component {
    copyLink = () => {
        if (this.props.rulesUrl) {
            const url = window.location.href + this.props.rulesUrl;
            toClipboard(url);
            alert(`Link for the rules for test "${this.props.title}" have been copied to your clipboard.`);
        }
    }

    render() {
        const { rulesBtnState } = this.props;
        return (
            <button
                className={`btn copyLink ${rulesBtnState}`}
                type="button"
                name="Copy link for rules file"
                onClick={this.copyLink}
            >
                Copy link
            </button>
        );
    }
}

CopyLink.propTypes = {
    rulesUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rulesBtnState: PropTypes.string.isRequired,
};

CopyLink.defaultProps = {
    rulesUrl: '',
};
