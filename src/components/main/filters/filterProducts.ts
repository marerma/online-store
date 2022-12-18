import { FilterComponents } from './filtersComponent';
import { IProductItem } from '../interface/Iproducts';
import { getIntersectionsInArray } from '../../../functions/utils';
import { ProductList } from '../catalogue/productList';

class FilterProducts extends FilterComponents {
  static activeFilters: { [x: string]: string[] };
  static stateArray: { [x: string]: number[] };

  constructor() {
    super();
    this.setDefaultState(); // потом проверять есть ли в query или LS сохраненные фильтры
  }

  setDefaultState() {
    FilterProducts.activeFilters = { brand: [], category: [], price: [], rating: [] };
    FilterProducts.stateArray = { brand: [], category: [], price: [], rating: [] };
  }

  setAttributeChecked(target: HTMLInputElement) {
    if (target.type === 'checkbox') {
      setAttributeChecked(target);
    }
  }

  addListener(products: IProductItem[]) {
    this.filterComponent.addEventListener('input', (e) => {
      const clickedFilterField = e.target as HTMLInputElement;
      const allCheckedInputs = [...document.getElementsByTagName('input')];
      this.setAttributeChecked(clickedFilterField);
      updateFiltersObj(allCheckedInputs);
      this.makeQuery();
      renderFilteredProducts(products, this.checkNotActiveState());
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

function renderFilteredProducts(products: IProductItem[], notActive: boolean) {
  const idArr = getIDbyFilter(products);
  const productsArr = [...products].filter((item) => idArr.includes(item.id));
  let newProducts = new ProductList().render(productsArr);

  if (idArr.length === 0 && !notActive) {
    newProducts = 'not found';
  } else if (notActive) {
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
