import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { getFile } from '../helpers';

export default class ShowReadme extends React.Component {
    state = {
        readmeFile: '',
    };

    async componentDidMount() {
        await this.getReadme();
    }

    getReadme = async () => {
        const { readmeUrl } = this.props;
        const file = await getFile(readmeUrl);
        this.setState({ readmeFile: file });
    }

    render() {
        const { readmeFile } = this.state;
        return (
            <div>
                <ReactMarkdown
                    className="readmeText"
                >
                    {readmeFile}
                </ReactMarkdown>
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
