const puppeteer = require('puppeteer');

const LOGIN_URL = 'https://www.instagram.com/accounts/login/';
let browser = null;
let page = null;

const instagram = {
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
    login: async(username, password) => {
        browser = await puppeteer.launch({
            args: [
                '--incognito'
            ],
            headless: false
        });

        page = await browser.newPage();
        await page.goto(LOGIN_URL, { waitUntil: "networkidle2" });
        await page.type('input[name="username"]', username, { delay: 20 });
        await page.type('input[name="password"]', password, { delay: 20 });
        await page.click('button[type="submit"]', { delay: 20 });
        await page.waitFor(5000);

        const notifyBtns = await page.$x("//button[contains(text(), 'Not Now')]");

        if (notifyBtns.length > 0) {
            await notifyBtns[0].click();
        } else {
            console.log('Not notify button');
        }

        await page.goto(`https://www.instagram.com/${username}`, { waitUntil: "networkidle2" });
        await page.waitFor(2000);


        const followersBtns = await page.$('#react-root > section > main > div > header > section > ul > li:nth-child(2) > a');
        await followersBtns.evaluate(btn => btn.click())
        await page.waitFor(3000);

        const followersDialog = 'div[role="dialog"] > div > div:nth-child(2)';
        await page.waitForSelector('div[role="dialog"] > div > div:nth-child(2) > ul');
        await scrollDown(followersDialog, page);


        console.log("getting followers");
        const lists1 = await page.$$('div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div:nth-child(2) > div > div > div> a');
        const avatarPath = [
            'div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div > div > a > img',
            'div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div > div > span > img'
        ];

        const picc1 = await avatarPath.reduce(async(accPro, path) => {
            const acc = await accPro;
            const arr = await page.$$eval(path, res => {
                return res.map(pic => {
                    const alt = pic.getAttribute('alt');
                    const word = alt.split(/([,])/g);
                    return {
                        username: word[0],
                        avatar: pic.getAttribute('src')
                    }
                });
            });

            return acc.concat([...arr]);
        }, Promise.resolve([]));

        const followers = await Promise.all(lists1.map(async item => {
            const username = await (await item.getProperty('innerText')).jsonValue();
            const pic = picc1.find(p => p.username === username || { avatar: "" });
            return {
                avatar: await pic.avatar,
                username
            }
        }));

        const closeBtn = await page.$('div[role="dialog"] > div > div > div > div:nth-child(3) > button');
        await closeBtn.evaluate(btn => btn.click());


        const followingBtn = await page.$('div[id="react-root"] > section > main > div > header > section > ul > li:nth-child(3) > a');
        await followingBtn.evaluate(btn => btn.click());
        await page.waitFor(3000);

        const followingDialog = 'div[role="dialog"] > div > div:nth-child(3)';
        await page.waitForSelector('div[role="dialog"] > div > div:nth-child(3) > ul');

        await scrollDown(followingDialog, page);

        console.log('get following....');

        const list2 = await page.$$('div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div:nth-child(2) > div > div > div > a');
        await page.waitForSelector('div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > a > img');

        const avatarPath2 = [
            'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > a > img',
            'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > span > img'
        ];
        const picc2 = await avatarPath2.reduce(async(accPro, path) => {
            const acc = await accPro;
            const arr = await page.$$eval(path, res => {
                return res.map(pic => {
                    const alt = pic.getAttribute('alt');
                    const word = alt.split(/([,])/g);
                    return {
                        username: word[0],
                        avatar: pic.getAttribute('src')
                    }
                });
            });

            return acc.concat([...arr]);
        }, Promise.resolve([]));

        const following = await Promise.all(list2.map(async item => {
            const username = await (await item.getProperty('innerText')).jsonValue();
            const pic = picc2.find(p => p.username === username || { avatar: "" });
            return {
                avatar: await pic.avatar,
                username
            }
        }));


        const followerCount = followers.length;
        const followingCount = following.length;

        console.log(`Follower:${followerCount}`);
        console.log(`Following:${followingCount}`);

        const notFollowingYou = following.filter(item => {
            return !followers.find(f => f.username === item.username)
        });
        const notFollowingThem = followers.filter(item => {
            return !following.find(f => f.username === item.username)
        });

        // await browser.close();

        const data_total = {
            followerCount,
            followingCount,
            //notFollowingYou,
            //notFollowingThem,
            followers,
            following
        };
        debugger;
        return data_total;

    },
    end: async() => {
        await browser.close();
    }
};


async function scrollDown(selector, page) {
    await page.evaluate(async selector => {
        const section = document.querySelector(selector);
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
            const timer = setInterval(() => {
                var scrollHeight = section.scrollHeight;
                section.scrollTop = 100000000;
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }

            });
        }, 100);
    }, selector);
};

module.exports = instagram;