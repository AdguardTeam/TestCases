import React from 'react';

export default class TestItem extends React.Component {
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

    btnClass = () => (`btn copyLink${this.props.rules === '' ? ' disabled' : ''}`)

    render() {
        return (
            <button
                className={this.btnClass()}
                type="button"
                name="Copy link for rules file"
                onClick={this.copyLink}
            >
                Copy link
            </button>
        );
    }
}
