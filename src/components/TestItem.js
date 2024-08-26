import React from 'react';

import PropTypes from 'prop-types';
import Compatibility from './Compatibility';
import StartTestBtn from './StartTestBtn';
import ReadmeBtn from './ReadmeBtn';
import CopyLinkBtn from './CopyLinkBtn';
import CopyRulesBtn from './CopyRulesBtn';
import SubscribeFilterBtn from './SubscribeFilterBtn';
import { USERSCRIPTS_TEST_IDS } from '../constants';

const EXCEPTIONS_QUERY_KEY = 'exceptions';

function TestItem({
    id,
    title,
    link,
    rulesUrl,
    compatibility,
    readmeUrl,
    exceptions,
}) {
    const rulesBtn = () => (rulesUrl ? 'enabled' : 'disabled');

    const readmeBtn = () => (readmeUrl ? 'enabled' : 'disabled');

    let testPageUrl = link;

    // if some specific product is selected,
    // add its exception as query string to skip some tests,
    if (exceptions.length > 0) {
        let newExceptions = exceptions.join(',');
        const url = new URL(link, window.location.origin);
        const currentQueryStrExceptions = url.searchParams.get(EXCEPTIONS_QUERY_KEY);
        // check whether the link already contains a query string with exceptions
        if (currentQueryStrExceptions) {
            newExceptions = `${currentQueryStrExceptions},${newExceptions}`;
        }
        url.searchParams.set(EXCEPTIONS_QUERY_KEY, newExceptions);
        // due to consistency with the link
        // combine pathname and search part of the url
        // instead of using url.href
        testPageUrl = `${url.pathname}${url.search}`;
    }

    const isUserscriptTest = USERSCRIPTS_TEST_IDS.includes(id);

    return (
        <div className="testItem-container">
            <div className="test-info">
                <a
                    href={testPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="test-title"
                >
                    {title}
                </a>
                <Compatibility compatibility={compatibility} />
            </div>
            <div className="test-actions">

                <StartTestBtn link={testPageUrl} />

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
                    filterTitle={title}
                    isUserscriptTest={isUserscriptTest}
                />

            </div>
            <div className="spacer" />
        </div>
    );
}

export default TestItem;

TestItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    rulesUrl: PropTypes.string,
    readmeUrl: PropTypes.string,
    compatibility: PropTypes.shape({}).isRequired,
    exceptions: PropTypes.arrayOf(PropTypes.number),
};

TestItem.defaultProps = {
    rulesUrl: '',
    readmeUrl: '',
    exceptions: [],
};
