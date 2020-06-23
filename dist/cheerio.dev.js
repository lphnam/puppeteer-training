"use strict";

var request = require('request-promise');

var cheerio = require('cheerio');

(function _callee() {
  var USER_NAME, BASE_URL, response, $, script, script_regex, _JSON$parse, entry_data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          USER_NAME = 'thaikieu888';
          BASE_URL = "https://www.instagram.com/".concat(USER_NAME);
          _context.next = 4;
          return regeneratorRuntime.awrap(request(BASE_URL));

        case 4:
          response = _context.sent;
          $ = cheerio.load(response);
          script = $('script[type="text/javascript"]').eq(3).html();
          script_regex = /window._sharedData = (.+);/g.exec(script);
          _JSON$parse = JSON.parse(script_regex[1]), entry_data = _JSON$parse.entry_data;
          console.log(entry_data);
          debugger;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
})();