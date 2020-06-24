const puppeteer = require('puppeteer');
const instagram = require('./instagram');


let username = '';
let password = '';

(async() => {

    //await instagram.initialize();
    try {
        await instagram.login(username, password);
        //await instagram.end();
    } catch (e) {
        console.log(e);
    }

    // const browser = await puppeteer.launch({ headless: false });
    // const page = await browser.newPage();
    // await page.goto('https://www.instagram.com/');
    // // await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
    // // await page.click('a[href="/accounts/login/?source=auth_switcher"]');
    // await page.waitFor(100);

    // await page.waitFor('input[name="username"]');
    // await page.type('input[name="username"]', '', { delay: 20 });
    // await page.type('input[name="password"]', '', { delay: 20 });
    // await page.click('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4) > button');

    debugger;

    //await browser.close();
})();