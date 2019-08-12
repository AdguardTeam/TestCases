import React from 'react';

import PropTypes from 'prop-types';
import Readme from './Readme';
import CopyLink from './CopyLink';
import CopyRules from './CopyRules';
import SubscribeFilter from './SubscribeFilter';

export default class TestItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rulesBtnState: '',
            readmeBtnState: '',
        };
    }

    componentDidMount() {
        const {
            rulesUrl, readmeUrl,
        } = this.props;
        this.setState({ rulesBtnState: rulesUrl ? 'enabled' : 'disabled' });
        this.setState({ readmeBtnState: readmeUrl ? 'enabled' : 'disabled' });
    }

    render() {
        const {
            title, link, rulesUrl, compatibility, incompatibility, readmeUrl,
        } = this.props;
        const {
            readmeBtnState, rulesBtnState,
        } = this.state;
        return (
            <div className="testItem-container">
                <div className="test-info">
                    <a
                        href={link}
                        className="test-title"
                    >
                        {title}
                    </a>
                    <div className="compatibility">{compatibility}</div>
                    <div className="incompatibility">{incompatibility}</div>
                </div>
                <div className="test-actions">
                    <Readme
                        readmeBtnState={readmeBtnState}
                        readmeUrl={readmeUrl}
                    />
                    <CopyLink
                        rulesBtnState={rulesBtnState}
                        rulesUrl={rulesUrl}
                        title={title}
                    />
                    <CopyRules
                        rulesBtnState={rulesBtnState}
                        rulesUrl={rulesUrl}
                        title={title}
                    />
                    <SubscribeFilter
                        rulesBtnState={rulesBtnState}
                        rulesUrl={rulesUrl}
                    />
                </div>
                <div className="spacer" />
            </div>
        );
    }
}

TestItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    rulesUrl: PropTypes.string,
    readmeUrl: PropTypes.string,
    compatibility: PropTypes.string,
    incompatibility: PropTypes.string,
};

TestItem.defaultProps = {
    rulesUrl: '',
    readmeUrl: '',
    compatibility: '',
    incompatibility: '',
};
