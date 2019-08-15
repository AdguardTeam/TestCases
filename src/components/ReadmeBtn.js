import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ShowReadme from './ShowReadme'
import customStyles from '../helpers/modalStyles'

Modal.setAppElement('#root');

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
        const { readmeBtnState, readmeUrl } = this.props;
        const { modalIsOpen } = this.state;
        return (
            <span>
                <button
                    type="button"
                    name="Show Readme file"
                    onClick={this.openModal}
                    rel="noopener noreferrer"
                    className={`btn readme ${readmeBtnState}`}
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
    readmeBtnState: PropTypes.string.isRequired,
};

ReadmeBtn.defaultProps = {
    readmeUrl: '',
};