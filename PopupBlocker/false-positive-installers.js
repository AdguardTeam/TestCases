(function() {

var jQueryDelegated = {
    name: "Using JQuery",
    install: function() {
        $(document).on('click', '.delegated-target', this.handleEvent);
        
        var delegatedTarget = this._delegatedTarget = document.createElement('button');
        delegatedTarget.className = 'delegated-target';
        delegatedTarget.textContent = "Clicking on this should open a new tab/window.";
        document.body.appendChild(delegatedTarget);
    },
    uninstall: function() {
        $(document).off('click', '.delgated-target', this.handleEvent);
        var delegatedTarget = this._delegatedTarget;
        delegatedTarget && delegatedTarget.parentNode && delegatedTarget.parentNode.removeChild(delegatedTarget);
        this._delegatedTarget = null;
    },
    handleEvent: function(jqEvt) {
        window.open('http://evilsite.com', '_blank');
    },
    _delegatedTarget: null
};


var dispatchOnSameTarget = {
    name: "Artificial Click On The Same Target",
    install: function() {
        document.addEventListener('mousedown', this);

        var target = this._target = document.createElement('a');
        target.href = "http://evilsite.com";
        target.target = "_blank";
        target.textContent = "Clicking on this link should open a new tab/window.";
        document.body.appendChild(target);
    },
    uninstall: function() {
        document.removeEventListener('mousedown', this);
        var target = this._target;
        target && target.parentNode && target.parentNode.removeChild(target);
        this._target = null;
    },
    handleEvent: function(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();

        var customClick = document.createEvent('MouseEvents');
        customClick.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        evt.target.dispatchEvent(customClick);
    },
    _target: null
};

var popupOnRealFrame = {
    name: "Popup Opened From Real Frame",
    install: function() {
        var target = this._target = document.createElement('button');
        target.textContent = "Clicking on this button should open a new tab/window.";
        target.addEventListener('click', this);
        document.body.appendChild(target);
    },
    uninstall: function() {
        var target = this._target;
        if (target && target.parentNode) {
            target.parentNode.removeChild(target);
        }
        this._target = null;
        this._removeFrame();
    },
    _target: null,
    _frame: null,
    _removeFrame: function() {
        var frame = this._frame;
        if (frame && frame.parentNode) {
            frame.parentNode.removeChild(frame);
        }
        this._frame = null;
    },
    handleEvent: function(evt) {
        this._removeFrame();
        document.body.innerHTML += "<iframe id='popup-opener-iframe' src='popup-opener-iframe.html' style='display:none;'></iframe>";
        this._frame = document.getElementById('popup-opener-iframe');
    }
};


window.falsePositiveInstallers = [
    jQueryDelegated,
    dispatchOnSameTarget,
    popupOnRealFrame
];

})();