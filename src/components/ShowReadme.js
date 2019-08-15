import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import getFile from '../helpers/getFile'

export default class ShowReadme extends React.Component {
    state = {
        readmeFile: '',
    };

    componentDidMount() {
        this.getReadme();
    }

    getReadme = async () => {
        const { readmeUrl } = this.props;
        this.setState({ readmeFile: await getFile(readmeUrl) });
    }

    render() {
        const { readmeFile } = this.state;
        return (
            <div>
                <ReactMarkdown source={readmeFile} />
            </div>
        );
    }
}

ShowReadme.propTypes = {
    readmeUrl: PropTypes.string,
};

ShowReadme.defaultProps = {
    readmeUrl: '',
};
