// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

let brands_names = ['All','1083','adresse','coteleparis','dedicated','loom'];
let favorites = [];

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
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
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
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
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
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

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = (pagination,products) => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;//products.length*(currentPagination.pageCount-1) ; 
  //have to add to the calculation the number of products on the last page)
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination,products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(1, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
  spanNbProducts.innerHTML = currentProducts.count;
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});



// Feature 1 :

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});


//Feature 2


/*
selectBrand.addEventListener('change', event => {
  fetchProducts(1, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render2(currentBrand, currentProducts, currentPagination));
});
*/

selectBrand.addEventListener('change', async(event) => {
  
  var products = await   fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
  setCurrentProducts(products)
  if(event.target.value!='selection')
  {
  var filtered =currentProducts.filter(function(item){return item.brand==event.target.value});
  render(filtered, currentPagination);
  }
  if(event.target.value=='all')
  {
    render(currentProducts, currentPagination);
  }
});


// Feature 3 by recents



let actual = new Date();
selectSort.addEventListener('change', async(event) => {
  var products = await   fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
  setCurrentProducts(products)
  if(event.target.value=="recents")
  {
  var filtered =currentProducts.filter(item => actual-new Date(item.released)<=12096e5);
  render(filtered, currentPagination);
  }
  if(event.target.value=="date-desc")
  {
  var filtered =currentProducts.sort(compareDate);
  render(filtered, currentPagination);
  }
  if(event.target.value=="date-asc")
  {
  var filtered =currentProducts.sort(compareDate2);
  render(filtered, currentPagination);
  }
 });




//Feature 4 by reasonable price


selectSort.addEventListener('change', async(event) => {
  var products = await   fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
  setCurrentProducts(products)
  if(event.target.value=="reasonable")
  {
  var filtered =currentProducts.filter(item => item.price <=50);
  render(filtered, currentPagination);
  }
  if(event.target.value == 'price-asc')
  {
    var filtered =currentProducts.sort(compare);
    render(filtered, currentPagination);
  }
  if(event.target.value == 'price-desc')
  {
    var filtered =currentProducts.sort(compare2);
    render(filtered, currentPagination);
  }
  if(event.target.value == 'selection')
  {
    render(currentProducts, currentPagination);
  }
 });



 //Feature 5 sort by price 


 function compare(a, b) {
  return a.price - b.price;
}
function compare2(a, b) {
  return b.price - a.price;
}



// Feature 6 sort by date 



function compareDate (a,b){
  datea = new Date(a.date)
  dateb = new Date(b.date)
  return datea>dateb ? -1 : datea<dateb ? 1:0

}

function compareDate2 (a,b){
  datea = new Date(a.date)
  dateb = new Date(b.date)
  return dateb>datea ? -1 : dateb<datea ? 1:0

}



//Feature 8

//spanNbProducts.innerHTML= 




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
  var products = await   fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
  setCurrentProducts(products)
  // have to adapt it to the favorite products : have also to adapt the products on the page
  if(event.target.value=="reasonable")
  {
    render(favorites, currentPagination);
  }
});

