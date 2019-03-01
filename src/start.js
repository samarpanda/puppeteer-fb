const base = require('./base');
const fb = require('./facebook');
const URL = 'https://www.facebook.com';

async function main() {
  const browser = await base.start();
  const page = await base.open(browser, URL);

  const loggedin = await fb.login(page);
  console.log(loggedin);

  // await fb.openMp(page);
  await fb.openPostMp(page);

  await page.screenshot({
    path: 'facebook.png'
  });

  await base.stop(browser);
  return true;
}
main();
