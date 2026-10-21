/**
 * Canvas readout check shared by the test page and its iframe.
 *
 * The drawing is four solid opaque rectangles on integer coordinates: every
 * browser renders them without antialiasing, so the native pixel values are
 * known in advance and no reference image is needed. Any difference in a
 * readout means that it was changed after rendering.
 */

const SIZE = 64;
const HALF = SIZE / 2;

/**
 * Rectangles of the drawing, one per quadrant, as [x, y, [red, green, blue]].
 */
const BLOCKS = [
    [0, 0, [217, 43, 43]],
    [HALF, 0, [43, 217, 43]],
    [0, HALF, [43, 43, 217]],
    [HALF, HALF, [128, 128, 128]],
];

export const READOUT_STATUS = {
    NATIVE: 'native',
    NOISED: 'noised',
    UNEXPECTED: 'unexpected',
};

/**
 * Builds the native RGBA pixels of the drawing.
 *
 * @returns {Uint8ClampedArray} Pixels in `getImageData()` order.
 */
const getNativePixels = () => {
    const pixels = new Uint8ClampedArray(SIZE * SIZE * 4);
    BLOCKS.forEach(([left, top, color]) => {
        for (let y = top; y < top + HALF; y += 1) {
            for (let x = left; x < left + HALF; x += 1) {
                pixels.set([...color, 255], (y * SIZE + x) * 4);
            }
        }
    });
    return pixels;
};

/**
 * Creates a canvas of the drawing's size.
 *
 * @param {Document} doc Document that owns the canvas.
 *
 * @returns {{ canvas: HTMLCanvasElement, context: CanvasRenderingContext2D }} Canvas and its 2D context.
 */
const createCanvas = (doc) => {
    const canvas = doc.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    return { canvas, context: canvas.getContext('2d') };
};

/**
 * Compares a `getImageData()` readout with the native pixels.
 * Canvas noise changes one channel of a fully opaque pixel by one level;
 * any other difference is reported as unexpected.
 *
 * @param {Uint8ClampedArray} actual Readout pixels.
 * @param {Uint8ClampedArray} native Native pixels.
 *
 * @returns {{ status: string, changed: number, total: number }} Comparison result.
 */
const comparePixels = (actual, native) => {
    let changed = 0;
    let noiseOnly = true;
    for (let offset = 0; offset < native.length; offset += 4) {
        let changedChannels = 0;
        let maxDelta = 0;
        for (let channel = 0; channel < 4; channel += 1) {
            const delta = Math.abs(actual[offset + channel] - native[offset + channel]);
            if (delta > 0) {
                changedChannels += 1;
                maxDelta = Math.max(maxDelta, delta);
            }
        }
        if (changedChannels > 0) {
            changed += 1;
            const alphaChanged = actual[offset + 3] !== native[offset + 3];
            if (changedChannels > 1 || maxDelta > 1 || alphaChanged) {
                noiseOnly = false;
            }
        }
    }

    let status = READOUT_STATUS.NATIVE;
    if (changed > 0) {
        status = noiseOnly ? READOUT_STATUS.NOISED : READOUT_STATUS.UNEXPECTED;
    }
    return { status, changed, total: native.length / 4 };
};

/**
 * Encodes pixels through a canvas filled only with `putImageData()`.
 * Such a canvas received no rendering, so canvas protection leaves
 * its readout native.
 *
 * @param {Document} doc Document that owns the canvas.
 * @param {ImageData} pixels Pixels to encode.
 *
 * @returns {string} PNG data URL of the pixels.
 */
const encodePixels = (doc, pixels) => {
    const reference = createCanvas(doc);
    reference.context.putImageData(pixels, 0, 0);
    return reference.canvas.toDataURL();
};

/**
 * Draws the test picture in a document and reads it back.
 *
 * `toDataURL()` cannot be decoded without drawing it on another canvas, which
 * would add noise again. So it is compared with the encodings of the native
 * pixels and of the `getImageData()` readout: protection adds the same noise
 * to both readouts of the same canvas.
 *
 * @param {Document} doc Document to draw in.
 *
 * @returns {{
 *     imageData: { status: string, changed: number, total: number },
 *     dataUrl: { status: string },
 * }} Readout results.
 */
const readCanvas = (doc) => {
    const native = getNativePixels();

    const drawing = createCanvas(doc);
    BLOCKS.forEach(([x, y, [red, green, blue]]) => {
        drawing.context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        drawing.context.fillRect(x, y, HALF, HALF);
    });

    const readout = drawing.context.getImageData(0, 0, SIZE, SIZE);
    const imageData = comparePixels(readout.data, native);

    const dataUrl = drawing.canvas.toDataURL();
    let dataUrlStatus = READOUT_STATUS.UNEXPECTED;
    if (dataUrl === encodePixels(doc, new ImageData(native, SIZE, SIZE))) {
        dataUrlStatus = READOUT_STATUS.NATIVE;
    } else if (imageData.status === READOUT_STATUS.NOISED && dataUrl === encodePixels(doc, readout)) {
        dataUrlStatus = READOUT_STATUS.NOISED;
    }

    return { imageData, dataUrl: { status: dataUrlStatus } };
};

/**
 * Draws the test picture and reads it back, see {@link readCanvas}.
 * An exception is returned as the error of the readout, so the page
 * can show it instead of waiting for a result.
 *
 * @param {Document} doc Document to draw in.
 *
 * @returns {ReturnType<typeof readCanvas> | { error: string }} Readout results or the error.
 */
export const tryReadCanvas = (doc) => {
    try {
        return readCanvas(doc);
    } catch (error) {
        return { error: String(error) };
    }
};
