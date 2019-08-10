import React from 'react';

import Readme from './Readme';
import CopyLink from './copyLink';
import CopyRules from './copyRules';
import SubscribeFilter from './subscribeFilter';

export default class TestItem extends React.Component {
    constructor() {
        super();
        this.state = {
            rulesBtnState: '',
            readmeBtnState: '',
        };
    }

    componentWillMount() {
        const {
            rules, readmeUrl,
        } = this.props;
        this.setState({ rulesBtnState: rules ? 'enabled' : 'disabled' });
        this.setState({ readmeBtnState: readmeUrl ? 'enabled' : 'disabled' });
    }

    render() {
        const {
            link, title, compatibility, incompatibility,
        } = this.props;
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
                        {...this.state}
                        {...this.props}
                    />
                    <CopyLink
                        {...this.state}
                        {...this.props}
                    />
                    <CopyRules
                        {...this.state}
                        {...this.props}
                    />
                    <SubscribeFilter
                        {...this.state}
                        {...this.props}
                    />
                </div>
                <div className="spacer" />
            </div>
        );
    }
}
