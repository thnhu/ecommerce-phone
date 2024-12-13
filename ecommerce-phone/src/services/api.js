const puppeteer = require('puppeteer');

const scrapeProducts = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.thegioididong.com/dtdd');

  const products = await page.evaluate(() => {
    // Adjust selectors based on the website's structure
    return Array.from(document.querySelectorAll('.product')).map(product => ({
      title: product.querySelector('.product-title').textContent.trim(),
      price: product.querySelector('.product-price').textContent.trim(),
      image: product.querySelector('.product-image img').src,
    }));
  });

  console.log(products);
  await browser.close();
};

scrapeProducts();
