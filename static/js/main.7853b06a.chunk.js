(this["webpackJsonpfilters-tests"]=this["webpackJsonpfilters-tests"]||[]).push([[0],{135:function(e,t,r){"use strict";r.r(t);var i=r(0),l=r.n(i),a=r(19),s=r.n(a),n=(r(40),r(41),r(33));var c=function(){var e="v".concat(n.version);return l.a.createElement("header",null,l.a.createElement("div",{className:"header-container"},l.a.createElement("div",null,l.a.createElement("div",{className:"logo-container"},l.a.createElement("div",{className:"adgLogo"}),l.a.createElement("div",null,l.a.createElement("h1",null,"ADGUARD"),l.a.createElement("h3",{title:e},"Automatic tests"))),l.a.createElement("div",{className:"mission"},"This small website is supposed to assist AdGuard QA department in testing different versions of AdGuard. The task of testing content blocking was always the most complicated, and this website aims to fix the situation, and make it as easy as possible.")),l.a.createElement("div",{className:"instruction"},l.a.createElement("h2",null,"Testing instruction:"),l.a.createElement("p",null,"It\u2018s important to disable all filter lists as they may mess with the tests results."),l.a.createElement("ul",null,l.a.createElement("li",null,"Disable all filter lists."),l.a.createElement("li",null,"Add the filter list corresponding to the test you\u2018re going to check."),l.a.createElement("li",null,"Enter the test page and refresh it."),l.a.createElement("li",null,"If any tests doesn\u2018t pass, clear your browser cache.")),l.a.createElement("p",null,"Expected result: all tests are marked as passed."))))},o=r(3),d=r(4),u=r(6),p=r(5),m=function(e){var t=e.link;return l.a.createElement("a",{href:t,className:"btn startTest",title:"Start test",target:"_blank",rel:"noopener noreferrer"},"Start test")},h=r(20),b=r.n(h),y=r(1),f=r.n(y),g=r(8),E=r(34),v=r.n(E),k=function(){var e=Object(g.a)(f.a.mark((function e(t){var r,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(window.location.href+t);case 2:return r=e.sent,e.next=5,r.text();case 5:return i=e.sent,e.abrupt("return",i);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(){var e;Object(o.a)(this,r);for(var i=arguments.length,l=new Array(i),a=0;a<i;a++)l[a]=arguments[a];return(e=t.call.apply(t,[this].concat(l))).state={readmeFile:""},e.getReadme=Object(g.a)(f.a.mark((function t(){var r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.props.readmeUrl,t.t0=e,t.next=4,k(r);case 4:t.t1=t.sent,t.t2={readmeFile:t.t1},t.t0.setState.call(t.t0,t.t2);case 7:case"end":return t.stop()}}),t)}))),e}return Object(d.a)(r,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getReadme();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.readmeFile;return l.a.createElement("div",null,l.a.createElement(v.a,{className:"readmeText",source:e}))}}]),r}(l.a.Component);F.defaultProps={readmeUrl:""};var O={content:{width:"100%",height:"100%",padding:"5vw",boxSizing:"border-box",borderRadius:"0",top:"0",bottom:"0",left:"0",right:"0",border:"unset",background:"#585965",color:"white"}};b.a.setAppElement(document.getElementById("root"));var S=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(){var e;Object(o.a)(this,r);for(var i=arguments.length,l=new Array(i),a=0;a<i;a++)l[a]=arguments[a];return(e=t.call.apply(t,[this].concat(l))).state={modalIsOpen:!1},e.openModal=function(){e.setState({modalIsOpen:!0})},e.closeModal=function(){e.setState({modalIsOpen:!1})},e}return Object(d.a)(r,[{key:"render",value:function(){var e=this.props,t=e.readmeBtn,r=e.readmeUrl,i=this.state.modalIsOpen;return l.a.createElement("span",null,l.a.createElement("button",{type:"button",name:"Show Readme file",onClick:this.openModal,rel:"noopener noreferrer",className:"btn readme ".concat(t),title:"README.md"},"Readme"),l.a.createElement(b.a,{isOpen:i,onRequestClose:this.closeModal,style:O,contentLabel:"README.md"},l.a.createElement("button",{onClick:this.closeModal,type:"button",className:"close-readme"}),l.a.createElement(F,{readmeUrl:r})))}}]),r}(l.a.Component);S.defaultProps={readmeUrl:""};var w=function(e,t){var r=document.createElement("textarea");document.body.appendChild(r),r.value=e,r.select(),document.execCommand("copy"),document.body.removeChild(r),alert(t)},C=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(){var e;Object(o.a)(this,r);for(var i=arguments.length,l=new Array(i),a=0;a<i;a++)l[a]=arguments[a];return(e=t.call.apply(t,[this].concat(l))).copyLink=function(){if(e.props.rulesUrl){var t=window.location.href+e.props.rulesUrl;w(t,'Link for the rules for test "'.concat(e.props.title,'" have been copied to your clipboard.'))}},e}return Object(d.a)(r,[{key:"render",value:function(){var e=this.props.copyLinkBtn;return l.a.createElement("button",{className:"btn copyLink ".concat(e),type:"button",name:"Copy link for rules file",onClick:this.copyLink},"Copy link")}}]),r}(l.a.Component);C.defaultProps={rulesUrl:""};var x=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(){var e;Object(o.a)(this,r);for(var i=arguments.length,l=new Array(i),a=0;a<i;a++)l[a]=arguments[a];return(e=t.call.apply(t,[this].concat(l))).state={rulesText:""},e.componentDidMount=Object(g.a)(f.a.mark((function t(){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k(e.props.rulesUrl);case 2:e.state.rulesText=t.sent;case 3:case"end":return t.stop()}}),t)}))),e.copyRules=Object(g.a)(f.a.mark((function t(){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w(e.state.rulesText,'The rules for the test "'.concat(e.props.title,'" have been copied to your clipboard.'));case 2:case"end":return t.stop()}}),t)}))),e}return Object(d.a)(r,[{key:"render",value:function(){var e=this.props.copyRulesBtn;return l.a.createElement("button",{className:"btn copyRules ".concat(e),type:"button",name:"Copy rules list",onClick:this.copyRules},"Copy rules")}}]),r}(l.a.Component);x.defaultProps={rulesUrl:""};var U=function(e){var t=e.subscribeBtn,r=e.rulesUrl;return l.a.createElement("a",{href:"https://subscribe.adblockplus.org?location=".concat(window.location.href).concat(r),className:"btn subscribe ".concat(t),title:"Subscribe filter"},"Subscribe")},A=U;U.defaultProps={rulesUrl:""};var j=function(e){var t=e.title,r=e.link,i=e.rulesUrl,a=e.compatibility,s=e.incompatibility,n=e.readmeUrl,c=function(){return i?"enabled":"disabled"};return l.a.createElement("div",{className:"testItem-container"},l.a.createElement("div",{className:"test-info"},l.a.createElement("a",{href:r,target:"_blank",rel:"noopener noreferrer",className:"test-title"},t),l.a.createElement("div",{className:"compatibility"},a),l.a.createElement("div",{className:"incompatibility"},s)),l.a.createElement("div",{className:"test-actions"},l.a.createElement(m,{link:r}),l.a.createElement(S,{readmeBtn:n?"enabled":"disabled",readmeUrl:n}),l.a.createElement(C,{copyLinkBtn:c(),rulesUrl:i,title:t}),l.a.createElement(x,{copyRulesBtn:c(),rulesUrl:i,title:t}),l.a.createElement(A,{subscribeBtn:c(),rulesUrl:i})),l.a.createElement("div",{className:"spacer"}))},M=j;j.defaultProps={rulesUrl:"",readmeUrl:"",compatibility:"",incompatibility:""};var B=[{id:1,title:"Simple rules",link:"Filters/simple-rules/test-simple-rules.html",rulesUrl:"Filters/simple-rules/test-simple-rules.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:2,title:"Generic hide rules",link:"Filters/simple-rules/generichide-test/generichide-test.html",rulesUrl:"Filters/simple-rules/generichide-test/generichide-test.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari (Case 1), iOS, Content Blocker",incompatibility:"Safari (Case 2)"},{id:3,title:"Extended Css rules",link:"Filters/extended-css-rules/test-extended-css-rules.html",rulesUrl:"Filters/extended-css-rules/test-extended-css-rules.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari",incompatibility:"iOS, Content Blocker"},{id:4,title:"Extended CSS rules injection into iframe created with js",link:"Filters/extended-css-rules/extended-css-iframejs-injection/extended-css-iframejs-injection.html",rulesUrl:"Filters/extended-css-rules/extended-css-iframejs-injection/extended-css-iframejs-injection.txt",compatibility:"Chrome, Edge, FF, Opera, Edge Legacy, Safari",incompatibility:"Windows, MacOS, Android, iOS, Content Blocker"},{id:5,title:"$important rules",link:"Filters/important-rules/test-important-rules.html",rulesUrl:"Filters/important-rules/test-important-rules.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari, iOS, Content Blocker",readmeUrl:"Filters/important-rules/README.md"},{id:6,title:"$important rule vs $urlblock exception",link:"Filters/important-rules/important-vs-urlblock/test-important-vs-urlblock.html",rulesUrl:"Filters/important-rules/important-vs-urlblock/test-important-vs-urlblock.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, iOS, Content Blocker",incompatibility:"Safari",readmeUrl:"Filters/important-rules/important-vs-urlblock/README.md"},{id:7,title:"$replace rules",link:"Filters/replace-rules/test-replace-rules.html",rulesUrl:"Filters/replace-rules/test-replace-rules.txt",compatibility:"Windows, MacOS, Android, FF",incompatibility:"Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker",readmeUrl:"Filters/replace-rules/README.md"},{id:8,title:"$replace rule vs $generichide exception",link:"Filters/replace-rules/replace-vs-generichide-rule/replace-vs-generichide-rule.html",rulesUrl:"Filters/replace-rules/replace-vs-generichide-rule/replace-vs-generichide-rule.txt",compatibility:"Windows, MacOS, Android, FF",incompatibility:"Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:9,title:"$replace rule vs $content exception",link:"Filters/replace-rules/replace-vs-content-rule/replace-vs-content-rule.html",rulesUrl:"Filters/replace-rules/replace-vs-content-rule/replace-vs-content-rule.txt",compatibility:"Windows, MacOS, Android, FF",incompatibility:"Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:10,title:"$replace rule vs $elemhide exception",link:"Filters/replace-rules/replace-vs-elemhide-rule/replace-vs-elemhide-rule.html",rulesUrl:"Filters/replace-rules/replace-vs-elemhide-rule/replace-vs-elemhide-rule.txt",compatibility:"Windows, MacOS, Android, FF",incompatibility:"Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:11,title:"$csp rules",link:"Filters/csp-rules/test-csp-rules.html",rulesUrl:"Filters/csp-rules/test-csp-rules.txt",compatibility:"Windows, MacOS, Android, FF, Chrome, Edge, Opera",incompatibility:"Edge Legacy, Safari, iOS, Content Blocker",readmeUrl:"Filters/csp-rules/README.md"},{id:12,title:"$csp exception test",link:"Filters/csp-rules/csp-global-exception/csp-global-exception.html",rulesUrl:"Filters/csp-rules/csp-global-exception/csp-global-exception.txt",compatibility:"Windows, MacOS, Android, FF, Chrome, Edge, Opera",incompatibility:"Edge Legacy, Safari, iOS, Content Blocker",readmeUrl:"Filters/csp-rules/csp-global-exception/README.md"},{id:13,title:"Websocket blocking",link:"Filters/websockets/test-websockets.html",rulesUrl:"Filters/websockets/test-websockets.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy",incompatibility:"Safari, iOS, Content Blocker"},{id:14,title:"Content rules",link:"Filters/content-rules/test-content-rules.html",rulesUrl:"Filters/content-rules/test-content-rules.txt",compatibility:"Windows, MacOS, Android, FF",incompatibility:"Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:15,title:"$content modifier tests",link:"Filters/content-rules/content-modifier-test/content-modifier-test.html",rulesUrl:"Filters/content-rules/content-modifier-test/content-modifier-test.txt",compatibility:"Windows, MacOS, Android, FF",incompatibility:"Chrome, Edge, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:16,title:"Script rules",link:"Filters/script-rules/test-script-rules.html",rulesUrl:"Filters/script-rules/test-script-rules.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari",incompatibility:"iOS, Content Blocker"},{id:17,title:"Scriptlet rules",link:"Filters/scriptlet-rules/test-scriptlet-rules.html",rulesUrl:"Filters/scriptlet-rules/test-scriptlet-rules.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, Opera, FF, Safari",incompatibility:"Edge Legacy, iOS, Content Blocker"},{id:18,title:"Userscripts",link:"Userscripts/test-userscripts.html",rulesUrl:"Userscripts/apiTester/api-tester.user.js",compatibility:"Windows, MacOS, Android",incompatibility:"Chrome, Edge, Opera, Edge Legacy, FF, Safari, iOS, Content Blocker"},{id:19,title:"Userscripts: GM API v4 tests",link:"Userscripts/gmapi-v4-tests.html",rulesUrl:"Userscripts/GMapiV4Tester/GMapi_v4-tester.user.js",compatibility:"Windows, MacOS, Android",incompatibility:"Chrome, Edge, Opera, Edge Legacy, FF, Safari, iOS, Content Blocker"},{id:20,title:"Popup blocker",link:"PopupBlocker/test-popup-blocker.html",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari",incompatibility:"iOS, Content Blocker"},{id:21,title:"Popup blocker event recovery",link:"PopupBlocker/test-event-recovery.html",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari",incompatibility:"iOS, Content Blocker"},{id:22,title:"$badfilter rules",link:"Filters/badfilter-rules/test-badfilter-rules.html",rulesUrl:"Filters/badfilter-rules/test-badfilter-rules.txt",compatibility:"Chrome, Edge, FF, Edge Legacy, Safari, Opera, iOS",incompatibility:"Windows, MacOS, Android, Content Blocker",readmeUrl:"Filters/badfilter-rules/README.md"},{id:23,title:"$network rules",link:"Filters/network-rules/test-network-rules.html",rulesUrl:"Filters/network-rules/test-network-rules.txt",compatibility:"Windows, MacOS, Android",incompatibility:"Chrome, Edge, FF, Edge Legacy, Safari, Opera, iOS, Content Blocker",readmeUrl:"Filters/network-rules/README.md"},{id:24,title:"$redirect rules",link:"Filters/redirect-rules/test-redirect-rules.html",rulesUrl:"Filters/redirect-rules/test-redirect-rules.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera",incompatibility:"Edge Legacy,  Safari, iOS, Content Blocker",readmeUrl:"Filters/redirect-rules/README.md"},{id:25,title:"$redirect resources security test",link:"Filters/redirect-security/test-redirect-security.html",rulesUrl:"Filters/redirect-security/test-redirect-security.txt",compatibility:"Chrome, Edge, FF, Opera",incompatibility:"Windows, MacOS, Android, Edge Legacy, Safari, iOS, Content Blocker",readmeUrl:"Filters/redirect-security/README.md"},{id:26,title:"$jsinject rules test",link:"Filters/script-rules/jsinject-rules/test-jsinject-rules.html",rulesUrl:"Filters/script-rules/jsinject-rules/test-jsinject-rules.txt",compatibility:"Windows, MacOS, Android, Chrome, Edge, FF, Opera, Edge Legacy, Safari",incompatibility:"iOS, Content Blocker"},{id:27,title:"$removeparam rules",link:"Filters/removeparam-rules/test-removeparam-rules.html",rulesUrl:"Filters/removeparam-rules/test-removeparam-rules.txt",compatibility:"Windows, MacOS, Android",incompatibility:"Chrome, Edge, FF, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:28,title:"$specifichide rules",link:"Filters/specifichide-rules/test-specifichide-rules.html",rulesUrl:"Filters/specifichide-rules/test-specifichide-rules.txt",compatibility:"Windows, MacOS, Android",incompatibility:"Chrome, Edge, FF, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:29,title:"$denyallow rules",link:"Filters/denyallow-rules/test-denyallow-rules.html",rulesUrl:"Filters/denyallow-rules/test-denyallow-rules.txt",compatibility:"Windows, MacOS, Android",incompatibility:"Chrome, Edge, FF, Opera, Edge Legacy, Safari, iOS, Content Blocker"},{id:30,title:"$removeheader rules",link:"Filters/removeheader-rules/test-removeheader-rules.html",rulesUrl:"Filters/removeheader-rules/test-removeheader-rules.txt",compatibility:"Windows, MacOS, Android",incompatibility:"Chrome, Edge, FF, Opera, Edge Legacy, Safari, iOS, Content Blocker"}],L=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(){var e;Object(o.a)(this,r);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={},e.onSearch=function(t){var r=t.target.value.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),i=new RegExp(r.toLowerCase());e.setState({searchTerm:i})},e.renderTestsData=function(e){return e.map((function(e){return l.a.createElement(M,Object.assign({key:e.id},e))}))},e.filterTests=function(t,r){if(!r)return e.renderTestsData(t);var i=t.filter((function(e){var t=e.title.toLowerCase();return r.test(t)}));return i.length>0?e.renderTestsData(i):"There is no test matching this name."},e}return Object(d.a)(r,[{key:"render",value:function(){var e=this.state.searchTerm;return l.a.createElement("div",{className:"testList-container"},l.a.createElement("form",null,l.a.createElement("input",{type:"text",className:"search-form",placeholder:"Search for the test",onChange:this.onSearch,autoFocus:!0})),this.filterTests(B,e))}}]),r}(l.a.Component);var W=function(){var e=(new Date).getFullYear().toString();return l.a.createElement("footer",null,l.a.createElement("div",{className:"footer-logo"},l.a.createElement("div",{className:"copyrights"},"\xa9 AdGuard, 2009\u2013",e)))};var N=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(c,null),l.a.createElement(L,null),l.a.createElement(W,null))},$=console;$.log,$.error,Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},33:function(e){e.exports=JSON.parse('{"name":"filters-tests","version":"0.1.4","private":true,"dependencies":{"node-sass":"^4.12.0","prop-types":"^15.7.2","react":"^16.8.6","react-dom":"^16.8.6","react-markdown":"^4.1.0","react-modal":"^3.9.1","react-scripts":"3.4.1"},"scripts":{"start":"react-scripts start","watch":"HOST=local.testcases.adguard.com react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","lint":"eslint ./public ./src","stylelint":"stylelint ./src/styles/*.scss"},"husky":{"hooks":{"pre-push":"yarn stylelint && yarn lint && CI=true react-scripts test"}},"eslintConfig":{"extends":"react-app"},"stylelint":{"extends":"stylelint-config-recommended-scss"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"eslint":"^6.6.0","eslint-config-airbnb":"^17.1.1","eslint-plugin-import":"^2.18.2","eslint-plugin-jsx-a11y":"^6.2.3","eslint-plugin-react":"^7.14.3","husky":"^3.0.3","stylelint":"^10.1.0","stylelint-config-recommended-scss":"^3.3.0","stylelint-scss":"^3.9.3"}}')},35:function(e,t,r){e.exports=r(135)},40:function(e,t,r){},41:function(e,t,r){}},[[35,1,2]]]);
//# sourceMappingURL=main.7853b06a.chunk.js.map