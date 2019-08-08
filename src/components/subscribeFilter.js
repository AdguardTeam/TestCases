import React from 'react'

const SubscribeFilter = ({rules}) => (
                <a href={"https://subscribe.adblockplus.org?location=" + window.location.href + rules}
                    className = {(rules === "" ? "disabled " : "") + "btn subscribe"}
                    title = "Subscribe filter">
                    Subscribe
                </a>
)

export default SubscribeFilter