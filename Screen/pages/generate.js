const puppeteer = require('puppeteer');
const jimp = require('jimp');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  var pages = [121,145];
  // Set screen size
  await page.setViewport({width: 272, height: 480});

  for(var i=0; i<pages.length; i++) {
    await page.goto('http://localhost:8000/'+pages[i]+'.html');
    var path = './generated/'+pages[i];
    await page.screenshot({ path: path+'.png' });
    var img = await jimp.read(path+'.png');
    await img.write(path+'.bmp');
  }
  await page.waitForTimeout(1000);
  await browser.close();
})();