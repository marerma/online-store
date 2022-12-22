import { FilterComponents } from './filtersComponent';
import { IProductItem } from '../interface/Iproducts';
import { FilterProducts } from './filterProducts';
import { stateForQuery } from './state';

class FiltersLoader extends FilterProducts {
  root: HTMLElement | null = document.querySelector('.main-content');
  filterComponent: HTMLElement = document.createElement('div');

  constructor() {
    super();
  }

  loadFilters(products: IProductItem[]) {
    this.filterComponent.innerHTML = new FilterComponents().render(products);
    this.filterComponent.className = 'filters__container';
    this.addListener(products);
    return this.filterComponent;
  }
  setFilterStateFromQuery(products: IProductItem[], stateObj: { [x: string]: string[] }): void {
    this.setDefaultState();
    for (const key in stateObj) {
      FilterProducts.activeFilters[key] = stateObj[key];
      stateObj[key].forEach((item) => {
        const input = document.getElementById(`${item}`);
        if (input instanceof HTMLInputElement) {
          input.checked = true;
        }
      });
    }
    this.renderFilteredProducts(products);
  }
}
export { FiltersLoader };
