const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.category-products .item')
    .map((i,element) => {
      const name = $(element)
        .find('h2.product-name a')
        .text()
        .trim();
        
      const price = parseInt(
        $(element)
          .find('.price')
          .text()
          .replace(' € ','')

      );
      const link =
        $(element)
          .find('h2.product-name a')
          .attr('href');

      const link_img =
        $(element)
          .find('.product-image img')
          .attr('src');

      return {name, price, link, link_img};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();
      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};