import { READOUT_STATUS, readCanvas } from './canvas-readout.js';

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
 * @param {string} status Readout status, used as the cell class.
 * @param {string} text Cell text.
 */
const showResult = (id, status, text) => {
    const cell = document.getElementById(id);
    cell.textContent = text;
    cell.className = status;
};

/**
 * Before doing the test, turn on Tracking protection and Block fingerprinting
 * in the extension and set up a case from README.md.
 *
 * The page waits for its `load` event, which fires after the iframe
 * has loaded and stored its own readout.
 */
window.addEventListener('load', () => {
    const page = readCanvas(document);
    const frame = document.getElementById('frame').contentWindow.canvasReadout;

    showResult('page-image-data', page.imageData.status, formatImageData(page.imageData));
    showResult('page-data-url', page.dataUrl.status, page.dataUrl.status);
    showResult('frame-image-data', frame.imageData.status, formatImageData(frame.imageData));
    showResult('frame-data-url', frame.dataUrl.status, frame.dataUrl.status);

    const statuses = new Set([
        page.imageData.status,
        page.dataUrl.status,
        frame.imageData.status,
        frame.dataUrl.status,
    ]);
    const [summary] = statuses.size === 1 ? statuses : ['inconsistent'];
    showResult('summary-status', summary, summary);
});
