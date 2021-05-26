const productsList = document.querySelector('.productsList');
const itemsPerPage = document.querySelector('.perPage');
const sortByEl = document.querySelector('.sortBy');
const filterItems = document.querySelector('.filterByType');
const searchBar = document.querySelector('.searchInput')
const selectPageNumber = document.querySelector('.pagination')
const allProducts = document.querySelector('.listOfProducts');



let items = 5;
let productsArray = [];
let option;
let filteredArray = [];
let filtredItem;
let searchItem;
let numberOfPage;
let pageArray = [];
let searchArray = [];

fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
        productsArray = data;
        console.log('productsArray', productsArray);
        showItems(items, productsArray);
        createPagination(changeArray());
    });

const showItems = (items, array) => {
    productsList.innerHTML = '';
    let numberOfItems = (items < array.length) ? items : array.length;
    for(let i = 0; i<numberOfItems; i++) {
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
    `
    }
}

itemsPerPage.addEventListener('change', e => {
    items = Number(e.target.value);
    showItems(items, productsArray);
    createPagination(changeArray('productsPerPage'));
})


sortByEl.addEventListener('change', e => {
    option = e.target.value;
    sortBy(option, productsArray);
    showItems(items, productsArray)
})

const sortBy = (option, array) => {
    switch(option) {
        case 'ascPrice': 
            return array.sort((a,b) => a.price - b.price);
        case 'descPrice':
            return array.sort((a,b) => b.price - a.price);
        case 'ascName':
            return array.sort((a,b) => a.name.localeCompare(b.name));
        case 'descName':
            return array.sort((a,b) => b.name.localeCompare(a.name));
        default:
            return array;
    }
}


filterItems.addEventListener('click', e => {
    filtredItem = e.target.textContent;
    filterBy(filtredItem, productsArray);
    showItems(items, filteredArray);
    createPagination(changeArray('filter'));
    let oldActive = document.querySelector('.activeLink');
    if(oldActive) {
        oldActive.classList.remove('activeLink');
    }
    e.target.classList.add('activeLink');
})


const filterBy = (option, array) => {
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
            return array;
    }
}

allProducts.addEventListener('click', () => {
    showItems(items, productsArray);
    createPagination(productsArray);
})

searchBar.addEventListener('keyup', e => {
    searchItem = e.target.value;
    searchProduct(searchItem, productsArray);
    showItems(items, searchProduct(searchItem, productsArray))
    createPagination(changeArray('search'));
})

const searchProduct = (value, array) => searchArray = array.filter(product => product.name.toLowerCase().includes(value));


selectPageNumber.addEventListener('click', e => {
    numberOfPage = Number(e.target.textContent);
    choosePageNumber(items);
    let oldActive = document.querySelector('.paginationColor');
    if(oldActive) {
        oldActive.classList.remove('paginationColor');
    }
    e.target.classList.add('paginationColor');
})

const choosePageNumber = (products) => {
    fetch(`http://localhost:3000/products?_page=${numberOfPage}&_limit=${products}`)
        .then(response => response.json())
        .then(data => {
            showItems(items, data);
        });
}


const createPagination = (array) => {
    console.log('array in createPagination', array);
    selectPageNumber.innerHTML = '';
    let pages = Math.ceil(array.length/items);
    for(let i=1; i <= pages; i++) {
        selectPageNumber.innerHTML += `
            <li class="page-item"><a class="page-link" href="#laura">${i}</a></li>
        `
    }
}

const changeArray = (option) => {
    switch(option) {
        case 'filter': 
            return filteredArray;
        case 'search':
            return searchArray;
        case 'productsPerPage':
            return (filteredArray.length === 0) ? productsArray : filteredArray;
        default:
            console.log('change array default');
            return productsArray;
            
    }
}

