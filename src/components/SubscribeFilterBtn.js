import React from 'react';
import PropTypes from 'prop-types';

/**
 * Returns a subscribe URL for a filter list or a userscript.
 *
 * @param {string} rulesUrl Url for the content file.
 * @param {string} filterTitle Title of the filter list.
 * @param {boolean} isUserscriptTest Whether the test is for a userscript.
 *
 * @returns {string} Subscribe URL.
 */
const getSubscribeUrl = (rulesUrl, filterTitle, isUserscriptTest) => {
    const absoluteUrl = `${window.location.href}${rulesUrl}`;

    if (isUserscriptTest) {
        return `adguard:userscript?location=${absoluteUrl}`;
    }

    const SAFARI_USER_AGENT_REGEXP = /\sVersion\/(\d{2}\.\d)(.+\s|\s)(Safari)\//;
    const isSafariBrowser = SAFARI_USER_AGENT_REGEXP.test(navigator.userAgent);
    return isSafariBrowser
        ? `abp:subscribe?location=${absoluteUrl}&title=${filterTitle}`
        : `https://subscribe.adblockplus.org?location=${absoluteUrl}`;
};

const SubscribeFilterBtn = ({
    subscribeBtn,
    rulesUrl,
    filterTitle,
    isUserscriptTest,
}) => {
    const subscribeUrl = getSubscribeUrl(rulesUrl, filterTitle, isUserscriptTest);
    return (
        <a
            href={subscribeUrl}
            className={`btn subscribe ${subscribeBtn}`}
            title="Subscribe"
        >
            Subscribe
        </a>
    );
};

export default SubscribeFilterBtn;

SubscribeFilterBtn.propTypes = {
    rulesUrl: PropTypes.string,
    subscribeBtn: PropTypes.string.isRequired,
    filterTitle: PropTypes.string,
    isUserscriptTest: PropTypes.bool.isRequired,
};

SubscribeFilterBtn.defaultProps = {
    rulesUrl: '',
    filterTitle: '',
};
