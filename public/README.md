# Test cases

All kinds of test cases for AdGuard products.

### How to use test cases

Open https://testcases.adguard.com and follow the instructions there.

### Development

#### How to test on the local machine

* Run `yarn install`

* Add to the `/etc/hosts` next line
    `127.0.0.1 local.testcases.adguard.com`

* Run the local server
    `yarn watch`
It will open `http://local.testcases.adguard.com:3000/` in your browser
and test code changes will be dynamically updated there

> **Please note, that AdGuard for Mac does not filter localhost connections by default!**.

#### Test on surge.sh

```
yarn global add surge
surge --domain=your-dev-domain.surge.sh
```

Then simply open `your-dev-domain.surge.sh` and see what you've got there.

> **Important:** for test cases to work on surge.sh subdomains, please add this domain to the filtering rules.