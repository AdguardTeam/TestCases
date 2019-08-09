import React from 'react';

import Readme from './Readme';
import CopyLink from './copyLink';
import CopyRules from './copyRules';
import SubscribeFilter from './subscribeFilter';

const TestItem = ({
    title, link, rules, readmeUrl, compatibility, incompatibility,
}) => (
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
            <Readme readmeUrl={readmeUrl} />
            <CopyLink
                rules={rules}
                title={title}
            />
            <CopyRules
                rules={rules}
                title={title}
            />
            <SubscribeFilter rules={rules} />
        </div>
        <div className="spacer" />
    </div>
);

export default TestItem;
