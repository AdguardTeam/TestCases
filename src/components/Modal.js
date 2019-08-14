import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown'
import NewWindow from 'react-new-window'

const Modal = ({ readmeUrl }) => {
    // const responseText2 = fetch(window.location.href + readmeUrl).text();
    const url = window.location.href + readmeUrl;
    const response = fetch(url);
    const responseText = response.text();
    // const responseText = '* ### QQQQQ!';
    return (
        <NewWindow>
            <ReactMarkdown
                className="modal"
                source={responseText}
            />
        </NewWindow>
    );
}

export default Modal;

Modal.propTypes = {
    readmeUrl: PropTypes.string,
};

Modal.defaultProps = {
    readmeUrl: '',
};