// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const order_products = document.querySelector('#sort-select');
const max_price_products = document.querySelector('#price_input');
let nbrProduct = 12;
let price = 100000000;
let brand ;
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = (products) => {
  currentProducts = products;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */


const fetchProducts = async (limit = nbrProduct, brand ,price) => {
  let url= 'https://test2-nine-iota.vercel.app/product/search?'
  if(typeof brand !== 'undefined'){
      url += `&brand=${brand}`
    }
    if (typeof price !== 'undefined'){
      url += `&price=${price}`
    }
    if(typeof limit !== 'undefined'){
    url += `&limit=${limit}`
    }

  try {
    //end here
    const response = await fetch(url);
    
    const body = await response.json();
    console.log(body)
    return body
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  console.log(products)
  const template = products
    .map(product => {
      if (product.photo != null){
        if(product.photo.includes('loom')){
        product.photo = product.photo.replace('//','https:');
        console.log(product.photo)
        }
      }
      
      return `
      <div class="product" id='test' class='border'>
        <span style="text-transform:uppercase;font-weight:bold">${product.brand}</span>
        <br>
        <a href="${product.link}">${product.name}</a>
        <br>
        <span>${product.price}€</span>
        <br>
        <img src=${product.photo} alt="Italian Trulli">
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  nbrProduct = parseInt(event.target.value);
  const products = await fetchProducts(nbrProduct,brand,price);
  
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectBrand.addEventListener('change', async (event) => {
  brand = event.target.value
  let products
  
  if(brand !== 'loom' && brand !== "dedicated"){
    const products = await fetchProducts(nbrProduct)
  }
  else{
    products = await fetchProducts(nbrProduct,event.target.value,price)
    
  }
  

  
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

max_price_products.addEventListener('change', async (event) => {
  price = event.target.value
  const products = await fetchProducts(nbrProduct,brand,price);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});






document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

//Feature 1

function test({a, b, c}){
  console.log(a);
  console.log(b);
  console.log(c);
}

test({a:1,b:2,c:3})

const condition = 1==2

const tern = (condition ? "true" : "false")