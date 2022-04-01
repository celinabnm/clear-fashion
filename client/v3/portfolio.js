// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let nbrProduct =12;

let brands_names = ['All','dedicated','loom'];
let favorites = [];

// instantiate the selectors
const selectShow = document.querySelector('#show-select');

const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const selectFavorite = document.querySelector('#favorite_prod');
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result}) => {
  currentProducts = result;
};

/**
 * Fetch products from api
 * @return {Object}
 */


/*
const fetchProducts = async () => {
  try {
    let response = await fetch(
      `https://clear-fashion-final.vercel.app/product/search?brand=dedicated`
    );
    response+= await fetch(
      `https://clear-fashion-final.vercel.app/product/search?brand=loom`
    );

    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts};
  }
};

*/



const fetchProducts = async (limit = nbrProduct, brand ,price) => {
  let url= 'https://clear-fashion-final.vercel.app/product/search?'
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
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}€</span>
        <img src="${product.photo}">${product.photo}</img>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/*

/**
 * Render page selector
 * @param  {Object} pagination
 
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

*/

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = (products) => {

  spanNbProducts.innerHTML = count;//products.length*(currentPagination.pageCount-1) ; 
  //have to add to the calculation the number of products on the last page)
};

const render = (products) => {
  renderProducts(products);
  renderIndicators(products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */

/*
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});*/
/*
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts);
});
*/
selectShow.addEventListener('change', async (event) => {
  nbrProduct = parseInt(event.target.value);
  const products = await fetchProducts(nbrProduct,brand,price);
  
  setCurrentProducts(products);
  render(currentProducts);
});

/*
selectBrand.addEventListener('change', async(event) => {
  
  var products = await   fetchProducts()
  setCurrentProducts(products)
  if(event.target.value!='selection')
  {
  var filtered =currentProducts.filter(function(item){return item.brand==event.target.value});
  render(filtered);
  }
  if(event.target.value=='all')
  {
    render(currentProducts);
  }
});
*/

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
  render(currentProducts);
});
// Feature 3 by recents




//Feature 4 by reasonable price


selectSort.addEventListener('change', async(event) => {
  var products = await   fetchProducts()
  setCurrentProducts(products)
  if(event.target.value=="reasonable")
  {
  var filtered =currentProducts.filter(item => item.price <=50);
  render(filtered);
  }
  if(event.target.value == 'price-asc')
  {
    var filtered =currentProducts.sort(compare);
    render(filtered);
  }
  if(event.target.value == 'price-desc')
  {
    var filtered =currentProducts.sort(compare2);
    render(filtered);
  }
  if(event.target.value == 'selection')
  {
    render(currentProducts);
  }
 });



 //Feature 5 sort by price 


 function compare(a, b) {
  return a.price - b.price;
}
function compare2(a, b) {
  return b.price - a.price;
}




//Feature 10 :

function pvalues(products,q){
  a= product.length*q /100;
  b = Math.floor(a);
  val = currentProducts.sort(compare)[b];
  return val
}


//Have to change the value displayed by the indicators



//Feature 11 : 






//Feature 12 :




//Feature 13 : favorite 


function favorite(product){
  favorites.push(product);
  // how to keep the favorite list ?


  alert('The product was added to your favorites !');
}

// Feature 14 : filter by favorite 
//utiliser le localstorage

selectSort.addEventListener('change', async(event) => {
  var products = await   fetchProducts()
  setCurrentProducts(products)
  // have to adapt it to the favorite products : have also to adapt the products on the page
  if(event.target.value=="reasonable")
  {
    render(favorites);
  }
});

