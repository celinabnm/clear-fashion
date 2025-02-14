// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'adresse',
  'url': 'https://adresse.paris/'
}
];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);




/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable


var link = "https://www.loom.fr/products/le-t-shirt";
console.log(link);


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var numberProducts = marketplace.length;
console.log(numberProducts);



// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

let brand_names = [];
for (var i =0;i<marketplace.length;i++)
{
  if(!brand_names.includes(marketplace[i].brand))
  {
    brand_names.push(marketplace[i].brand);
  }
}
//brand_unique = new Set(brand_names)
console.log(brand_names);


//or 


let brandsss =[];

marketplace.forEach(product => brandsss.push(product.brand));
unique = new Set(brandsss);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable


//let prices = [];
function compare(a, b) {
  return a.price - b.price;
}
var marketplacesort=marketplace;
marketplacesort.sort(compare);




// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable


var maketplacedate = marketplace;
marketplace.comparedate(function(a,b){
  datea = new Date(a.date)
  dateb = new Date(b.date)
  return datea>dateb ? -1 : datea<dateb ? 1:0

})

marketplacedate.sort(comparedate());

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list


var filter = new Array();
marketplace.forEach(product => { if(product.price>=50 && product.price <=100){filter.push(product)}} );
console.log(filter);


// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

var average = 0.0;

marketplace.forEach(product => {average += product.price});
average /= marketplace.length;
console.log(average);


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

var dict_products = [];
for(var i=0;i<brand_names.length;i++)
{
  products = new Array();
  marketplace.forEach(product=> {if (product.brand == brand_names[i]) { products.push(product)} });
  dict_products[brand_names[i]]= products;
  console.log(products)
}

console.log(dict_products);

for(var i=0;i<dict_products.length;i++)
{
  console.log(dict_products[brand_names[i]].length);
}



// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

function compare_reverse(a, b) {
  return b.price - a.price;
}

let dict_prod_sort=dict_products;
for(var i=0;i<dict_products.length;i++)
{
  liste = dict_prod_sort[brand_names[i]];
  liste = liste.sort(compare_reverse);
  dict_prod_sort[brand_names[i]] = liste;
  console.log(liste);
}


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

function sort_by_date(item)
{
  return item.sort(function(a,b)
  {
    return new Date(a.date)- new Date(b.date);
  });
}

let dict_sorted_date = dict_products;
for(var i=0;i<dict_products.length;i++)
{
  liste = dict_sorted_date[brand_names[i]];
  liste = sort_by_date(liste);
  dict_sorted_date[brand_names[i]] = liste;
  console.log(liste);
}


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products




//must verify this part

let q_values = [];

for(var i=0;i<brand_names.length;i++)
{
  liste = dict_prod_sort[brand_names[i]];
  //console.log(liste)
  var p = liste.length*0.9;
  var b = Math.floor(p);
  console.log(dict_prod_sort[brand_names[b]])
  q_values.push(dict_prod_sort[brand_names[b]]);
}

console.log(q_values);



/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

let new_prod_only= true;
for(var i=0;i<COTELE_PARIS.length;i++)
{
  if(Date()-COTELE_PARIS[i].released>14)
  {
    new_prod_only = false;
  }
}
//COTELE_PARIS.forEach(product => {if(Date()-product.released>14){new_prod_only = false;}});
console.log(new_prod_only);

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

let reasonable= true;
for(var i=0;i<COTELE_PARIS.length;i++)
{
  if(COTELE_PARIS[i].price>=100)
  {
    reasonable = false;
  }
}
console.log(reasonable);


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

var prod ;
COTELE_PARIS.forEach(product => {if(product.uuid=='b56c6d88-749a-5b4c-b571-e5b5c6483131') { prod = produit ; console.log(product);} });


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product


const list_delete = COTELE_PARIS;
for(var i =0;i<COTELE_PARIS.length;i++)
{
  if(COTELE_PARIS[i].uuid=="b56c6d88-749a-5b4c-b571-e5b5c6483131")
  {
    list_delete.splice(i,1);
  }
}
list_delete.forEach(product => console.log(product));



// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
console.log(blueJacket);
console.log(jacket);


// we notice : 
// When modifying jacket, the modifications are also done on bluejacket


blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = Object.assign({}, blueJacket);
//again :
jacket.favorite = true;



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage

window.localStorage.setItem("favorite brands", MY_FAVORITE_BRANDS);

// 2. log the localStorage
console.log(window.localStorage);
