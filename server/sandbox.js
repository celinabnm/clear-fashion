/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimartbrand = require('./sources/montlimartbrand');
const adresseparisbrand = require('./sources/adresseparisbrand');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');


async function sandbox (){//eshop='https://www.dedicatedbrand.com/en/men/all-men?p=') {
//connecting to the database
  const {MongoClient} = require('mongodb');
  const MONGODB_URI = '';
  const MONGODB_DB_NAME = 'ClearFashion';
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  console.log("successfully initiliazed")
//

try {

    let eshop ="";
    let products_dedi_total = [];
    for(var i = 1;i<=11;i++)
    {
      eshop ='https://www.dedicatedbrand.com/en/men/all-men?p='+i.toString();
      console.log(`🕵️‍♀️  browsing ${eshop} source`);
      const products_dedi = await dedicatedbrand.scrape(eshop);
      products_dedi_total = products_dedi_total.concat(products_dedi);
    }

    
    /*
    let eshop = 'https://www.dedicatedbrand.com/en/men/news';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products_dedi = await dedicatedbrand.scrape(eshop);
    */
  
    let products_mont_total=[];
    for(var i =1;i<=7;i++)
    {
      eshop ='https://www.montlimart.com/toute-la-collection.html?p='+i.toString();
      console.log(`🕵️‍♀️  browsing ${eshop} source`);
      const products_mont = await montlimartbrand.scrape(eshop);
      products_mont_total = products_mont_total.concat(products_mont);
    }

    /*
    eshop ='https://www.montlimart.com/toute-la-collection.html';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products_mont = await montlimartbrand.scrape(eshop);
    */

    
    let products_adresse_total = [];
    for(var i = 1;i<=2;i++)
    {
      eshop ='https://adresse.paris/630-toute-la-collection?p='+i.toString();
      console.log(`🕵️‍♀️  browsing ${eshop} source`);
      const products_adresse = await adresseparisbrand.scrape(eshop);
      products_adresse_total = products_adresse_total.concat(products_adresse);
    }


    /*
    eshop ='https://adresse.paris/602-nouveautes';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products_adresse = await adresseparisbrand.scrape(eshop);
    */
    
    console.log(products_dedi_total);
    console.log(products_mont_total);
    console.log(products_adresse_total);

    //const products = products_dedi.concat(products_adresse, products_mont);
    const products = products_dedi_total.concat(products_adresse_total, products_mont_total);

    let final = [];
    for(let i =0;i<products.length;i++)
    {
      if(!isNaN(parseInt(products[i].price)))
      {
        console.log(products[i].price.toString());
        final.push(products[i]);
      }
    }

    
    await fs.writeFileSync('products.json', JSON.stringify(final));

    
    console.log('done');

    const collection = db.collection('first_file_scrapping');
    const result = collection.insertMany(final);
    console.log(result);

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);






//previous version 

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

