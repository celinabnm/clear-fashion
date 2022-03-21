const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .attr('title');
        
      const price = parseInt(
        $(element)
          .find('.price.product-price')
          .text()
          .replace(' € ','')
      );
      const link = $(element)
        .find('.product-name')
        .attr('href');
      const link_img = $(element)
        .find('.product_img_link img')
        .attr('src');

      return {'brand': 'adresseparis',name, price, link, link_img, '_id': uuidv5(link, uuidv5.URL)};
    })
    .get();
};

/*
const parseNb = info => {
const $ = cheerio.load(info);

  return $('div .input').attr('value');

} */

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
