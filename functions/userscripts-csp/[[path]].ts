import Mustache from 'mustache';
import { caseTemplate, rootTemplate } from './templates';

type Policy = {
    key: string,
    value: string,
    note?: string,
    asMetaTag?: boolean,
};

type CaseData = {
    id: CaseId,
    policy: Policy,
};

/**
 * Enum representing the different case identifiers for the Content Security Policy (CSP) cases.
 */
enum CaseId {
    // Header
    HeaderTrustedTypesDefault = 'header-trusted-types-default',
    HeaderTrustedTypesAdguard = 'header-trusted-types-adguard',
    HeaderTrustedTypesScript = 'header-trusted-types-script',
    HeaderTrustedTypesAdguardDuplicates = 'header-trusted-types-adguard-duplicates',
    HeaderCspDefaultSrcNone = 'header-csp-default-src-none',
    HeaderCspUnsafeEval = 'header-csp-unsafe-eval',
    HeaderCspUnsafeInlineScript = 'header-csp-unsafe-inline-script',
    HeaderCspUnsafeInlineStyle = 'header-csp-unsafe-inline-style',
    HeaderCspUnsafeInlineScriptAndStyle = 'header-csp-unsafe-inline-script-and-style',
    HeaderCspUnsafeScript = 'header-csp-unsafe-script',
    HeaderCspUnsafeScriptWithAdguardTrustedTypes = 'header-csp-unsafe-script-with-trusted-types',

    // Meta
    MetaTrustedTypesDefault = 'meta-trusted-types-default',
    MetaCspDefaultSrcNone = 'meta-csp-default-src-none',
    MetaTrustedTypesAdguard = 'meta-trusted-types-adguard',
    MetaTrustedTypesScript = 'meta-trusted-types-script',
    MetaTrustedTypesAdguardDuplicates = 'meta-trusted-types-adguard-duplicates',
    MetaCspUnsafeEval = 'meta-csp-unsafe-eval',
    MetaCspUnsafeInlineScript = 'meta-csp-unsafe-inline-script',
    MetaCspUnsafeInlineStyle = 'meta-csp-unsafe-inline-style',
    MetaCspUnsafeInlineScriptAndStyle = 'meta-csp-unsafe-inline-script-and-style',
    MetaCspUnsafeScript = 'meta-csp-unsafe-script',
    MetaCspUnsafeScriptWithTrustedTypes = 'meta-csp-unsafe-script-with-trusted-types',
}

/**
 * Enum representing the different header keys used in the Content Security Policy (CSP).
 */
enum HeaderKey {
    ContentSecurityPolicy = 'Content-Security-Policy',
}

type Cases = {
    [key in CaseId]: CaseData
};

const cases: Cases = {
    [CaseId.HeaderTrustedTypesDefault]: {
        id: CaseId.HeaderTrustedTypesDefault,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: 'trusted-types one two default',
        },
    },
    [CaseId.HeaderTrustedTypesAdguard]: {
        id: CaseId.HeaderTrustedTypesAdguard,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: 'trusted-types one two AGPolicy',
        },
    },
    [CaseId.HeaderTrustedTypesScript]: {
        id: CaseId.HeaderTrustedTypesScript,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "require-trusted-types-for 'script'",
        },
    },
    [CaseId.HeaderTrustedTypesAdguardDuplicates]: {
        id: CaseId.HeaderTrustedTypesAdguardDuplicates,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "trusted-types one two AGPolicy 'allow-duplicates'",
        },
    },
    [CaseId.HeaderCspDefaultSrcNone]: {
        id: CaseId.HeaderCspDefaultSrcNone,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: `
                default-src 'none';
                connect-src 'self';
                script-src 'nonce-AGTEST';
                object-src 'none';
                base-uri 'none';
                frame-ancestors 'none';
            `,
        },
    },
    [CaseId.HeaderCspUnsafeEval]: {
        id: CaseId.HeaderCspUnsafeEval,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "script-src * 'unsafe-eval' 'nonce-AGTEST'",
        },
    },
    [CaseId.HeaderCspUnsafeInlineScript]: {
        id: CaseId.HeaderCspUnsafeInlineScript,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "script-src * 'unsafe-inline' 'nonce-AGTEST'",
        },
    },
    [CaseId.HeaderCspUnsafeInlineStyle]: {
        id: CaseId.HeaderCspUnsafeInlineStyle,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "style-src * 'unsafe-inline' 'nonce-AGTEST'",
        },
    },
    [CaseId.HeaderCspUnsafeInlineScriptAndStyle]: {
        id: CaseId.HeaderCspUnsafeInlineScriptAndStyle,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: `
                script-src * 'unsafe-inline' 'nonce-AGTEST';
                style-src * 'unsafe-inline' 'nonce-AGTEST';
            `,
        },
    },
    [CaseId.HeaderCspUnsafeScript]: {
        id: CaseId.HeaderCspUnsafeScript,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "script-src * 'unsafe-eval' 'unsafe-inline' 'nonce-AGTEST'",
        },
    },
    [CaseId.HeaderCspUnsafeScriptWithAdguardTrustedTypes]: {
        id: CaseId.HeaderCspUnsafeScriptWithAdguardTrustedTypes,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: `
                script-src * 'unsafe-eval' 'unsafe-inline' 'nonce-AGTEST';
                trusted-types one two AGPolicy;
                require-trusted-types-for 'script';
            `,
        },
    },
    [CaseId.MetaTrustedTypesDefault]: {
        id: CaseId.MetaTrustedTypesDefault,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: 'trusted-types one two default',
            asMetaTag: true,
        },
    },
    [CaseId.MetaTrustedTypesAdguard]: {
        id: CaseId.MetaTrustedTypesAdguard,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: 'trusted-types one two AGPolicy',
            asMetaTag: true,
        },
    },
    [CaseId.MetaTrustedTypesScript]: {
        id: CaseId.MetaTrustedTypesScript,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "require-trusted-types-for 'script'",
            asMetaTag: true,
        },
    },
    [CaseId.MetaTrustedTypesAdguardDuplicates]: {
        id: CaseId.MetaTrustedTypesAdguardDuplicates,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "trusted-types one two AGPolicy 'allow-duplicates'",
            asMetaTag: true,
        },
    },
    [CaseId.MetaCspDefaultSrcNone]: {
        id: CaseId.MetaCspDefaultSrcNone,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: `
            default-src 'none';
            connect-src 'self';
            script-src 'nonce-AGTEST';
            object-src 'none';
            base-uri 'none';
            `,
            asMetaTag: true,
        },
    },
    [CaseId.MetaCspUnsafeEval]: {
        id: CaseId.MetaCspUnsafeEval,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "script-src * 'unsafe-eval' 'nonce-AGTEST'",
            asMetaTag: true,
        },
    },
    [CaseId.MetaCspUnsafeInlineScript]: {
        id: CaseId.MetaCspUnsafeInlineScript,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "script-src * 'unsafe-inline' 'nonce-AGTEST'",
            asMetaTag: true,
        },
    },
    [CaseId.MetaCspUnsafeInlineStyle]: {
        id: CaseId.MetaCspUnsafeInlineStyle,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "style-src * 'unsafe-inline' 'nonce-AGTEST'",
            asMetaTag: true,
        },
    },
    [CaseId.MetaCspUnsafeInlineScriptAndStyle]: {
        id: CaseId.MetaCspUnsafeInlineScriptAndStyle,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: `
                script-src * 'unsafe-inline' 'nonce-AGTEST';
                style-src * 'unsafe-inline' 'nonce-AGTEST';
            `,
            asMetaTag: true,
        },
    },
    [CaseId.MetaCspUnsafeScript]: {
        id: CaseId.MetaCspUnsafeScript,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: "script-src * 'unsafe-eval' 'unsafe-inline' 'nonce-AGTEST'",
            asMetaTag: true,
        },
    },
    [CaseId.MetaCspUnsafeScriptWithTrustedTypes]: {
        id: CaseId.MetaCspUnsafeScriptWithTrustedTypes,
        policy: {
            key: HeaderKey.ContentSecurityPolicy,
            value: `
                script-src * 'unsafe-eval' 'unsafe-inline' 'nonce-AGTEST';
                trusted-types one two AGPolicy;
                require-trusted-types-for 'script';
            `,
            asMetaTag: true,
        },
    },
};

/**
 * Renders the root page with the list of CSP cases using Mustache.
 *
 * @param casesData - The data for all CSP cases to be rendered on the root page.
 * @returns A string containing the HTML for the root page.
 */
const renderRootPage = (casesData: Cases) => {
    return Mustache.render(rootTemplate, { cases: Object.values(casesData) });
};

/**
 * Renders an individual CSP case page with the given case data using Mustache.
 *
 * @param caseData - The specific case data to render.
 * @returns A string containing the HTML for the case page.
 */
const renderCasePage = (caseData: CaseData) => {
    return Mustache.render(caseTemplate, caseData);
};

/**
 * Generates a Response object containing the rendered HTML page and the appropriate CSP header.
 *
 * @param caseData - The specific case data to be used for generating the response.
 * @returns A Promise resolving to a Response object with the rendered page and headers.
 */
const getResponse = async (caseData: CaseData) => {
    const html = renderCasePage(caseData);

    // Remove newlines from the CSP value string
    const cspValue = caseData.policy.value.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim();

    const headersObj = caseData.policy.asMetaTag
        ? { 'content-type': 'text/html;charset=UTF-8' }
        : {
            [caseData.policy.key]: cspValue,
            'content-type': 'text/html;charset=UTF-8',
        };

    return new Response(html, {
        headers: headersObj,
    });
};

/**
 * Handles incoming requests and returns the appropriate response based on the request URL.
 *
 * @param request - The incoming Request object.
 * @returns A Promise resolving to the appropriate Response object.
 */
const handleRequest = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);

    const path = url.pathname !== '/' && url.pathname.endsWith('/')
        ? url.pathname.slice(0, -1)
        : url.pathname;

    switch (path) {
        case '/userscripts-csp':
            return new Response(renderRootPage(cases), {
                headers: {
                    'content-type': 'text/html;charset=UTF-8',
                },
            });
        case `/userscripts-csp/${CaseId.HeaderTrustedTypesDefault}`:
            return getResponse(cases[CaseId.HeaderTrustedTypesDefault]);
        case `/userscripts-csp/${CaseId.HeaderTrustedTypesAdguard}`:
            return getResponse(cases[CaseId.HeaderTrustedTypesAdguard]);
        case `/userscripts-csp/${CaseId.HeaderTrustedTypesScript}`:
            return getResponse(cases[CaseId.HeaderTrustedTypesScript]);
        case `/userscripts-csp/${CaseId.HeaderTrustedTypesAdguardDuplicates}`:
            return getResponse(cases[CaseId.HeaderTrustedTypesAdguardDuplicates]);
        case `/userscripts-csp/${CaseId.HeaderCspDefaultSrcNone}`:
            return getResponse(cases[CaseId.HeaderCspDefaultSrcNone]);
        case `/userscripts-csp/${CaseId.HeaderCspUnsafeEval}`:
            return getResponse(cases[CaseId.HeaderCspUnsafeEval]);
        case `/userscripts-csp/${CaseId.HeaderCspUnsafeInlineScript}`:
            return getResponse(cases[CaseId.HeaderCspUnsafeInlineScript]);
        case `/userscripts-csp/${CaseId.HeaderCspUnsafeInlineStyle}`:
            return getResponse(cases[CaseId.HeaderCspUnsafeInlineStyle]);
        case `/userscripts-csp/${CaseId.HeaderCspUnsafeInlineScriptAndStyle}`:
            return getResponse(cases[CaseId.HeaderCspUnsafeInlineScriptAndStyle]);
        case `/userscripts-csp/${CaseId.HeaderCspUnsafeScript}`:
            return getResponse(cases[CaseId.HeaderCspUnsafeScript]);
        case `/userscripts-csp/${CaseId.HeaderCspUnsafeScriptWithAdguardTrustedTypes}`:
            return getResponse(cases[CaseId.HeaderCspUnsafeScriptWithAdguardTrustedTypes]);
        case `/userscripts-csp/${CaseId.MetaTrustedTypesDefault}`:
            return getResponse(cases[CaseId.MetaTrustedTypesDefault]);
        case `/userscripts-csp/${CaseId.MetaCspDefaultSrcNone}`:
            return getResponse(cases[CaseId.MetaCspDefaultSrcNone]);
        case `/userscripts-csp/${CaseId.MetaTrustedTypesAdguard}`:
            return getResponse(cases[CaseId.MetaTrustedTypesAdguard]);
        case `/userscripts-csp/${CaseId.MetaTrustedTypesScript}`:
            return getResponse(cases[CaseId.MetaTrustedTypesScript]);
        case `/userscripts-csp/${CaseId.MetaTrustedTypesAdguardDuplicates}`:
            return getResponse(cases[CaseId.MetaTrustedTypesAdguardDuplicates]);
        case `/userscripts-csp/${CaseId.MetaCspUnsafeEval}`:
            return getResponse(cases[CaseId.MetaCspUnsafeEval]);
        case `/userscripts-csp/${CaseId.MetaCspUnsafeInlineScript}`:
            return getResponse(cases[CaseId.MetaCspUnsafeInlineScript]);
        case `/userscripts-csp/${CaseId.MetaCspUnsafeInlineStyle}`:
            return getResponse(cases[CaseId.MetaCspUnsafeInlineStyle]);
        case `/userscripts-csp/${CaseId.MetaCspUnsafeInlineScriptAndStyle}`:
            return getResponse(cases[CaseId.MetaCspUnsafeInlineScriptAndStyle]);
        case `/userscripts-csp/${CaseId.MetaCspUnsafeScript}`:
            return getResponse(cases[CaseId.MetaCspUnsafeScript]);
        case `/userscripts-csp/${CaseId.MetaCspUnsafeScriptWithTrustedTypes}`:
            return getResponse(cases[CaseId.MetaCspUnsafeScriptWithTrustedTypes]);
        default:
            return new Response('404', { status: 404 });
    }
};

/**
 * Main entry point for handling requests.
 *
 * @param context - The event context containing the request object.
 * @returns A Promise resolving to the Response object generated by the handleRequest function.
 */
export function onRequest(
    context: EventContext<any, any, any>,
) {
    return handleRequest(context.request);
}
