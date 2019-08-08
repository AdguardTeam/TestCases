import React from 'react'

import CopyLink from './copyLink'
import CopyRules from './copyRules'
import SubscribeFilter from './subscribeFilter'

export default class TestItem extends React.Component {

    render() {
        return (
            <div className="testItem-container">
                <div className = "test-info">
                    <a href = {this.props.link}
                       className = "test-title">
                       {this.props.title}
                    </a>
                    <div className="compatibility">{this.props.compatibility}</div>
                    <div className="incompatibility">{this.props.incompatibility}</div>
                </div>
                <div className="test-actions">
                    <CopyLink {...this.props} />
                    <CopyRules {...this.props} />
                    <SubscribeFilter {...this.props} />
                </div>
                <div className="spacer"></div>
            </div>
        )
    }
}