/* eslint-disable import/no-unresolved */
/* eslint-disable brace-style */
/* eslint-disable no-console */
const fs = require('fs');
const fetch = require('node-fetch');
const { exec } = require('child_process');
const { runQunitPuppeteer, printOutput } = require('node-qunit-puppeteer');

const checkIfExist = (file) => {
  fs.exists(file, (exists) => {
    if (!exists) {
      throw new Error(`Error: can't find ${file}`);
    }
  });
};

const getFilterRules = filterUrl => new Promise((resolve, reject) => {
  fetch(filterUrl)
    .then(res => resolve(res.text()))
    .catch(err => reject(new Error(err)));
});

const getFilterFileName = filterUrl => filterUrl.slice(filterUrl.lastIndexOf('/') + 1, filterUrl.length);

const createFilterFile = (filterUrl, rules) => new Promise((resolve, reject) => {
  const filterFileName = getFilterFileName(filterUrl);
  fs.writeFile(filterFileName, rules, (error) => {
    if (error) {
      reject(new Error(error));
    }
    console.log('\x1b[33m%s\x1b[0m', `Filter file ${filterFileName} was created`);
    resolve();
  });
});

const deleteFilterFile = filterUrl => new Promise((resolve, reject) => {
  const filterFileName = getFilterFileName(filterUrl);
  fs.unlink(filterFileName, (error) => {
    if (error) {
      reject(new Error(error));
    }
    console.log('\x1b[33m%s\x1b[0m', `Filter file ${filterFileName} was deleted`);
    resolve();
  });
});

const addFilterToProxyConfig = filterUrl => new Promise((resolve, reject) => {
  const filterFileName = getFilterFileName(filterUrl);
  checkIfExist(filterFileName);
  checkIfExist('proxy.conf');
  fs.readFile('proxy.conf', 'utf8', (err, data) => {
    if (err) {
      reject(new Error(err));
    }
    if (data.indexOf(filterFileName) === -1) {
      const result = data.replace('"filters" : [', `"filters" : [\n\t\t"${filterFileName}",`);
      fs.writeFile('proxy.conf', result, 'utf8', (error) => {
        if (error) {
          reject(new Error(error));
        }
        resolve();
      });
    }
    console.log('\x1b[33m%s\x1b[0m', `Filter ${filterFileName} was added to proxy config file`);
    resolve();
  });
});

const removeFilterFromProxyConfig = filterUrl => new Promise((resolve, reject) => {
  const filterFileName = getFilterFileName(filterUrl);
  fs.readFile('proxy.conf', 'utf8', (err, data) => {
    if (err) {
      reject(new Error(err));
    }
    if (data.indexOf(filterFileName) !== -1) {
      const result = data.replace(`"${filterFileName}",\n`, '');
      fs.writeFile('proxy.conf', result, 'utf8', (error) => {
        if (error) {
          reject(new Error(error));
        }
        console.log('\x1b[33m%s\x1b[0m', `Filter ${filterFileName} was removed from proxy config file`);
        resolve();
      });
    }
    resolve();
  });
});

const runProxyServer = () => new Promise((resolve, reject) => {
  try {
    const proxy = exec('./proxy_server');
    resolve(proxy);
    console.log('\x1b[33m%s\x1b[0m', 'Proxy server started');
  } catch (err) {
    reject(new Error(err));
  }
});

const stopProxyServer = proxy => new Promise((resolve, reject) => {
  try {
    proxy.kill();
    console.log('\x1b[33m%s\x1b[0m', 'Proxy server stopped');
    resolve();
  } catch (err) {
    reject(new Error(err));
  }
});

const makeQunitPuppeteerTest = (testUrl, proxy) => new Promise((resolve, reject) => {
  const qunitArgs = {
    targetUrl: testUrl,
    timeout: 10000,
    ignoreHTTPSErrors: true,
    redirectConsole: true,
    puppeteerArgs: ['--allow-file-access-from-files', '--proxy-server=0.0.0.0:3129'],
  };
  setTimeout(() => {
    runQunitPuppeteer(qunitArgs)
      .then((result) => {
        printOutput(result, console);
        resolve(proxy);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  }, 2000);
});

const runTestCase = async (testCaseUrl, filterUrl) => {
  await getFilterRules(filterUrl)
    .then(rules => createFilterFile(filterUrl, rules))
    .then(() => addFilterToProxyConfig(filterUrl))
    .then(() => runProxyServer())
    .then(proxy => makeQunitPuppeteerTest(testCaseUrl, proxy))
    .then(proxy => stopProxyServer(proxy))
    .then(() => removeFilterFromProxyConfig(filterUrl))
    .then(() => deleteFilterFile(filterUrl));
};

const testServerUrl = 'http://testcases.adguard.com/';

runTestCase(
  `${testServerUrl}Filters/simple-rules/test-simple-rules.html`,
  `${testServerUrl}Filters/simple-rules/test-simple-rules.txt`,
);
