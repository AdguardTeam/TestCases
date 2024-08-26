/* eslint-disable max-len */

/**
 * Template for inner pages
 */
export const caseTemplate = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Trusted Types Test - {{id}}</title>
    {{#policy.asMetaTag}}
    <meta http-equiv="{{policy.key}}" content="{{policy.value}}">
    {{/policy.asMetaTag}}
</head>
<body class="container mt-5">
   <h1 class="text-primary">{{id}}</h1>

   <section class="mt-4">
       <h2 class="h4">Directive Details</h2>
       <p class="lead">Adds a {{#policy.asMetaTag}}meta tag{{/policy.asMetaTag}}{{^policy.asMetaTag}}header{{/policy.asMetaTag}} to the page with the following directive: "<strong>{{policy.key}}</strong>: {{policy.value}}"</p>
   </section>

   <section class="mt-4">
       <h2 class="h4">Received Headers</h2>
       <pre id="headers-output" class="bg-light p-3"></pre>
   </section>

   <section class="mt-4">
       <a href="../csp" class="btn btn-primary">Back to Test Cases</a>
   </section>

   <script nonce="AGTEST">
       // Function to fetch and display headers
       async function fetchAndDisplayHeaders() {
           const url = location.href;  // Use the current location's URL
           try {
               const response = await fetch(url);
               const headersOutput = document.getElementById('headers-output');
               let headersText = '';

               // Iterate over the headers and add them to the output
               for (const [key, value] of response.headers) {
                   headersText += \`\${key}: \${value}\\n\`;
               }

               headersOutput.textContent = headersText || 'No headers received.';
           } catch (error) {
               document.getElementById('headers-output').textContent = 'Failed to fetch headers: ' + error;
           }
       }

       // Call the function to fetch and display headers when the page loads
       fetchAndDisplayHeaders();
   </script>
</body>
</html>
`;

/**
 * Template for the root page.
 */
export const rootTemplate = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Trusted Types Test</title>
</head>
<body class="container mt-5">
    <h1 class="text-primary">Trusted Types Tests</h1>
    
    <section class="mt-4">
       <a href="/Filters/content-security-policy/test-content-security-policy.txt" class="text-primary font-weight-bold">
           Subscribe to Test Filter
       </a>
    </section>

   <section class="mt-4">
        <h2 class="h4">How to Test</h2>
        <ol>
            <li>Add rules</li>
            <li>Open one of the pages</li>
            <li>Open DevTools on this page</li>
            <li>Reload the page</li>
            <li>Ensure all scripts are injected and there are no errors in the console</li>
        </ol>
    </section>

    <section class="mt-4">
       <h2 class="h4">Test Cases</h2>
       <ul class="list-group mt-2">
           {{#cases}}
               <li class="list-group-item">
                   <input type="checkbox" id="case-{{id}}" />
                   <label for="case-{{id}}">
                       <a href="./csp/{{id}}" class="text-primary font-weight-bold">{{id}}</a>
                       <p class="mb-0">
                           Adds {{#policy.asMetaTag}}meta tag{{/policy.asMetaTag}}{{^policy.asMetaTag}}header{{/policy.asMetaTag}} to the page: 
                           "<strong>{{policy.key}}</strong>: {{policy.value}}"
                       </p>
                   </label>
               </li>
           {{/cases}}
       </ul>
    </section>
</body>
</html>
`;
