const productsList = document.querySelector('.productsList');
const itemsPerPage = document.querySelector('.perPage');
const myCarousel = document.querySelector('#myCarousel');
const sortByEl = document.querySelector('.sortBy');
const filterItems = document.querySelector('.filterByType');
const searchBar = document.querySelector('.SearchInput');

console.log(searchBar);

let productsArray = [];
let items = 5;
let option;
let searchItem;
let filteredArray = [];

const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false
})



fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(data => {
    productsArray = data;
    console.log(productsArray);
    showItems(items, productsArray);
  });

  
  
  itemsPerPage.addEventListener('change', e => {
    items = Number(e.target.value);
    console.log(items);
    showItems(items, productsArray);
      })

  const showItems = (items, array) => {
    productsList.innerHTML = '';
    let numberOfItems = (array.length < items) ? array.length : items;
    console.log(array);
    console.log('item in func',items);
    for (let i=0; i<numberOfItems; i++) {
       productsList.innerHTML += `
        <div class="card m-4">
          <div class="text-center">
            <img src=${array[i].image} class="card-img-top" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">${array[i].name}</h5>
            <p class="card-text">${array[i].price}</p>
            ${array[i].amount === 0 ? `<p>Out of stock!</p>` : `<p>Amount: ${array[i].amount}</p>`}
          </div>
        </div>
      `;
    }
  }



  sortByEl.addEventListener('change', e => {
    option = e.target.value;
    sortBy(productsArray, option);
    showItems(items, productsArray);
})

const sortBy = (productsArray, option) => {
  let array = [];

  switch(option) {
    case 'ascPrice':
      return array =  productsArray.sort((a, b) => a.price - b.price);
    case 'descPrice':
      return array = productsArray.sort((a, b) => b.price - a.price);
    case 'ascName':
      return array = productsArray.sort((a, b) => a.name.localeCompare(b.name))
    case 'descName':
      return array = productsArray.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return productsArray;
  }
}

let filtredItem;

filterItems.addEventListener('click', e => {
  filtredItem = e.target.textContent;
  filterBy(productsArray, filtredItem);
  showItems(items, filteredArray);
})

const filterBy = (array, option) => {

  switch(option) {
    case 'Hoodies':
      filteredArray = array.filter(product => product.type === 'hoodie');
      break;
    case 'Jackets':
      filteredArray = array.filter(product => product.type === 'jacket');
      break;
    case 'T-shirts':
      filteredArray = array.filter(product => product.type === 't-shirt');
      break;
    case 'Sweaters':
      filteredArray = array.filter(product => product.type === 'sweater');
      break;
    case 'Jeans':
      filteredArray = array.filter(product => product.type === 'jeans');
      break;
    default:
      return filteredArray;
  }
}


searchBar.addEventListener('keyup', e =>{
  searchItem = e.target.value;
  searchProduct(productsArray, searchItem);
  showItems(items, searchProduct(productsArray, searchItem));
})

const searchProduct = (array, value) => array.filter(item => item.name.toLowerCase().includes(value));