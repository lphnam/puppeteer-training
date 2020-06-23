"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var puppeteer = require('puppeteer');

var LOGIN_URL = 'https://www.instagram.com/accounts/login/';
var browser = null;
var page = null;
var instagram = {
  // initialize: async() => {
  //     browser = await puppeteer.launch({
  //         args: [
  //             '--incognito'
  //         ],
  //         headless: false
  //     });
  //     page = await browser.newPage();
  //     await page.goto(LOGIN_URL, { waitUntil: "networkidle2" });
  //     await browser.close();
  // },
  login: function login(username, password) {
    var notifyBtns, followersBtns, followersDialog, lists1, avatarPath, picc1, followers, closeBtn, followingBtn, followingDialog, list2, avatarPath2, picc2, following, followerCount, followingCount, notFollowingYou, notFollowingThem, data_total;
    return regeneratorRuntime.async(function login$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(puppeteer.launch({
              args: ['--incognito'],
              headless: false
            }));

          case 2:
            browser = _context5.sent;
            _context5.next = 5;
            return regeneratorRuntime.awrap(browser.newPage());

          case 5:
            page = _context5.sent;
            _context5.next = 8;
            return regeneratorRuntime.awrap(page["goto"](LOGIN_URL, {
              waitUntil: "networkidle2"
            }));

          case 8:
            _context5.next = 10;
            return regeneratorRuntime.awrap(page.type('input[name="username"]', username, {
              delay: 20
            }));

          case 10:
            _context5.next = 12;
            return regeneratorRuntime.awrap(page.type('input[name="password"]', password, {
              delay: 20
            }));

          case 12:
            _context5.next = 14;
            return regeneratorRuntime.awrap(page.click('button[type="submit"]', {
              delay: 20
            }));

          case 14:
            _context5.next = 16;
            return regeneratorRuntime.awrap(page.waitFor(5000));

          case 16:
            _context5.next = 18;
            return regeneratorRuntime.awrap(page.$x("//button[contains(text(), 'Not Now')]"));

          case 18:
            notifyBtns = _context5.sent;

            if (!(notifyBtns.length > 0)) {
              _context5.next = 24;
              break;
            }

            _context5.next = 22;
            return regeneratorRuntime.awrap(notifyBtns[0].click());

          case 22:
            _context5.next = 25;
            break;

          case 24:
            console.log('Not notify button');

          case 25:
            _context5.next = 27;
            return regeneratorRuntime.awrap(page["goto"]("https://www.instagram.com/".concat(username), {
              waitUntil: "networkidle2"
            }));

          case 27:
            _context5.next = 29;
            return regeneratorRuntime.awrap(page.waitFor(2000));

          case 29:
            _context5.next = 31;
            return regeneratorRuntime.awrap(page.$('#react-root > section > main > div > header > section > ul > li:nth-child(2) > a'));

          case 31:
            followersBtns = _context5.sent;
            _context5.next = 34;
            return regeneratorRuntime.awrap(followersBtns.evaluate(function (btn) {
              return btn.click();
            }));

          case 34:
            _context5.next = 36;
            return regeneratorRuntime.awrap(page.waitFor(3000));

          case 36:
            followersDialog = 'div[role="dialog"] > div > div:nth-child(2)';
            _context5.next = 39;
            return regeneratorRuntime.awrap(page.waitForSelector('div[role="dialog"] > div > div:nth-child(2) > ul'));

          case 39:
            _context5.next = 41;
            return regeneratorRuntime.awrap(scrollDown(followersDialog, page));

          case 41:
            console.log("getting followers");
            _context5.next = 44;
            return regeneratorRuntime.awrap(page.$$('div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div:nth-child(2) > div > div > div> a'));

          case 44:
            lists1 = _context5.sent;
            avatarPath = ['div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div > div > a > img', 'div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div > div > span > img'];
            _context5.next = 48;
            return regeneratorRuntime.awrap(avatarPath.reduce(function _callee(accPro, path) {
              var acc, arr;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(accPro);

                    case 2:
                      acc = _context.sent;
                      _context.next = 5;
                      return regeneratorRuntime.awrap(page.$$eval(path, function (res) {
                        return res.map(function (pic) {
                          var alt = pic.getAttribute('alt');
                          var word = alt.split(/([,])/g);
                          return {
                            username: word[0],
                            avatar: pic.getAttribute('src')
                          };
                        });
                      }));

                    case 5:
                      arr = _context.sent;
                      return _context.abrupt("return", acc.concat(_toConsumableArray(arr)));

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }, Promise.resolve([])));

          case 48:
            picc1 = _context5.sent;
            _context5.next = 51;
            return regeneratorRuntime.awrap(Promise.all(lists1.map(function _callee2(item) {
              var username, pic;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.t0 = regeneratorRuntime;
                      _context2.next = 3;
                      return regeneratorRuntime.awrap(item.getProperty('innerText'));

                    case 3:
                      _context2.t1 = _context2.sent.jsonValue();
                      _context2.next = 6;
                      return _context2.t0.awrap.call(_context2.t0, _context2.t1);

                    case 6:
                      username = _context2.sent;
                      pic = picc1.find(function (p) {
                        return p.username === username || {
                          avatar: ""
                        };
                      });
                      _context2.next = 10;
                      return regeneratorRuntime.awrap(pic.avatar);

                    case 10:
                      _context2.t2 = _context2.sent;
                      _context2.t3 = username;
                      return _context2.abrupt("return", {
                        avatar: _context2.t2,
                        username: _context2.t3
                      });

                    case 13:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            })));

          case 51:
            followers = _context5.sent;
            _context5.next = 54;
            return regeneratorRuntime.awrap(page.$('div[role="dialog"] > div > div > div > div:nth-child(3) > button'));

          case 54:
            closeBtn = _context5.sent;
            _context5.next = 57;
            return regeneratorRuntime.awrap(closeBtn.evaluate(function (btn) {
              return btn.click();
            }));

          case 57:
            _context5.next = 59;
            return regeneratorRuntime.awrap(page.$('div[id="react-root"] > section > main > div > header > section > ul > li:nth-child(3) > a'));

          case 59:
            followingBtn = _context5.sent;
            _context5.next = 62;
            return regeneratorRuntime.awrap(followingBtn.evaluate(function (btn) {
              return btn.click();
            }));

          case 62:
            _context5.next = 64;
            return regeneratorRuntime.awrap(page.waitFor(3000));

          case 64:
            followingDialog = 'div[role="dialog"] > div > div:nth-child(3)';
            _context5.next = 67;
            return regeneratorRuntime.awrap(page.waitForSelector('div[role="dialog"] > div > div:nth-child(3) > ul'));

          case 67:
            _context5.next = 69;
            return regeneratorRuntime.awrap(scrollDown(followingDialog, page));

          case 69:
            console.log('get following....');
            _context5.next = 72;
            return regeneratorRuntime.awrap(page.$$('div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div:nth-child(2) > div > div > div > a'));

          case 72:
            list2 = _context5.sent;
            _context5.next = 75;
            return regeneratorRuntime.awrap(page.waitForSelector('div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > a > img'));

          case 75:
            avatarPath2 = ['div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > a > img', 'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > span > img'];
            _context5.next = 78;
            return regeneratorRuntime.awrap(avatarPath2.reduce(function _callee3(accPro, path) {
              var acc, arr;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(accPro);

                    case 2:
                      acc = _context3.sent;
                      _context3.next = 5;
                      return regeneratorRuntime.awrap(page.$$eval(path, function (res) {
                        return res.map(function (pic) {
                          var alt = pic.getAttribute('alt');
                          var word = alt.split(/([,])/g);
                          return {
                            username: word[0],
                            avatar: pic.getAttribute('src')
                          };
                        });
                      }));

                    case 5:
                      arr = _context3.sent;
                      return _context3.abrupt("return", acc.concat(_toConsumableArray(arr)));

                    case 7:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            }, Promise.resolve([])));

          case 78:
            picc2 = _context5.sent;
            _context5.next = 81;
            return regeneratorRuntime.awrap(Promise.all(list2.map(function _callee4(item) {
              var username, pic;
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.t0 = regeneratorRuntime;
                      _context4.next = 3;
                      return regeneratorRuntime.awrap(item.getProperty('innerText'));

                    case 3:
                      _context4.t1 = _context4.sent.jsonValue();
                      _context4.next = 6;
                      return _context4.t0.awrap.call(_context4.t0, _context4.t1);

                    case 6:
                      username = _context4.sent;
                      pic = picc2.find(function (p) {
                        return p.username === username || {
                          avatar: ""
                        };
                      });
                      _context4.next = 10;
                      return regeneratorRuntime.awrap(pic.avatar);

                    case 10:
                      _context4.t2 = _context4.sent;
                      _context4.t3 = username;
                      return _context4.abrupt("return", {
                        avatar: _context4.t2,
                        username: _context4.t3
                      });

                    case 13:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            })));

          case 81:
            following = _context5.sent;
            followerCount = followers.length;
            followingCount = following.length;
            console.log("Follower:".concat(followerCount));
            console.log("Following:".concat(followingCount));
            notFollowingYou = following.filter(function (item) {
              return !followers.find(function (f) {
                return f.username === item.username;
              });
            });
            notFollowingThem = followers.filter(function (item) {
              return !following.find(function (f) {
                return f.username === item.username;
              });
            }); // await browser.close();

            data_total = {
              followerCount: followerCount,
              followingCount: followingCount,
              //notFollowingYou,
              //notFollowingThem,
              followers: followers,
              following: following
            };
            debugger;
            return _context5.abrupt("return", data_total);

          case 91:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  end: function end() {
    return regeneratorRuntime.async(function end$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(browser.close());

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  }
};

function scrollDown(selector, page) {
  return regeneratorRuntime.async(function scrollDown$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(page.evaluate(function _callee5(selector) {
            var section;
            return regeneratorRuntime.async(function _callee5$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    section = document.querySelector(selector);
                    _context7.next = 3;
                    return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                      var totalHeight = 0;
                      var distance = 100;
                      var timer = setInterval(function () {
                        var scrollHeight = section.scrollHeight;
                        section.scrollTop = 100000000;
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight) {
                          clearInterval(timer);
                          resolve();
                        }
                      });
                    }, 100));

                  case 3:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          }, selector));

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
}

;
module.exports = instagram;