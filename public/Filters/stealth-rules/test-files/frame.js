import { readCanvas } from '../canvas-readout.js';

// The parent page reads the result on its own `load` event,
// which fires after the `load` event of this frame.
window.addEventListener('load', () => {
    window.canvasReadout = readCanvas(document);
});
