import { FilterComponents } from './filtersComponent';
import { IProductItem } from '../interface/Iproducts';
import { copyURLtoClipboard, getIntersectionsInArray, getSelector, parseQuery } from '../../../functions/utils';
import { ProductComponent } from '../catalogue/productItem';
import { sortComponent } from './sortProducts';
import { searchComponent } from './search';
import { stateForQuery } from './state';

class FilterProducts extends FilterComponents {
  static activeFilters: { [x: string]: string[] };
  static stateArray: { [x: string]: IProductItem[] };

  constructor() {
    super();
    this.setDefaultState(); // потом проверять, есть ли в query или LS сохраненные фильтры, если нет - обнулять
  }

  setDefaultState() {
    FilterProducts.activeFilters = { category: [], brand: [], price: [], rating: [] };
    FilterProducts.stateArray = { category: [], brand: [], price: [], rating: [] };
  }

  setQueryState(products: IProductItem[]) {
    const stateFiltersObj = parseQuery(window.location.href);
    const isEmpty = JSON.stringify(stateFiltersObj) === '{}';
    if (!isEmpty) {
      for (const key in stateFiltersObj) {
        FilterProducts.activeFilters[key] = stateFiltersObj[key];
      }
    }
  }

  addListener(products: IProductItem[]) {
    this.filterComponent.addEventListener('input', () => {
      const allInputs = [...document.getElementsByTagName('input')];
      updateFiltersObj(allInputs);
      this.renderFilteredProducts(products);
      stateForQuery.syncURL();
    });

    this.filterComponent.addEventListener('click', (e) => {
      const allInputs = [...document.getElementsByTagName('input')];
      const target = e.target as HTMLElement;
      if (target.classList.contains('filter__button')) {
        const buttonID = target.getAttribute('id');
        const buttonText = target.textContent;
        switch (buttonID) {
          case 'copy':
            copyURLtoClipboard();
            target.textContent = 'Link copied!';
            target.classList.add('filter__button-copied');
            setTimeout(() => {
              target.textContent = buttonText;
              target.classList.remove('filter__button-copied');
            }, 1000);
            break;
          case 'reset':
            this.setDefaultState();
            sortComponent.setSortValue('default');
            searchComponent.resetSearch();
            allInputs.forEach((item) => (item.checked = false));
            this.renderFilteredProducts(products);
            stateForQuery.syncURL();
            break;
        }
      }
    });
  }

  renderFilteredProducts(products: IProductItem[]) {
    const productsArr = getProductsAllFilters(products);
    const isNotActive = Object.values(FilterProducts.stateArray).every((item) => item.length == 0);
    const productsList = getSelector(document, '.product-list');
    const newProducts = '';

    const allCounts = [...document.querySelectorAll('.checkbox-amount-active')] as HTMLElement[];
    allCounts.forEach((span) => (span.innerHTML = ' 0/ '));

    const updateProductsList = (productsArray: IProductItem[], htmlString: string) => {
      sortComponent.sortProductsLogic(productsArray);
      this.updateFiltersAmount(productsArray);
      this.updateFoundProductsTotal(productsArray);
      htmlString =
        productsArray.length === 0
          ? 'products not found'
          : productsArray.map((product) => new ProductComponent(product).render()).join('');

      productsList.innerHTML = htmlString;
    };

    if (searchComponent.isActiveSearch()) {
      if (isNotActive) {
        const foundProducts = searchComponent.searchProducts(products);
        updateProductsList(foundProducts, newProducts);
      }

      if (!isNotActive) {
        const foundProducts = searchComponent.searchProducts(productsArr);
        updateProductsList(foundProducts, newProducts);
      }
    }

    if (!searchComponent.isActiveSearch()) {
      if (isNotActive) {
        updateProductsList(products, newProducts);
      }
      if (!isNotActive) {
        updateProductsList(productsArr, newProducts);
      }
    }
  }

  makeQuery() {
    const query = Object.entries(FilterProducts.activeFilters)
      .map(([key, value]) => {
        if (value.length) {
          return `${key}=${value}`;
        }
      })
      .filter((item) => item !== undefined)
      .join('&');
    return `${query}`;
  }
}
export { FilterProducts };

// FUNCTIONS //

function getProductsAllFilters(products: IProductItem[]) {
  for (const key in FilterProducts.activeFilters) {
    const filterField = FilterProducts.activeFilters[key];
    let keyInProduct: keyof IProductItem = 'category';
    if (key === 'brand') {
      keyInProduct = 'brand';
    }

    FilterProducts.stateArray[key] = products.filter((item) => {
      return filterField.some((value) => item[keyInProduct] === value);
    });
  }

  const allFilterProducts = getIntersectionsInArray(FilterProducts.stateArray);
  return allFilterProducts;
}

// находим на странице все input с checkbox:true
// собираем из них объект для дальнейшей фильтрации по базе данных по ключу "название фильтра": [значения];
// присваиваем статическому свойству класса этот объект,
// т.о. он будет доступен для формирования query

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
