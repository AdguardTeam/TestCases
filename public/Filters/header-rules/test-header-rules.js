import { getAgTestRunner, isSubscribed, isBlockedFetch } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-header-rules.txt to AdGuard
 */

const baseUrl = window.location.origin;

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-header-rules-filter');

    agTest(1, 'compatibility with content type modifiers ($script, $style, $subdocument, etc)', async (assert) => {
        const isInjectionBlocked = async (type, url) => {
            return new Promise((resolve) => {
                let element;
                if (type === 'script') {
                    element = document.createElement('script');
                } else {
                    element = document.createElement('link');
                }

                let done = false;
                const handleLoad = () => {
                    if (!done) {
                        done = true;
                        element.remove();
                        resolve(false);
                    }
                };

                const handleReadyStateChange = () => {
                    let state;

                    if (!done) {
                        state = element.readyState;
                        if (state === 'complete') {
                            handleLoad();
                        }
                    }
                };

                const handleError = () => {
                    if (!done) {
                        done = true;
                        element.remove();
                        resolve(true);
                    }
                };

                if (type === 'script') {
                    element.src = url;
                } else {
                    element.href = url;
                    element.rel = 'stylesheet';
                }

                element.onload = handleLoad;
                element.onreadystatechange = handleReadyStateChange;
                element.onerror = handleError;

                document.body.appendChild(element);
            });
        };

        const bin = `${baseUrl}/httpbin/response-headers`;
        const header = 'case1=1';
        const script = 'Content-Type=application%2Fjavascript%3B+charset%3DUTF-8';
        const css = 'Content-Type=text%2Fcss%3B+charset%3DUTF-8';

        const [
            isScriptWithHeaderBlocked,
            isScriptWithoutHeaderBlocked,
            isStyleWithHeaderBlocked,
            isStyleWithoutHeaderBlocked,
        ] = await Promise.all([
            await isInjectionBlocked('script', `${bin}?${header}&${script}`),
            await isInjectionBlocked('script', `${bin}?${script}`),
            await isInjectionBlocked('css', `${bin}?${header}&${css}`),
            await isInjectionBlocked('css', `${bin}?${css}`),
        ]);

        // Only script with header should be blocked
        const isBlocked = isScriptWithHeaderBlocked
            && !isScriptWithoutHeaderBlocked
            && !isStyleWithHeaderBlocked
            && !isStyleWithoutHeaderBlocked;

        assert.ok(
            adgCheck && isBlocked,
            '$header,script modifier blocks only script with header',
        );
    });

    agTest(2, 'compatibility with $third-party modifier', async (assert) => {
        const firstPartyBin = `${baseUrl}/httpbin/response-headers`;
        const thirdPartyBin = 'https://httpbin.agrd.workers.dev/response-headers';
        const header = 'case2=2';

        const [
            isFirstPartyWithHeaderBlocked,
            isFirstPartyWithoutHeaderBlocked,
            isThirdPartyWithHeaderBlocked,
            isThirdPartyWithoutHeaderBlocked,
        ] = await Promise.all([
            isBlockedFetch(`${firstPartyBin}?${header}`),
            isBlockedFetch(`${firstPartyBin}`),
            isBlockedFetch(`${thirdPartyBin}?${header}`),
            isBlockedFetch(`${thirdPartyBin}`),
        ]);

        // Only third party with header should be blocked
        const isBlocked = !isFirstPartyWithHeaderBlocked
            && !isFirstPartyWithoutHeaderBlocked
            && isThirdPartyWithHeaderBlocked
            && !isThirdPartyWithoutHeaderBlocked;

        assert.ok(
            adgCheck && isBlocked,
            '$header,third-party modifier blocks only requests with the exact header name and third-party domain',
        );
    });

    agTest(3, 'compatibility with $domain modifier', async (assert) => {
        const matchingBin = 'https://httpbin.agrd.workers.dev/response-headers';
        const nonMatchingBin = `${baseUrl}/httpbin/response-headers`;
        const header = 'case3=3';

        const [
            isMatchingWithHeaderBlocked,
            isMatchingWithoutHeaderBlocked,
            isNonMatchingWithHeaderBlocked,
            isNonMatchingWithoutHeaderBlocked,
        ] = await Promise.all([
            isBlockedFetch(`${matchingBin}?${header}`),
            isBlockedFetch(`${matchingBin}`),
            isBlockedFetch(`${nonMatchingBin}?${header}`),
            isBlockedFetch(`${nonMatchingBin}`),
        ]);

        // Only matching domain with header should be blocked
        const isBlocked = isMatchingWithHeaderBlocked
            && !isMatchingWithoutHeaderBlocked
            && !isNonMatchingWithHeaderBlocked
            && !isNonMatchingWithoutHeaderBlocked;

        assert.ok(
            adgCheck && isBlocked,
            '$header,domain modifier blocks only requests with the exact header name and domain',
        );
    });

    agTest(4, 'compatibility with $match-case modifier', async (assert) => {
        const upperCaseBin = `${baseUrl}/httpbin/response-headers/TestHeader`;
        const lowerCaseBin = `${baseUrl}/httpbin/response-headers/testheader`;
        const header = 'case4=4';

        const [
            isUpperCaseWithHeaderBlocked,
            isUpperCaseWithoutHeaderBlocked,
            isLowerCaseWithHeaderBlocked,
            isLowerCaseWithoutHeaderBlocked,
        ] = await Promise.all([
            isBlockedFetch(`${upperCaseBin}?${header}`),
            isBlockedFetch(`${upperCaseBin}`),
            isBlockedFetch(`${lowerCaseBin}?${header}`),
            isBlockedFetch(`${lowerCaseBin}`),
        ]);

        // Only matching URL with header should be blocked
        const isBlocked = isUpperCaseWithHeaderBlocked
            && !isUpperCaseWithoutHeaderBlocked
            && !isLowerCaseWithHeaderBlocked
            && !isLowerCaseWithoutHeaderBlocked;

        assert.ok(
            adgCheck && isBlocked,
            '$header,match-case modifier blocks only requests with the exact header name and route',
        );
    });
});
