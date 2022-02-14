/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimartbrand = require('./sources/montlimartbrand');
const adresseparisbrand = require('./sources/adresseparisbrand');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');


async function sandbox (){//eshop='https://www.dedicatedbrand.com/en/men/all-men?p=') {

try {


    let eshop = 'https://www.dedicatedbrand.com/en/men/news';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products_dedi = await dedicatedbrand.scrape(eshop);
  

    eshop ='https://www.montlimart.com/toute-la-collection.html';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products_mont = await montlimartbrand.scrape(eshop);

    
    eshop ='https://adresse.paris/602-nouveautes';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products_adresse = await adresseparisbrand.scrape(eshop);

    console.log(products_dedi);
    console.log(products_mont);
    console.log(products_adresse);

    const products = products_dedi.concat(products_adresse, products_mont);
    await fs.writeFileSync('products.json', JSON.stringify(products));

    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);



/*
async function sandbox //(eshop='https://www.dedicatedbrand.com/en/men/all-men?p=') {
(eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //for(var i =1;i<)
    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);


*/

