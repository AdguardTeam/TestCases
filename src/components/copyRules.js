import React from 'react';

export default class copyRules extends React.Component {
    copyRules = async () => {
        const url = window.location.href + this.props.rules;
        const response = await fetch(url);
        const responseText = await response.text();
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = responseText;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
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
