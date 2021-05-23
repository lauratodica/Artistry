const productsList = document.querySelector('.productsList');
const itemsPerPage = document.querySelector('.perPage');
const myCarousel = document.querySelector('#myCarousel');
const sortByEl = document.querySelector('.sortBy');

let productsArray = [];

const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false
})



fetch('http://localhost:3000/hoodies')
  .then(response => response.json())
  .then(data => {
    productsArray = data;
    showItems(items);
  });

  let items = 5;
  
  itemsPerPage.addEventListener('change', e => {
    items = Number(e.target.value);
    console.log(items);
    showItems(items);
      })

  const showItems = items => {
    productsList.innerHTML = '';
    console.log('item in func',items);
    for (let i=0; i<items; i++) {
       productsList.innerHTML += `
        <div class="card">
          <div class="text-center">
            <img src=${productsArray[i].image} class="card-img-top" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">${productsArray[i].name}</h5>
            <p class="card-text">${productsArray[i].price}</p>
            ${productsArray[i].amount === 0 ? `<p>Out of stock!</p>` : `<p>Amount: ${productsArray[i].amount}</p>`}
          </div>
        </div>
      `;
    }
  }

  let option;

  sortByEl.addEventListener('change', e => {
    option = e.target.value;
    sortBy(productsArray, option);
    showItems(items);
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
