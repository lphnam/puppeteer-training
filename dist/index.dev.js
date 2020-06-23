"use strict";

var puppeteer = require('puppeteer');

var instagram = require('./instagram');

var username = 'phucthinhngo';
var password = '!@#456';

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(instagram.login(username, password));

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 8:
          // const browser = await puppeteer.launch({ headless: false });
          // const page = await browser.newPage();
          // await page.goto('https://www.instagram.com/');
          // // await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
          // // await page.click('a[href="/accounts/login/?source=auth_switcher"]');
          // await page.waitFor(100);
          // await page.waitFor('input[name="username"]');
          // await page.type('input[name="username"]', 'phucthinhngo', { delay: 20 });
          // await page.type('input[name="password"]', '!@#456', { delay: 20 });
          // await page.click('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4) > button');
          debugger; //await browser.close();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
})();