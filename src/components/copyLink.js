import React from 'react'

export default class TestItem extends React.Component {

    copyLink = () => {
        if (this.props.rules) {
            let dummy = document.createElement("textarea")
            document.body.appendChild(dummy)
            dummy.value = window.location.href + this.props.rules
            dummy.select()
            document.execCommand("copy")
            document.body.removeChild(dummy)
            alert("The link for the rules have been copied to your clipboard. Enjoy your testing!")
        }
    }

    render() {
        return (
            <button
                className = {(this.props.rules === "" ? "disabled " : "") + "btn copyLink"}
                type = "button"
                name = "Copy link for rules file"
                onClick = {this.copyLink}>
                Copy link
            </button>
        )
    }
}