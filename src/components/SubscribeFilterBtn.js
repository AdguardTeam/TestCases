import React from 'react';
import PropTypes from 'prop-types';

const SubscribeFilterBtn = ({ subscribeBtn, rulesUrl }) => (
    <a
        href={`https://subscribe.adblockplus.org?location=${window.location.href}${rulesUrl}`}
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
};

SubscribeFilterBtn.defaultProps = {
    rulesUrl: '',
};
