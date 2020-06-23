const puppeteer = require('puppeteer');


function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({devtools: true});
            const page = await browser.newPage();

            page.on('console', msg => {
		        const message_text = msg.text();
		        if (message_text === "Failed to load resource: xxxxxxx") {
		            return;
		        }
		        return console.log(`Evaluate: ${msg.text()}`);
		    });

            await page.goto("https://tiki.vn/thuc-pham-tuoi-song/c44792?src=header_tikingon&_lc=Vk4wMzkwMDYwMDY=");
            await page.waitFor(3000);
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('.product-item');
                items.forEach((item) => {
                	console.log(item);
                	debugger;
                    results.push({
                        url:  item.getAttribute('href'),
                        //text: item.innerText,
                    });
                });
                return results;
            });
            
            //browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);




// let scrape = async () => {
// 	const browser = await puppeteer.launch({userDataDir: './data',});
// 	const page = await browser.newPage();
// 	await page.goto('https://tiki.vn/thuc-pham-tuoi-song/c44792?src=header_tikingon&_lc=Vk4wMzkwMDYwMDY=');

// 	await page.waitFor(3000);

// 	let result = await page.evaluate(() => {
// 		let results = []
// 		let items = document.querySelectorAll('.product-item');
		
// 		_.forEach(items, function(item) {
// 				console.log(item);
// 		})
// 		// items.forEach((item) => {
// 		// 	console.log(item);
//   //           results.push({
//   //               url:  item.getAttribute('href'),
//   //               //text: item.innerText,
//   //           });
//   //       });

//         return results;
// 	});

// 	//browser.close();
//     return result;
// }

// scrape().then((value) => {
//     console.log(value);
// });