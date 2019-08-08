import React from 'react'

export default class TestItem extends React.Component {

    copyRules = async () => {
        let url = window.location.href + this.props.rules
        let response = await fetch(url);
        let responseText = await response.text();
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = responseText;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("The rules have been copied to your clipboard. Enjoy your testing!");
    }

    render() {
        return (
                <button
                    class = {(this.props.rules === "" ? "disabled " : "") + "btn copyRules"}
                    type = "button"
                    name = "Copy rules list"
                    onClick = {this.copyRules}>
                    Copy rules
                </button>
        )
    }
}