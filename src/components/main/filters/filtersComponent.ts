import { IProductItem } from '../interface/Iproducts';
import { FilterCheckbox } from './filterCheckbox';
import { FilterSliderRange } from './filterDualSlider';
class FilterComponents {
  static typesList: string[];
  filterComponent: HTMLElement = document.createElement('div');

  constructor() {
    FilterComponents.typesList = ['brand', 'category', 'price', 'rating'];
  }

  render(products: IProductItem[]) {
    let innerHTMLFilters = this.addButtons();

    FilterComponents.typesList.forEach((type) => {
      if (type === 'brand' || type === 'category') {
        innerHTMLFilters += new FilterCheckbox(type, products).render().innerHTML;
      }
      if (type === 'price' || type === 'rating') {
        innerHTMLFilters += new FilterSliderRange(type, products).render();
      }
    });
    return innerHTMLFilters;
  }

  loadFilters(products: IProductItem[]) {
    this.filterComponent.innerHTML = this.render(products);
    this.filterComponent.className = 'filters__container';
    return this.filterComponent;
  }

  addButtons() {
    return `<div class='filter__button-container'>
              <div class='filter__button' id='reset'>Reset filters</div>
              <div class='filter__button' id='copy'>Copy filters</div>
            </div>`;
  }
}

export { FilterComponents };
