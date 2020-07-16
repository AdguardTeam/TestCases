import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ShowReadme from './ShowReadme';

const customStyles = {
    content: {
        width: '100%',
        height: '100%',
        padding: '5vw',
        boxSizing: 'border-box',
        borderRadius: '0',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        border: 'unset',
        background: '#585965',
        color: 'white',
    },
};

Modal.setAppElement(document.getElementById('root'));

export default class ReadmeBtn extends React.Component {
    state = {
        modalIsOpen: false,
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { readmeBtn, readmeUrl } = this.props;
        const { modalIsOpen } = this.state;
        return (
            <span>
                <button
                    type="button"
                    name="Show Readme file"
                    onClick={this.openModal}
                    rel="noopener noreferrer"
                    className={`btn readme ${readmeBtn}`}
                    title="README.md"
                >
                    Readme
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="README.md"
                >
                    <button
                        onClick={this.closeModal}
                        type="button"
                        className="close-readme"
                    />
                    <ShowReadme readmeUrl={readmeUrl} />
                </Modal>
            </span>
        );
    }
}

ReadmeBtn.propTypes = {
    readmeUrl: PropTypes.string,
    readmeBtn: PropTypes.string.isRequired,
};

ReadmeBtn.defaultProps = {
    readmeUrl: '',
};
