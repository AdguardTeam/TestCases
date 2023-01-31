import React from 'react';
import PropTypes from 'prop-types';

const getSubscribeUrl = (rulesUrl, filterTitle) => {
    const SAFARI_USER_AGENT_REGEXP = /\sVersion\/(\d{2}\.\d)(.+\s|\s)(Safari)\//;
    const isSafariBrowser = SAFARI_USER_AGENT_REGEXP.test(navigator.userAgent);
    const filterListUrl = `${window.location.href}${rulesUrl}`;
    return isSafariBrowser
        ? `abp:subscribe?location=${filterListUrl}&title=${filterTitle}`
        : `https://subscribe.adblockplus.org?location=${filterListUrl}`;
};

const SubscribeFilterBtn = ({ subscribeBtn, rulesUrl, filterTitle }) => (
    <a
        href={`${getSubscribeUrl(rulesUrl, filterTitle)}`}
        className={`btn subscribe ${subscribeBtn}`}
        title="Subscribe filter"
    >
        Subscribe
    </a>
);

export default SubscribeFilterBtn;

SubscribeFilterBtn.propTypes = {
    rulesUrl: PropTypes.string,
    subscribeBtn: PropTypes.string.isRequired,
    filterTitle: PropTypes.string,
};

SubscribeFilterBtn.defaultProps = {
    rulesUrl: '',
    filterTitle: '',
};
