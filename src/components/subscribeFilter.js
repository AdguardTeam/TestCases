import React from 'react';

const SubscribeFilter = ({ rulesBtnState, rules }) => (
    <a
        href={`https://subscribe.adblockplus.org?location=${window.location.href}${rules}`}
        className={`btn subscribe ${rulesBtnState}`}
        title="Subscribe filter"
    >
        Subscribe
    </a>
);

export default SubscribeFilter;
