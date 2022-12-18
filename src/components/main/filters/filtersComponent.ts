import { IProductItem } from '../interface/Iproducts';
import { FilterCheckbox } from './filterCheckbox';
import { FilterSliderRange } from './filterDualSlider';
class FilterComponents {
  static typesList: string[];
  static filters: (FilterCheckbox | FilterSliderRange)[];
  filterComponent: HTMLElement = document.createElement('div');

  constructor() {
    FilterComponents.typesList = ['brand', 'category', 'price', 'rating'];
    FilterComponents.filters = [];
  }
  render(products: IProductItem[]) {
    let innerHTMLFilters = '';

    FilterComponents.typesList.forEach((type) => {
      if (type === 'brand' || type === 'category') {
        innerHTMLFilters += new FilterCheckbox(type, products).render().innerHTML;
        FilterComponents.filters.push(new FilterCheckbox(type, products));
      }
      if (type === 'price' || type === 'rating') {
        innerHTMLFilters += new FilterSliderRange(type, products).render();
        FilterComponents.filters.push(new FilterSliderRange(type, products));
      }
    });
    return innerHTMLFilters;
  }

  loadFilters(products: IProductItem[]) {
    this.filterComponent.innerHTML = this.render(products);
    this.filterComponent.className = 'filters__container';
    return this.filterComponent;
  }
}

export { FilterComponents };
