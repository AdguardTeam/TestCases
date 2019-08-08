(function() {


var onclickOpen = {
    name: "OnClick Open",
    install: function() {
        document.addEventListener('click', this);
    },
    uninstall: function() {
        document.removeEventListener('click', this);
    },
    handleEvent: function() {
        open('http://evilsite.com/', '_blank');
    }
};

var onclickDispatchEventOnAnchor = {
    name: "Artificial Click on Anchor 1",
    install: function() {
        document.addEventListener('click', this);
    },
    uninstall: function() {
        document.removeEventListener('click', this);
    },
    handleEvent: function() {
        var anchor = document.createElement('a');
        anchor.href = 'http://evilsite.com/';
        anchor.target = '_blank';
        document.body.appendChild(anchor);
        
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', false, true, window, 0, 0, 0, 0, 0, true, false, false, !0, 0, null);

        anchor.dispatchEvent(evt);
        anchor.parentNode.removeChild(anchor);
    }
};

var onclickClickOnAnchor = {
    name: "Artificial click on Anchor 2",
    install: function() {
        document.addEventListener('click', this);
    },
    uninstall: function() {
        document.removeEventListener('click', this);
    },
    handleEvent: function() {
        var anchor = document.createElement('a');
        anchor.href = 'http://evilsite.com/';
        anchor.target = '_blank';
        
        this.uninstall();
        anchor.click();
        this.install();

        //anchor.parentNode.removeChild(anchor);
    }
};

var getOpenRefFromFreshIframe = {
    name: "Using Temporary Frame 1",
    install: function() {
        document.addEventListener('click', this);
    },
    uninstall: function() {
        document.removeEventListener('click', this);
    },
    handleEvent: function(evt) {
        document.body.insertAdjacentHTML('beforeend', '<iframe id="a-fresh-frame"></iframe>');
        var freshFrame = document.getElementById('a-fresh-frame');

        var freshClick = freshFrame.contentWindow.HTMLElement.prototype.click;

        var anchor = document.createElement('a');
        anchor.href = 'http://evilsite.com/';
        anchor.target = '_blank';
        freshFrame.contentDocument.body.appendChild(anchor);

        freshClick.call(anchor);

        freshFrame.parentNode && freshFrame.parentNode.removeChild(freshFrame);
    }
};

var executeInFreshIframeViaDocumentWrite = {
    name: "Using Temporary Frame 2",
    install: function() {
        document.addEventListener('click', this);
    },
    uninstall: function() {
        document.removeEventListener('click', this);
    },
    handleEvent: function(evt) {
        document.body.insertAdjacentHTML('beforeend', '<iframe id="a-fresh-frame"></iframe>');
        var freshFrame = document.getElementById('a-fresh-frame');
        var freshFrameDoc = freshFrame.contentDocument;
        freshFrameDoc.write('<script>open("http://evilsite.com/","_blank");</script>');
        freshFrameDoc.close();
        freshFrame.parentNode && freshFrame.parentNode.removeChild(freshFrame);
    } 
};

var overlayPopup = {
    name: "Overlay Popup",
    install: function() {
        this._createOverlay();
        this._overlay.onclick = function(evt) {
            open('http://evilsite.com/', '_blank');
        }
    },
    uninstall: function() {
        this._removeOverlay();
    },
    _overlay: null,
    _overlayStyle: [
        'position', 'fixed',
        'z-index',  '2147483647',
        'left',     '0',
        'top',      '0',
        'width',    '100%',
        'height',   '100%'
    ],
    _createOverlay: function() {
        if (this._overlay) { return; }
        var overlay = this._overlay = document.createElement('div');
        overlay.style.cssText = concatStyle(this._overlayStyle, true);
        document.body.appendChild(overlay);
    },
    _removeOverlay: function() {
        if (this._overlay && this._overlay.parentNode) {
            this._overlay.parentNode.removeChild(this._overlay);
        }
    }
};

/**
 * This tests whether a visual nuisance from chrome pdf plugin is cleared via the popup blocker.
 * Even if certain popup blockers successfully block popup, it may not remove a dialog saying 
 * >  Chrome PDF Viewer
 * >  Focusing, please wait....
 */
var chromePDFPopunder = {
    name: "Chrome PDF Popunder",
    install: function() {
        document.addEventListener('click', this);
    },
    uninstall: function() {
        document.removeEventListener('click', this);
    },
    _objectContainerStyle: [
        'visibility',     'hidden',
        'width',          '0px',
        'height',         '0px',
        'opacity',        '0',
        'position',       'absolute',
        'top',            '100%',
        'left',           '0',
        'pointer-events', 'none',
        'overflow',       'hidden'
    ],

    _blankPDF: 'data:application/pdf;base64, JVBERi0xLj',
    _showPDF: 'data:application/pdf;base64,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8JXNlw4XLN8J4Z8IoqYkUULQzi6nKz1vSLYkMJ97DvKA9GR+t3Q83GU1+I7Ab2Br6rPoCAD/BMgarnhL7WaBuN/0qf7acq/dU0raEprcK2TZIdla/fChLrOBFuc6jp0MBrknewEe73KH2+rYiwBPTJanbC6vYHzWN2fBQlE5in+nFlYQ9qnVTtMW190pyWrlM5VDFEpnSueI+ygA+jaTvpHcBM3AiHaAD5mPikqHQdPYJojBgB3fj9yzdGdyRBvV5YwH4UozSXtQXAasc+B6z5hHuROJHKGr5fQ9q+J+c8IiSbkBauupbtXTt5RDBVKdK7lxraBGVsfeekEX56Q/Xo8nvW/anAh0Zmki7TrdMylcyHsHwKSbogMxX7r/txtC63+gdAMbhZT2fu24HATEgUoN0DcaHCa1kzPjP4xZ3ktGI2Agy+szsSvbfwtmYn6EkfE0PQoD6FnH48is91eoDxayE8hJ/QrO/S4J7Meoqa122eEc44YiZI4Ym/ev8f+ARcDGylS6wqSkdVoiw1lyfJsNCmVuZHN0cmVhbQ1lbmRvYmoNNCAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgNS9MZW5ndGggODAvTiAxL1R5cGUvT2JqU3RtPj5zdHJlYW0NCoZByo5qIKTWkT0EsOrwTNaetewmRJyWO3WrqIJ6JkhapOIkOBXm6Kty1h1c0lkwtdUIuOP2IGwjcbmLOADc/lGUQDnAECeKk+ka8CInWOegDQplbmRzdHJlYW0NZW5kb2JqDTUgMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0ZpcnN0IDUvTGVuZ3RoIDE0NC9OIDEvVHlwZS9PYmpTdG0+PnN0cmVhbQ0K1wo+Snf8AlgtuOQBso4dq7qTBagU6Bcv2WCA3Bl1DJr7pSqmZ8tLmkruLIjVWgxvVgTmDP5BxV2741g5WfMw6Ooo82x1GyOpUks28fcb7ZvIDnUIy5q5nj5KtTYeHpzo6OMvfN2gMU/oHl6WWcl0XfExgmkozEnKTYtBZZWlNHXndkqJwN5JC3iw3JhZ4rJ3DQplbmRzdHJlYW0NZW5kb2JqDTYgMCBvYmoNPDwvRGVjb2RlUGFybXM8PC9Db2x1bW5zIDQvUHJlZGljdG9yIDEyPj4vRW5jcnlwdCAxNiAwIFIvRmlsdGVyL0ZsYXRlRGVjb2RlL0lEWzwxOEY1NTNGQ0I5ODZEQjQxOEYzMTFDQUEyMUU4NjhDNz48QUQ2Nzk1QzREQjMyRDk0N0FGQ0U5MzEyNzhGRTM4MjU+XS9JbmZvIDE0IDAgUi9MZW5ndGggNTQvUm9vdCAxNyAwIFIvU2l6ZSAxNS9UeXBlL1hSZWYvV1sxIDIgMV0+PnN0cmVhbQ0KaN5iYgACJka5+QxMDIzvgAQziOC9C+KuARIMb4GyFwRALAZGGMH4D4XLBOIyMgAEGABZSQgmDQplbmRzdHJlYW0NZW5kb2JqDXN0YXJ0eHJlZg0KMTE2DQolJUVPRg0K',

    _smallWindowConfig: 'toolbar=no,scrollbars=yes,location=no,statusbar=yes,menubar=no,resizable=1,width=20,height=20,screenX=0,screenY=0,top=10000',
    
    handleEvent: function(event) {
        var objectContainer = document.createElement('div');
        objectContainer.setAttribute('style', concatStyle(this._objectContainerStyle, true));
        
        var object = document.createElement('object');
        object.setAttribute('data', this._showPDF);

        function onFocus() {
            object.setAttribute('data', this._blankPDF);
            if (objectContainer.parentNode) {
                objectContainer.parentNode.removeChild(objectContainer);
            }
            window.removeEventListener('focus', onFocus);

            popunder.moveTo(0, 0);
            popunder.resizeTo(500, 500);
            popunder.location = 'http://evilsite.com/';
        }

        var popunder = open('about:blank', '_blank', this._smallWindowConfig);
        popunder.document.write('<html><head><script>window.resizeTo(1,0);window.moveTo(19999,19999); window.open(\'\', \'_self\');</script></head><body></body></html>');

        window.addEventListener('focus', onFocus);

        objectContainer.appendChild(object);
        document.body.appendChild(objectContainer);

        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
    }
}

// Copied from popup blocker
function concatStyle(style, important) {
    let cssText = '';
    for (let i = 0, l = style.length; i < l; i++) {
        cssText += style[i] + ':' + style[++i];
        if (important) { cssText += '!important' }
        cssText += ';';
    }
    return cssText;
}

window.popupInstallers = [
    onclickOpen,
    onclickDispatchEventOnAnchor,
    onclickClickOnAnchor,
    getOpenRefFromFreshIframe,
    executeInFreshIframeViaDocumentWrite,
    overlayPopup,
    chromePDFPopunder
];


})();
