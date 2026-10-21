import { tryReadCanvas } from '../canvas-readout.js';

// The parent page waits for this result.
window.addEventListener('load', () => {
    window.canvasReadout = tryReadCanvas(document);
});
