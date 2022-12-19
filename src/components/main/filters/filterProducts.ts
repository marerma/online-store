import { FilterComponents } from './filtersComponent';
import { IProductItem } from '../interface/Iproducts';
import { getIntersectionsInArray } from '../../../functions/utils';
import { ProductList } from '../catalogue/productList';

class FilterProducts extends FilterComponents {
  static activeFilters: { [x: string]: string[] };
  static stateArray: { [x: string]: number[] };

  constructor() {
    super();
    this.setDefaultState(); // потом проверять, есть ли в query или LS сохраненные фильтры, если нет - обнулять
  }

  setDefaultState() {
    FilterProducts.activeFilters = { brand: [], category: [], price: [], rating: [] };
    FilterProducts.stateArray = { brand: [], category: [], price: [], rating: [] };
  }

  addListener(products: IProductItem[]) {
    this.filterComponent.addEventListener('input', () => {
      const allInputs = [...document.getElementsByTagName('input')];
      updateFiltersObj(allInputs);
      this.makeQuery();
      renderFilteredProducts(products);
    });

    this.filterComponent.addEventListener('click', (e) => {
      const allInputs = [...document.getElementsByTagName('input')];
      const target = e.target as HTMLElement;
      if (target.classList.contains('filter__button')) {
        const buttonID = target.getAttribute('id');
        switch (buttonID) {
          case 'copy':
            break;
          case 'reset':
            this.setDefaultState();
            allInputs.forEach((item) => (item.checked = false));
            renderFilteredProducts(products);
            break;
        }
      }
    });
  }

  makeQuery() {
    let queryURL = '';
    for (const key in FilterProducts.activeFilters) {
      const values = encodeURIComponent(FilterProducts.activeFilters[key].join('|'));
      queryURL += `${key}=${values}&`;
    }
    return queryURL;
  }

  checkNotActiveState() {
    const values = Object.values(FilterProducts.stateArray);
    return values.every((item) => item.length === 0);
  }
}
export { FilterProducts };

// FUNCTIONS //

//рендерит отфильтрованные продукты по отфильтрованным id

function renderFilteredProducts(products: IProductItem[]) {
  const idArr = getIDbyFilter(products);
  const productsArr = [...products].filter((item) => idArr.includes(item.id));
  let newProducts = '';
  const notActive = Object.values(FilterProducts.stateArray).every((item) => item.length == 0);

  if (idArr.length !== 0) {
    newProducts = new ProductList().render(productsArr);
  }
  if (idArr.length === 0 && !notActive) {
    newProducts = 'products not found';
  }

  if (idArr.length === 0 && notActive) {
    newProducts = new ProductList().render(products);
  }

  const catalogueContainer = document.querySelector('.catalogue__container') as HTMLElement;
  catalogueContainer.innerHTML = newProducts;
}

function getIDbyFilter(products: IProductItem[]) {
  for (const key in FilterProducts.activeFilters) {
    const filterField = FilterProducts.activeFilters[key];
    let keyInProduct: keyof IProductItem = 'category';
    if (key === 'brand') {
      keyInProduct = 'brand';
    }

    FilterProducts.stateArray[key] = products
      .filter((item) => {
        return filterField.some((value) => item[keyInProduct] === value);
      })
      .map((item) => item.id);
  }

  const idArr = getIntersectionsInArray(FilterProducts.stateArray);

  return idArr;
}

// находим на странице все input с checkbox:true и слайдер
// собираем из них объект для дальнейшей фильтрации по базе данных по ключу "название фильтра": [значения];
// присваиваем статическому свойству класса этот объект,
// т.о. он будет доступен для формирования query и быстрого сохранения в LS

function updateFiltersObj(inputArr: HTMLInputElement[]) {
  return inputArr
    .filter((input) => input.type === 'checkbox' || input.type === 'range')
    .forEach((input) => {
      const key = input.name;
      const type = input.type;
      switch (type) {
        case 'checkbox':
          updateActiveFilters(input.checked === true, key, input.id);
          break;
        case 'range':
          updateActiveFilters(input.value >= input.min && input.value <= input.max, key, input.value);
          break;
      }
    });
}

function updateActiveFilters(condition: boolean, key: string, inputValue: string) {
  if (condition) {
    if (!FilterProducts.activeFilters[key].includes(inputValue)) {
      FilterProducts.activeFilters[key].push(inputValue);
    }
  } else {
    if (FilterProducts.activeFilters[key].includes(inputValue)) {
      const indexNotChecked = FilterProducts.activeFilters[key].indexOf(inputValue);
      FilterProducts.activeFilters[key].splice(indexNotChecked, 1);
    }
  }
}
