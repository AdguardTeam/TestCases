import React from 'react';

import PropTypes from 'prop-types';
import StartTestBtn from './StartTestBtn';
import ReadmeBtn from './ReadmeBtn';
import CopyLinkBtn from './CopyLinkBtn';
import CopyRulesBtn from './CopyRulesBtn';
import SubscribeFilterBtn from './SubscribeFilterBtn';

export default class TestItem extends React.Component {
    state = {
        rulesBtnState: this.props.rulesUrl ? 'enabled' : 'disabled',
        readmeBtnState: this.props.readmeUrl ? 'enabled' : 'disabled',
    };

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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="test-title"
                    >
                        {title}
                    </a>
                    <div className="compatibility">{compatibility}</div>
                    <div className="incompatibility">{incompatibility}</div>
                </div>
                <div className="test-actions">
                    
                    <StartTestBtn link={link} />
                    
                    <ReadmeBtn
                        readmeBtnState={readmeBtnState}
                        readmeUrl={readmeUrl}
                    />
                    
                    <CopyLinkBtn
                        rulesBtnState={rulesBtnState}
                        rulesUrl={rulesUrl}
                        title={title}
                    />
                    
                    <CopyRulesBtn
                        rulesBtnState={rulesBtnState}
                        rulesUrl={rulesUrl}
                        title={title}
                    />
                    
                    <SubscribeFilterBtn
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
