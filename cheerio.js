const request = require('request-promise');
const cheerio = require('cheerio');

(async() => {
    const USER_NAME = 'thaikieu888';
    const BASE_URL = `https://www.instagram.com/${USER_NAME}`;

    let response = await request(BASE_URL);

    let $ = cheerio.load(response);
    let script = $('script[type="text/javascript"]').eq(3).html();

    let script_regex = /window._sharedData = (.+);/g.exec(script);

    let { entry_data } = JSON.parse(script_regex[1]);

    console.log(entry_data);

    debugger;
})()