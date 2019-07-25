# Test cases

All kinds of test cases for AdGuard products.

### How to use test cases

Open https://testcases.adguard.com and follow the instructions there.

### Development

#### How to test on the local machine

* Run `yarn install`

* Add to the `/etc/hosts` next line
    `127.0.0.1 testcases.adguard.com`

* Run the local server
    `sudo yarn serve`
    
* Open `http://testcases.adguard.com` in your browser

> **Please note, that AdGuard for Mac does not filter localhost connections by default!**.

#### Test on surge.sh

```
npm install --global surge
surge --domain=your-dev-domain.surge.sh
```

Then simply open `your-dev-domain.surge.sh` and see what you've got there.

> **Important:** for test cases to work on surge.sh subdomains, please add this domain to the filtering rules.