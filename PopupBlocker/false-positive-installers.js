/* global $ */

/* eslint-disable-next-line func-names */
(function () {
    const jQueryDelegated = {
        name: 'Using JQuery',
        install() {
            $(document).on('click', '.delegated-target', this.handleEvent);

            /* eslint-disable-next-line no-multi-assign */
            const delegatedTarget = this._delegatedTarget = document.createElement('button');
            delegatedTarget.className = 'delegated-target';
            delegatedTarget.textContent = 'Clicking on this should open a new tab/window.';
            document.body.appendChild(delegatedTarget);
        },
        uninstall() {
            $(document).off('click', '.delgated-target', this.handleEvent);
            const delegatedTarget = this._delegatedTarget;
            /* eslint-disable-next-line no-unused-expressions */
            delegatedTarget && delegatedTarget.parentNode
                && delegatedTarget.parentNode.removeChild(delegatedTarget);
            this._delegatedTarget = null;
        },
        handleEvent() {
            window.open('http://evilsite.com', '_blank');
        },
        _delegatedTarget: null,
    };


    const dispatchOnSameTarget = {
        name: 'Artificial Click On The Same Target',
        install() {
            document.addEventListener('mousedown', this);

            /* eslint-disable-next-line no-multi-assign */
            const target = this._target = document.createElement('a');
            target.href = 'http://evilsite.com';
            target.target = '_blank';
            target.textContent = 'Clicking on this link should open a new tab/window.';
            document.body.appendChild(target);
        },
        uninstall() {
            document.removeEventListener('mousedown', this);
            const target = this._target;
            /* eslint-disable-next-line no-unused-expressions */
            target && target.parentNode && target.parentNode.removeChild(target);
            this._target = null;
        },
        handleEvent(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            const customClick = document.createEvent('MouseEvents');
            customClick.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

            evt.target.dispatchEvent(customClick);
        },
        _target: null,
    };

    const popupOnRealFrame = {
        name: 'Popup Opened From Real Frame',
        install() {
            /* eslint-disable-next-line no-multi-assign */
            const target = this._target = document.createElement('button');
            target.textContent = 'Clicking on this button should open a new tab/window.';
            target.addEventListener('click', this);
            document.body.appendChild(target);
        },
        uninstall() {
            const target = this._target;
            if (target && target.parentNode) {
                target.parentNode.removeChild(target);
            }
            this._target = null;
            this._removeFrame();
        },
        _target: null,
        _frame: null,
        _removeFrame() {
            const frame = this._frame;
            if (frame && frame.parentNode) {
                frame.parentNode.removeChild(frame);
            }
            this._frame = null;
        },
        handleEvent() {
            this._removeFrame();
            // eslint-disable-next-line max-len
            document.body.innerHTML += "<iframe id='popup-opener-iframe' src='popup-opener-iframe.html' style='display:none;'></iframe>";
            this._frame = document.getElementById('popup-opener-iframe');
        },
    };


    window.falsePositiveInstallers = [
        jQueryDelegated,
        dispatchOnSameTarget,
        popupOnRealFrame,
    ];
}());
