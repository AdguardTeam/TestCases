import { READOUT_STATUS, tryReadCanvas } from './canvas-readout.js';

/**
 * Statuses the page shows besides the readout statuses.
 */
const PAGE_STATUS = {
    /**
     * A readout is missing: it threw, or the iframe gave none in time.
     */
    ERROR: 'error',
    /**
     * The readouts have different statuses.
     */
    INCONSISTENT: 'inconsistent',
};

/**
 * How long the page waits for the iframe readout.
 */
const FRAME_READOUT_TIMEOUT_MS = 10000;

/**
 * How often the page checks for the iframe readout.
 */
const FRAME_READOUT_POLL_INTERVAL_MS = 50;

/**
 * Waits for the readout that the iframe stores on its window.
 *
 * @param {HTMLIFrameElement} frame Iframe of the page.
 *
 * @returns {Promise<object>} Readout results, or an error when the iframe
 * gave no readout within {@link FRAME_READOUT_TIMEOUT_MS}.
 */
const waitForFrameReadout = (frame) => {
    const deadline = Date.now() + FRAME_READOUT_TIMEOUT_MS;

    return new Promise((resolve) => {
        const check = () => {
            const { canvasReadout } = frame.contentWindow;
            if (canvasReadout) {
                resolve(canvasReadout);
                return;
            }

            if (Date.now() >= deadline) {
                resolve({ error: `no readout in ${FRAME_READOUT_TIMEOUT_MS / 1000} s` });
                return;
            }

            setTimeout(check, FRAME_READOUT_POLL_INTERVAL_MS);
        };

        check();
    });
};

/**
 * Formats a `getImageData()` result.
 *
 * @param {{ status: string, changed: number, total: number }} result Comparison result.
 *
 * @returns {string} Status with the number of changed pixels.
 */
const formatImageData = ({ status, changed, total }) => {
    return status === READOUT_STATUS.NATIVE
        ? status
        : `${status}: ${changed} of ${total} pixels changed`;
};

/**
 * Shows a result in a table cell.
 *
 * @param {string} id Cell id.
 * @param {string} status Readout or page status, used as the cell class.
 * @param {string} text Cell text.
 */
const showResult = (id, status, text) => {
    const cell = document.getElementById(id);
    cell.textContent = text;
    cell.className = status;
};

/**
 * Shows the readouts of one document in its column.
 *
 * @param {string} column Cell id prefix: `page` or `frame`.
 * @param {object} readout Readout results or the error.
 *
 * @returns {string[]} Statuses of the column.
 */
const showReadout = (column, readout) => {
    if (readout.error) {
        const text = `${PAGE_STATUS.ERROR}: ${readout.error}`;
        showResult(`${column}-image-data`, PAGE_STATUS.ERROR, text);
        showResult(`${column}-data-url`, PAGE_STATUS.ERROR, text);
        return [PAGE_STATUS.ERROR];
    }

    const { imageData, dataUrl } = readout;
    showResult(`${column}-image-data`, imageData.status, formatImageData(imageData));
    showResult(`${column}-data-url`, dataUrl.status, dataUrl.status);
    return [imageData.status, dataUrl.status];
};

/**
 * Combines the statuses of all readouts.
 *
 * @param {string[]} statuses Statuses of the page and the iframe.
 *
 * @returns {string} The shared status, or a page status when there is none.
 */
const getSummary = (statuses) => {
    if (statuses.includes(PAGE_STATUS.ERROR)) {
        return PAGE_STATUS.ERROR;
    }
    return new Set(statuses).size === 1 ? statuses[0] : PAGE_STATUS.INCONSISTENT;
};

/**
 * Before doing the test, turn on Tracking protection and Block fingerprinting
 * in the extension and set up a case from README.md.
 */
window.addEventListener('DOMContentLoaded', async () => {
    const pageStatuses = showReadout('page', tryReadCanvas(document));
    const frameReadout = await waitForFrameReadout(document.getElementById('frame'));
    const frameStatuses = showReadout('frame', frameReadout);

    const summary = getSummary([...pageStatuses, ...frameStatuses]);
    showResult('summary-status', summary, summary);
});
