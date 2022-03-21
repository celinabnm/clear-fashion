const dedicatedbrand = require('./sites/dedicatedbrand');
const montlimart = require('./sites/montlimartbrand');
const adresseparis = require('./sites/adresseparisbrand');
const loom = require('./sites/loom');
const db = require('./db');

async function sandbox () {
  try {
    let products = [];
    

    let eshop ="";
    let products_dedi_total = [];

    console.log(`🕵️‍♀️  browsing 11 pages with for dedicated`);
    for(var i = 1;i<=11;i++)
    {
      eshop ='https://www.dedicatedbrand.com/en/men/all-men?p='+i.toString();
      const products_dedi = await dedicatedbrand.scrape(eshop);
      products_dedi_total = products_dedi_total.concat(products_dedi);
    }
    console.log(`👕 ${products_dedi_total.length} products found for dedicated`);
    products.push(products_dedi_total);



    let products_mont_total=[];
    console.log(`🕵️‍♀️  browsing 7 pages with for montlimart`);
    for(var i =1;i<=7;i++)
    {
      eshop ='https://www.montlimart.com/toute-la-collection.html?p='+i.toString();
      console.log(eshop);
      const products_mont = await montlimart.scrape(eshop);
      products_mont_total = products_mont_total.concat(products_mont);
      console.log(products_mont_total);
    }
    console.log(`👕 ${products_mont_total.length} products found for montlimart`);
    products.push(products_mont_total);

    
    let products_adresse_total = [];
    console.log(`🕵️‍♀️  browsing 2 pages with for adresseparis`);
    for(var i = 1;i<=2;i++)
    {
      eshop ='https://adresse.paris/630-toute-la-collection?p='+i.toString();
      console.log(eshop);
      const products_adresse = await adresseparis.scrape(eshop);
      products_adresse_total = products_adresse_total.concat(products_adresse);
      console.log(products_adresse_total);
    }
    console.log(`👕 ${products_adresse_total.length} products found for adresseparis`);
    products.push(products_adresse_total);
    

    // Way 1 with for of: we scrape page by page
    
    console.log('\n');
    /*
    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

    const promises = pages.map(page => loom.scrape(page));
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

    console.log(results);
    console.log(results.flat());

    products.push(results.flat());
    products = products.flat();
    */
    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    // verif
    console.log('💽  Find dedicated products only');

    const dedicatedonly = await db.find({'brand': 'dedicated'});

    console.log(`👕 ${dedicatedonly.length} total of products found for dedicated`);
    console.log(dedicatedonly);

    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();