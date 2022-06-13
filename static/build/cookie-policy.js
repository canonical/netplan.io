var cpNs=function(e){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}var c=[{id:"essential",showSwitcher:!1,content:{default:{title:"Essential",description:"Enables the site's core functionality, such as navigation, access to secure areas, video players and payments. The site cannot function properly without these cookies; they can only be disabled by changing your browser preferences."},zh:{title:"必要性",description:"启用网站核心功能，例如导航，访问安全区域，视频播放器和支付。没有这些cookie网站不能正常工作；它们仅可通过修改浏览器偏好设置禁用。"},ja:{title:"エッセンシャル",description:"移動、保護されている情報へのアクセス、動画再生、支払など、サイトの基本的な機能が有効になります。これらのクッキーが有効になっていない（お使いのブラウザの設定を変更することによってクッキーが無効化されている）場合、サイトは正しく表示されません。"}}},{id:"performance",showSwitcher:!0,content:{default:{title:"Performance",description:"Collects information on site usage, for example, which pages are most frequently visited."},zh:{title:"表现性",description:"网站使用信息收集，例如哪些网页被频繁访问。"},ja:{title:"パフォーマンス",description:"サイトの利用状況に関する情報を収集します。例として、どのページの訪問頻度が高いかのような情報です。"}}},{id:"functionality",showSwitcher:!0,content:{default:{title:"Functionality",description:"Recognises you when you return to our site. This enables us to personalise content, greet you by name, remember your preferences, and helps you share pages on social networks."},zh:{title:"功能性",description:"当你返回到我们网站时能识别您。这使得我们能个性化内容，欢迎您，记住您的偏好设置，以及帮助您分享网页到社交媒体。"},ja:{title:"機能性",description:"お客様がサイトを再訪問したときに、お客様であることを認識します。この設定では、お客様に合わせたコンテンツの表示、お客様のお名前を用いたあいさつメッセージの表示、お客様の傾向の記録を当社が行えるようになります。また、お客様がソーシャルネットワークでページをシェアできるようになります。"}}}],a={default:{notification:{title:"Your tracker settings",body1:"We use cookies and similar methods to recognise visitors and remember preferences. We also use them to measure campaign effectiveness and analyse site traffic.",body2:"By selecting ‘Accept‘, you consent to the use of these methods by us and trusted third parties.",body3:'For further details or to change your consent choices at any time see our <a href="https://ubuntu.com/legal/data-privacy?cp=hide#cookies">cookie policy</a>.',buttonAccept:"Accept all and visit site",buttonManage:"Manage your tracker settings"},manager:{title:"Tracking choices",body1:"We use cookies to recognise visitors and remember your preferences.",body2:"They enhance user experience, personalise content and ads, provide social media features, measure campaign effectiveness, and analyse site traffic.",body3:"Select the types of trackers you consent to, both by us, and third parties.",body4:'Learn more at <a href="https://ubuntu.com/legal/data-privacy?cp=hide#cookies">data privacy: cookie policy</a> - you can change your choices at any time from the footer of the site.',acceptAll:"Accept all",acceptAllHelp:'This will switch all toggles "ON".',SavePreferences:"Save preferences"}},zh:{notification:{title:"您的追踪器设置",body1:"我们使用cookie和相似的方法来识别访问者和记住偏好设置。我们也用它们来衡量活动的效果和网站流量分析。",body2:"选择”接受“，您同意我们和受信的第三方来使用这些方式。",body3:'更多内容或者随时地变更您的同意选择，请点击我们的 <a href="https://ubuntu.com/legal/data-privacy?cp=hide#cookies">cookie策略</a>.',buttonAccept:"接受全部和访问网站",buttonManage:"管理您的追踪器设置"},manager:{title:"追踪选项",body1:"我们使用cookie来识别访问者和记住您的偏好设置",body2:"它们增强用户体验，使内容和广告个性化，提供社交媒体功能，衡量活动效果和网站流量分析。",body3:"选择您同意授予我们和受信的第三方的追踪类型。",body4:'点击<a href="https://ubuntu.com/legal/data-privacy?cp=hide#cookies">数据隐私：cookie策略</a>了解更多，您可以在网站底部随时更改您的选择。',acceptAll:"接受全部",acceptAllHelp:"这将把全部开关变为”开启“。",SavePreferences:"保存偏好设置"}},ja:{notification:{title:"トラッキング機能の設定",body1:"当社は、当社のウェブサイトを訪問された方の識別や傾向の記録を行うために、クッキーおよび類似の手法を利用します。また、キャンペーンの効果の測定やサイトのトラフィックの分析にもクッキーを利用します。",body2:"「同意」を選択すると、当社および信頼できる第三者による上記の手法の利用に同意したものとみなされます。",body3:'詳細または同意の変更については、いつでも当社の<a href="https://ubuntu.com/legal/data-privacy?cp=hide#cookies">クッキーに関するポリシー</a>をご覧になることができます。',buttonAccept:"すべて同意してサイトにアクセス",buttonManage:"トラッキング機能の設定の管理"},manager:{title:"トラッキング機能の選択",body1:"当社は、当社のウェブサイトを訪問された方の識別や傾向の記録を行うために、クッキーを利用します。",body2:"クッキーは、お客様の利便性の向上、お客様に合わせたコンテンツや広告の表示、ソーシャルメディア機能の提供、キャンペーンの効果の測定、サイトのトラフィックの分析に役立ちます。",body3:"当社および第三者によるトラッキング機能のタイプから、お客様が同意されるものをお選びください。",body4:'詳細は、<a href="https://ubuntu.com/legal/data-privacy?cp=hide#cookies">データプライバシー：クッキーに関するポリシー</a>をご覧ください。お客様が選んだ設定は、本サイトの下部からいつでも変更できます。',acceptAll:"すべて同意",acceptAllHelp:"同意されるとすべての設定が「ON」に切り替わります。",SavePreferences:"設定を保存"}}},r=function(e){var t=new Date;t.setTime(t.getTime()+31536e6);var n="expires="+t.toUTCString();document.cookie="_cookies_accepted="+e+"; "+n+"; samesite=lax;path=/;",h(e)&&p()},s=function(){var e=function(){for(var e=document.cookie.split(";"),t="",n="",o=0;o<e.length;o++){for(var i=e[o];" "==i.charAt(0);)i=i.substring(1);n=i.substring("_cookies_accepted=".length,i.length),0===i.indexOf("_cookies_accepted=")&&"true"!==n&&(t=n)}return t}();return!e||"true"==e},l=function(){return"hide"===new URLSearchParams(window.location.search).get("cp")},d=function(e){return a[e]?a[e]:a.default},u=function(e,t){return e.content[t]?e.content[t]:e.content.default},p=function(){"object"===("undefined"==typeof dataLayer?"undefined":t(dataLayer))&&dataLayer.push({event:"pageview"})},h=function(e){return"all"==e||"performance"==e},f=function(){function e(t,o,i){n(this,e),this.container=t,this.renderManager=o,this.destroyComponent=i}return i(e,[{key:"getNotificationMarkup",value:function(e){var t=d(e);return'\n      <div class="p-modal" id="modal">\n        <div class="p-modal__dialog" role="dialog" aria-labelledby="cookie-policy-title" aria-describedby="cookie-policy-content">\n        <header class="p-modal__header">\n          <h2 class="p-modal__title" id="cookie-policy-title">'.concat(t.notification.title,'</h2>\n        </header>\n        <div id="cookie-policy-content">\n          <p>').concat(t.notification.body1,"</p>\n          <p>").concat(t.notification.body2,"</p>\n          <p>").concat(t.notification.body3,'</p>\n          <p class="u-no-margin--bottom">\n            <button class="p-button--positive js-close" id="cookie-policy-button-accept">').concat(t.notification.buttonAccept,'</button>\n            <button class="p-button--neutral u-no-margin--bottom js-manage">').concat(t.notification.buttonManage,"</button>\n          </p>\n        </div>\n      </div>")}},{key:"render",value:function(e){this.container.innerHTML=this.getNotificationMarkup(e),this.initaliseListeners()}},{key:"initaliseListeners",value:function(){var e=this;this.container.querySelector(".js-close").addEventListener("click",(function(t){r("all"),e.destroyComponent()})),this.container.querySelector(".js-manage").addEventListener("click",(function(t){e.renderManager()}))}}]),e}(),y=function(){function e(t,o,i){n(this,e),this.language=i,this.id=t.id,this.title=u(t,i).title,this.description=u(t,i).description,this.showSwitcher=t.showSwitcher,this.container=o,this.element,this.render()}return i(e,[{key:"render",value:function(){var e=document.createElement("div");e.classList.add("u-sv3"),e.innerHTML="\n      ".concat(this.showSwitcher?'<label class="u-float-right">\n        <input type="checkbox" class="p-switch js-'.concat(this.id,'-switch">\n        <div class="p-switch__slider"></div>\n      </label>'):"","\n      <h4>").concat(this.title,"</h4>\n      <p>").concat(this.description,"</p>"),this.container.appendChild(e),this.element=e.querySelector(".js-".concat(this.id,"-switch"))}},{key:"isChecked",value:function(){return!this.element||this.element.checked}},{key:"getId",value:function(){return this.id}}]),e}(),b=function(){function e(t,o){n(this,e),this.container=t,this.controlsStore=[],this.destroyComponent=o}return i(e,[{key:"getManagerMarkup",value:function(e){var t=d(e).manager;return'\n    <div class="p-modal" id="modal">\n    <div class="p-modal__dialog" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">\n      <header class="p-modal__header">\n        <h2 class="p-modal__title" id="modal-title">'.concat(t.title,'</h2>\n      </header>\n      <p id="modal-description">').concat(t.body1,"</p>\n      <p>").concat(t.body2,"</p>\n      <p>").concat(t.body3,"</p>\n      <p>").concat(t.body4,'</p>\n      <p><button class="p-button--positive u-no-margin--bottom js-close">').concat(t.acceptAll,"</button></p>\n      <p>").concat(t.acceptAllHelp,'</p>\n      <hr />\n      <div class="controls"></div>\n      <button class="p-button--neutral js-save-preferences">').concat(t.SavePreferences,"</button>\n    </div>\n  </div>")}},{key:"render",value:function(e){var t=this;this.container.innerHTML=this.getManagerMarkup(e);var n=this.container.querySelector(".controls");c.forEach((function(o){var i=new y(o,n,e);t.controlsStore.push(i)})),this.initaliseListeners()}},{key:"initaliseListeners",value:function(){var e=this;this.container.querySelector(".js-close").addEventListener("click",(function(){r("all"),e.destroyComponent()})),this.container.querySelector(".js-save-preferences").addEventListener("click",(function(){e.savePreferences(),e.destroyComponent()}))}},{key:"savePreferences",value:function(){var e=this.controlsStore.filter((function(e){return e.isChecked()}));this.controlsStore.length===e.length?r("all"):this.controlsStore.forEach((function(e){e.isChecked()&&r(e.getId())}))}}]),e}();return e.cookiePolicy=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=null,n=document.documentElement.lang,o=function(e){(e&&e.preventDefault(),null===t)&&((t=document.createElement("dialog")).classList.add("cookie-policy"),t.setAttribute("open",!0),document.body.appendChild(t),new f(t,i,c).render(n),document.getElementById("cookie-policy-button-accept").focus())},i=function(){new b(t,c).render(n)},c=function(){"function"==typeof e&&e(),document.body.removeChild(t),t=null},a=function(){var e=document.querySelector(".js-revoke-cookie-manager");e&&e.addEventListener("click",o),s()&&!l()&&o()};document.addEventListener("DOMContentLoaded",a,!1)},Object.defineProperty(e,"__esModule",{value:!0}),e}({});
//# sourceMappingURL=cookie-policy.js.map
