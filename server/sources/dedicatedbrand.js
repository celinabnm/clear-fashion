const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { stringify } = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */


/*
const parse = data => {
  const $ = cheerio.load(data);

  return $('filter.categories')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {name, price};
    })
    .get();
};
*/


const parse = data => {
  const $ = cheerio.load(data);
  
  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );
      const link = 'https://www.dedicatedbrand.com' +
        $(element)
          .find('.productList-link')
          .attr('href')
      ;
      const imagelink = $(element)
        .find('.productList-image img')
        .attr('data-src')//use data-src
      ;
      return {name, price,link, imagelink};
    })
    .get();
};






const parse2 = data => {
  const $ = cheerio.load(data);
  return $('.paging-showing')
    .map((i, element) => {
      const nbTotal = parseInt($(element)
        .find('.js-allItems-total div')
        .text());
      const nbCurrent = parseInt($(element)
        .find('.js-items-current div')
        .text());
      
      return {nbTotal,nbCurrent};
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
      //console.log(body);
      result = parse(body);
      /*
      const productsNb = new String(parse2(body));
      console.log(productsNb + ' : productsNB');

      
      const response2 = await fetch('https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fall-men');
      const body2 = await response2.text();
      */

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
