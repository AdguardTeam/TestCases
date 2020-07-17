import React from 'react';

import PropTypes from 'prop-types';
import StartTestBtn from './StartTestBtn';
import ReadmeBtn from './ReadmeBtn';
import CopyLinkBtn from './CopyLinkBtn';
import CopyRulesBtn from './CopyRulesBtn';
import SubscribeFilterBtn from './SubscribeFilterBtn';

const TestItem = ({
    title, link, rulesUrl, compatibility, incompatibility, readmeUrl,
}) => {
    const rulesBtn = () => (rulesUrl ? 'enabled' : 'disabled');

    const readmeBtn = () => (readmeUrl ? 'enabled' : 'disabled');

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
                    readmeBtn={readmeBtn()}
                    readmeUrl={readmeUrl}
                />

                <CopyLinkBtn
                    copyLinkBtn={rulesBtn()}
                    rulesUrl={rulesUrl}
                    title={title}
                />

                <CopyRulesBtn
                    copyRulesBtn={rulesBtn()}
                    rulesUrl={rulesUrl}
                    title={title}
                />

                <SubscribeFilterBtn
                    subscribeBtn={rulesBtn()}
                    rulesUrl={rulesUrl}
                />

            </div>
            <div className="spacer" />
        </div>
    );
};

export default TestItem;

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
