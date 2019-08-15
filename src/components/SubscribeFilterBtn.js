import React from 'react';
import PropTypes from 'prop-types';

const SubscribeFilterBtn = ({ rulesBtnState, rulesUrl }) => (
    <a
        href={`https://subscribe.adblockplus.org?location=${window.location.href}${rulesUrl}`}
        className={`btn subscribe ${rulesBtnState}`}
        title="Subscribe filter"
    >
        Subscribe
    </a>
);

export default SubscribeFilterBtn;

SubscribeFilterBtn.propTypes = {
    rulesUrl: PropTypes.string,
    rulesBtnState: PropTypes.string.isRequired,
};

SubscribeFilterBtn.defaultProps = {
    rulesUrl: '',
};
