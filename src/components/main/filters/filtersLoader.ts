import { FilterComponents } from './filtersComponent';
import { IProductItem } from '../interface/Iproducts';
import { FilterProducts } from './filterProducts';

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

  loadHelpers() {
    const sortSearchContainer = document.createElement('div');
    sortSearchContainer.className = 'catalogue-helpers';
    this.sortComponent.loadSortComponent(sortSearchContainer);
    this.searchComponent.loadSearchComponent(sortSearchContainer);
    return sortSearchContainer;
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
      if (key === 'sort') {
        this.sortComponent.setSortValue(`${stateObj[key]}`);
      }
      if (key === 'search') {
        this.searchComponent.updatePlaceholder(`${stateObj[key]}`);
      }
    }
    this.renderFilteredProducts(products);
  }
}
export { FiltersLoader };
