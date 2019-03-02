const path = require('path');
const CRED = require('./creds');
const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
};
const ID = {
  login: '#email',
  pass: '#pass'
};

exports.login = async function (page) {
  await page.type(ID.login, CRED.user);
  await page.type(ID.pass, CRED.pass);
  // await sleep(500);
  await page.click("#loginbutton")
  await page.waitForNavigation();
  return true;
};

exports.openPostMp = async function(page) {
  const URL = 'https://m.facebook.com/marketplace/selling/item/';
  
  await page.goto(URL, {waitUntil: 'domcontentloaded'});

  const titleSelector = '#u_0_1u';
  await page.waitForSelector(titleSelector).then(() => {
    // console.log('title selector available');
  });
  const titleInput = await page.$(titleSelector);
  const titleTxt = `White 2010 BMW 3 Series 320d - 40,000 kms driven in Thanisandra Road`
  await titleInput.type(titleTxt);

  const priceSelector = '#u_0_1v';
  const priceInput = await page.$(priceSelector);
  await priceInput.type('1000000');

  const descSelector = '#u_0_1y';
  const descInput = await page.$(descSelector);
  const desTxt = `97 Checkpoints have been inspected on all Quikr Assured Cars.
  Here is BMW 3 Series 2010 well maintained Car for sale. This Diesel car has been driven around 35000 KMs.
  We offer Hassle-free Paper Transfer & RTO Services on every Quikr Assured car. We can also offer great EMI options to keep the car pocket-friendly.
  Contact us to know more.
  To explore and test drive a wide range of cars, please visit our Quikr Car Yards at:
  La Prominent Cars (Nagarbhavi)
  8 Block, Govindaraja Nagar Ward,Nagarbhavi,Bangalore`;
  await descInput.type(desTxt);

  const catSelector = '#u_0_1w';
  const catInput = await page.$(catSelector);
  await catInput.click();

  const catModalSelector = '#modalDialogView > div > div a';
  await page.waitForSelector(catModalSelector, {visible: true});
  const list = await page.$$(catModalSelector);
  list[1].click();// Category selection mapping

  const locationSelector = '#u_0_13 input';
  await page.waitForSelector(locationSelector, {visible: true});
  const locationInput = await page.$(locationSelector);
  locationInput.click();

  const locationSearchSelector = '#modalDialogView input';
  const locaSearchInput = await page.waitForSelector(locationSearchSelector, {visible: true});
  await locaSearchInput.type('bangalore');//Select city

  const typeHeadSelector = '#nt-typeahead-results-view div > div > div';
  const typeHeadInput = await page.waitForSelector(typeHeadSelector, {visible: true});
  await typeHeadInput.click();

  const filePath = path.relative(process.cwd(), __dirname +'/../'+ 'assets/1.jpg');
  console.log(filePath);
  const input = await page.$("input[type='file']");
  await input.uploadFile(filePath);

  const imgPreviewSelector = '._5cqb img';
  await page.waitForSelector(imgPreviewSelector);

  const submitBtnSelector = '#u_0_1h';
  const submitBtn = await page.waitForSelector(submitBtnSelector, {visible: true});
  await submitBtn.click();
}

/**
 * Not using currently
 */
exports.openMp = async function (page) {

  const selector = '#navItem_1606854132932955 > a';
  page.waitForSelector(selector);
  const marketplaceBtn = await page.$(selector);
  console.log(marketplaceBtn);
  await page.click(marketplaceBtn);
  await page.waitForNavigation();
}

