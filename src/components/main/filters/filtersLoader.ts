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
}
export { FiltersLoader };
