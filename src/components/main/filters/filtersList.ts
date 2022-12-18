import { Filter } from './filtersClass';
import { IProductItem } from '../interface/Iproducts';

import { getIntersectionsInArray } from '../../../functions/utils';
import { ProductList } from '../catalogue/productList';

// класс для формирования списка всех фильтров: 2 с чекбоксами и 2 со слайдерами

class FiltersList {
  static typesList: ['brand', 'category', 'price', 'rating'];
  static activeFilters: { [x: string]: string[] };
  root: HTMLElement | null = document.querySelector('.main-content');
  filterComponent: HTMLElement = document.createElement('div');
  static stateArray: { [x: string]: number[] };

  constructor() {
    FiltersList.typesList = ['brand', 'category', 'price', 'rating'];
    FiltersList.activeFilters = { brand: [], category: [], price: [], rating: [] };
    FiltersList.stateArray = { brand: [], category: [], price: [], rating: [] };
  }

  render(products: IProductItem[]) {
    let innerHTML = '';
    FiltersList.typesList.forEach((filterName) => {
      innerHTML += new Filter(filterName).render(products);
    });
    return innerHTML;
  }

  loadFilters(products: IProductItem[]) {
    this.filterComponent.innerHTML = this.render(products);
    this.filterComponent.className = 'filters__container';
    this.addListener(products);
    return this.filterComponent;
  }

  addListener(products: IProductItem[]) {
    this.filterComponent.addEventListener('input', (e) => {
      const clickedFilterField = e.target as HTMLInputElement;
      const allCheckedInputs = [...document.getElementsByTagName('input')];

      if (clickedFilterField.type === 'checkbox') {
        setAttributeChecked(clickedFilterField);
      }
      updateFiltersObj(allCheckedInputs);
      this.makeQuery();
      renderFilteredProducts(products);
    });
  }

  makeQuery() {
    let queryURL = '';
    for (const key in FiltersList.activeFilters) {
      const values = encodeURIComponent(FiltersList.activeFilters[key].join('|'));
      queryURL += `${key}=${values}&`;
    }
    return queryURL;
  }
}
export { FiltersList };

// FUNCTIONS //

//проверяем, есть ли у цели аттрибут checked, если нет, то устанавливаем его,
// если есть - проверяем, в каком он положении и меняем

function setAttributeChecked(targetInput: HTMLInputElement) {
  if (targetInput.getAttribute('checked')) {
    targetInput.getAttribute('checked') === 'true'
      ? targetInput.setAttribute('checked', 'false')
      : targetInput.setAttribute('checked', 'true');
  } else {
    targetInput.setAttribute('checked', 'true');
  }
}

// функция отбирает продукты на странице по селектору и проходит по ним, добавляя display: none всем продуктам,
// а затем показывает только те, которые соответветствуют фильтру

function renderFilteredProducts(products: IProductItem[]) {
  const idArr = getIDbyFilter(products);
  const productsArr = [...products].filter((item) => idArr.includes(item.id));
  let newProducts = new ProductList().render(productsArr);
  if (idArr.length === 0) {
    newProducts = new ProductList().render(products);
  }
  const catalogueContainer = document.querySelector('.catalogue__container') as HTMLElement;
  catalogueContainer.innerHTML = newProducts;
}

function getIDbyFilter(products: IProductItem[]) {
  for (const key in FiltersList.activeFilters) {
    const filterField = FiltersList.activeFilters[key];

    if (key === 'category') {
      FiltersList.stateArray.category = products
        .filter((item) => {
          return filterField.some((value) => item.category === value);
        })
        .map((item) => item.id);
    }
    if (key === 'brand') {
      FiltersList.stateArray.brand = products
        .filter((item) => {
          return filterField.some((value) => item.brand === value);
        })
        .map((item) => item.id);
    }
  }

  const idArr = getIntersectionsInArray(FiltersList.stateArray);
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
    if (!FiltersList.activeFilters[key].includes(inputValue)) {
      FiltersList.activeFilters[key].push(inputValue);
    }
  } else {
    if (FiltersList.activeFilters[key].includes(inputValue)) {
      const indexNotChecked = FiltersList.activeFilters[key].indexOf(inputValue);
      FiltersList.activeFilters[key].splice(indexNotChecked, 1);
    }
  }
}
