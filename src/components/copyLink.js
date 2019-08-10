import React from 'react';

export default class copyLink extends React.Component {
    copyLink = () => {
        if (this.props.rules) {
            const dummy = document.createElement('textarea');
            document.body.appendChild(dummy);
            dummy.value = window.location.href + this.props.rules;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
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
