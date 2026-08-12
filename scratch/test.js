const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:3000');
  await page.waitForSelector('button');
  
  console.log("Clicking the first unit...");
  const buttons = await page.$$('button');
  await buttons[0].click(); // Arrival
  
  await new Promise(r => setTimeout(r, 1000));
  console.log("Playing game 1 (read)...");
  // Game 1 is read, should have a Continue button
  let checkBtn = await page.$('button:has-text("Continue")');
  if(!checkBtn) checkBtn = await page.$('button:has-text("Check")');
  if(checkBtn) await checkBtn.click();
  
  await new Promise(r => setTimeout(r, 1000));
  console.log("Playing game 2 (choose)...");
  // Game 2 is choose, options are buttons
  const options = await page.$$('button.border');
  if(options.length > 0) await options[0].click(); // click first option
  let checkBtn2 = await page.$('button:has-text("Check")');
  if(checkBtn2) await checkBtn2.click();
  let contBtn = await page.$('button:has-text("Continue")');
  if(contBtn) await contBtn.click();
  
  await new Promise(r => setTimeout(r, 1000));
  console.log("At game 3...");
  await page.screenshot({ path: 'game3.png' });
  await browser.close();
})();
