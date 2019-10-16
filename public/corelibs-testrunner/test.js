/* eslint-disable import/no-unresolved */
/* eslint-disable brace-style */
/* eslint-disable no-console */
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');
const { runQunitPuppeteer, printOutput } = require('node-qunit-puppeteer');
const commander = require('commander');

const getFilterRules = async (filterUrl) => {
    try {
        return await axios.get(filterUrl).then(response => response.data);
    } catch (error) {
        return new Error(error);
    }
};

const getFilterFileName = async (filterUrl) => {
    try {
        return await filterUrl.slice(filterUrl.lastIndexOf('/') + 1, filterUrl.length);
    } catch (error) {
        return new Error(error);
    }
};

const createFilterFile = (filterFileName, rules) => new Promise((resolve, reject) => {
    fs.writeFile(filterFileName, rules, (error) => {
        if (error) {
            reject(new Error(error));
        }
        resolve();
        console.log('\x1b[33m%s\x1b[0m', `Filter file ${filterFileName} was created`);
    });
});

const deleteFilterFile = filterFileName => new Promise((resolve, reject) => {
    fs.unlink(filterFileName, (error) => {
        if (error) {
            reject(new Error(error));
        }
        resolve();
        console.log('\x1b[33m%s\x1b[0m', `Filter file ${filterFileName} was deleted`);
    });
});

const addFilterToProxyConfig = filterFileName => new Promise((resolve, reject) => {
    fs.readFile('proxy.conf', 'utf8', (err, data) => {
        if (err) {
            reject(new Error(err));
        }
        if (data.indexOf(filterFileName) === -1) {
            const result = data.replace('"filters" : [', `"filters" : [\n"${filterFileName}",`);
            fs.writeFile('proxy.conf', result, 'utf8', (error) => {
                if (error) {
                    reject(new Error(error));
                }
                resolve();
                console.log('\x1b[33m%s\x1b[0m', `Filter ${filterFileName} was added to proxy config file`);
            });
        } else {
            resolve();
            console.log('\x1b[33m%s\x1b[0m', `Filter ${filterFileName} was already in proxy config file`);
        }
    });
});

const removeFilterFromProxyConfig = filterFileName => new Promise((resolve, reject) => {
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
                resolve();
                console.log('\x1b[33m%s\x1b[0m', `Filter ${filterFileName} was removed from proxy config file`);
            });
        } else {
            resolve();
            console.log('\x1b[33m%s\x1b[0m', `There was no filter ${filterFileName} in proxy config file`);
        }
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

const stopProxyServer = async (proxy) => {
    try {
        await proxy.kill();
        console.log('\x1b[33m%s\x1b[0m', 'Proxy server stopped');
    } catch (err) {
        console.log(new Error(err));
    }
};

const makeQunitPuppeteerTest = testUrl => new Promise((resolve, reject) => {
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
                resolve();
            })
            .catch((err) => {
                reject(new Error(err));
            });
    }, 2000);
});

const runTestCase = async (testcaseUrl, filterUrl) => {
    const filterFileName = await getFilterFileName(filterUrl);
    const rules = await getFilterRules(filterUrl);
    await createFilterFile(filterFileName, rules);
    await addFilterToProxyConfig(filterFileName);
    const proxy = await runProxyServer();
    await makeQunitPuppeteerTest(testcaseUrl);
    await stopProxyServer(proxy);
    await removeFilterFromProxyConfig(filterFileName);
    await deleteFilterFile(filterFileName);
};

const program = new commander.Command();
program.version('0.0.1');
program
    .option('-t, --testcase-url <url>', 'testcase URL')
    .option('-f, --filter-url <url>', 'filter URL');
program.parse(process.argv);
if (program.testcaseUrl && program.filterUrl) {
    runTestCase(program.testcaseUrl, program.filterUrl);
}
