/* global QUnit */

import { getAgTestRunner } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-permissions-rules.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', () => {
    agTest(1, 'allowlist rule disables all $permissions rules of the same pattern', async (assert) => {
        const done = assert.async();
        const done2 = assert.async();
        const done3 = assert.async();

        navigator.geolocation.getCurrentPosition(
                (position) => {
                    assert.ok(position, 'Geolocation API was unblocked!');
                    done();
                },
                (error) => {
                    assert.ok(false, 'Geolocation API was not unblocked.');
                    done();
                }
        );

        // Check 'camera' directive
        let mediaConstraints = { video: true };
        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then((mediaStream) => {
                assert.ok(mediaStream, 'Camera access was unblocked!');
                done2();
            })
            .catch(() => {
                assert.ok(false,'Camera access was not unblocked.');
                done2();
            });

        // Check 'microphone' directive
        mediaConstraints = { audio: true };
        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then((mediaStream) => {
                assert.ok(mediaStream, 'Microphone access was unblocked!');
                done3();
            })
            .catch(() => {
                assert.ok(false,'Microphone access was not unblocked.');
                done3();
            });
    });
});
