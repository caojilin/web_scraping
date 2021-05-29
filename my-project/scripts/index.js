const puppeteer = require('puppeteer');
const axios = require('axios');
const productURL = 'https://www.amazon.com/gp/product/B088S3V3R4?pf_rd_r=M60SV4CXCP6BQFKPX381&pf_rd_p=5ae2c7f8-e0c6-4f35-9071-dc3240e894a8&pd_rd_r=107ab7d9-2131-4b68-aff0-f5dc6e3a34cc&pd_rd_w=IGO9S&pd_rd_wg=N2AXH&ref_=pd_gw_unk'


async function main(){
  /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  /* Go to the IMDB Movie page and wait for it to load */
  await page.goto(productURL, { waitUntil: 'networkidle0' });

  /* Waiting for a specific part of the website to appear on screen */
  await page.waitForSelector('div[class="imgTagWrapper"]');


  /* Run javascript inside of the page */
  let data_scraped = await page.evaluate(() => {

    let title = document.querySelector('#productTitle').innerText.replace(/\s\s+/g, '');
    let price = document.querySelector('#priceblock_ourprice').innerText;
    //works
    let image = document.querySelector('#landingImage').getAttribute('data-old-hires');

    /* Returning an object filled with the scraped data */
    return {
      title,
      price,
      image
    }

  });

  /* Outputting what we scraped */
  console.log(data_scraped['title']);

  // Send a POST request
  axios({
    method: 'post',
    url: 'http://localhost:1337/products',
    data: {
      'title': data_scraped["title"],
      'price': data_scraped["price"],
      'image': data_scraped["image"]
    }
  });

  await browser.close();
};

main();

