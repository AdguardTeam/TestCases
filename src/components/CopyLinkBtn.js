import React from 'react';

import PropTypes from 'prop-types';
import toClipboard from '../helpers/toClipboard';

export default class CopyLinkBtn extends React.Component {
    copyLink = () => {
        if (this.props.rulesUrl) {
            const url = window.location.href + this.props.rulesUrl;
            toClipboard(url);
            alert(`Link for the rules for test "${this.props.title}" have been copied to your clipboard.`);
        }
    }

    render() {
        const { copyLinkBtn } = this.props;
        return (
            <button
                className={`btn copyLink ${copyLinkBtn}`}
                type="button"
                name="Copy link for rules file"
                onClick={this.copyLink}
            >
                Copy link
            </button>
        );
    }
}

CopyLinkBtn.propTypes = {
    rulesUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    copyLinkBtn: PropTypes.string.isRequired,
};

CopyLinkBtn.defaultProps = {
    rulesUrl: '',
};
