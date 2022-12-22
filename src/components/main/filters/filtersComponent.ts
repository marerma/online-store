import { IProductItem } from '../interface/Iproducts';
import { FilterCheckbox } from './filterCheckbox';
import { FilterSliderRange } from './filterDualSlider';
class FilterComponents {
  static typesList: string[];
  static filterArray: (FilterCheckbox | FilterSliderRange)[];
  filterComponent: HTMLElement = document.createElement('div');

  constructor() {
    FilterComponents.typesList = ['category', 'brand', 'price', 'rating'];
    FilterComponents.filterArray = [];
  }

  render(products: IProductItem[]) {
    let innerHTMLFilters = this.addButtons() + this.addFoundProductsTotal();

    FilterComponents.typesList.forEach((type) => {
      if (type === 'brand' || type === 'category') {
        innerHTMLFilters += new FilterCheckbox(type, products).render();
        FilterComponents.filterArray.push(new FilterCheckbox(type, products));
      }
      if (type === 'price' || type === 'rating') {
        innerHTMLFilters += new FilterSliderRange(type, products).render();
        FilterComponents.filterArray.push(new FilterSliderRange(type, products));
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
  addFoundProductsTotal() {
    return `<div class='filter__found-count'>
              <p>Found: <span class='filter__found-count-item'> </span> </p>
            </div>`;
  }
  updateFoundProductsTotal(products: IProductItem[]) {
    const foundCount = document.querySelector('.filter__found-count-item') as HTMLElement;
    foundCount.textContent = `${products.length}`;
  }

  updateFiltersAmount(products: IProductItem[]) {
    FilterComponents.filterArray.forEach((el) => {
      if (el instanceof FilterCheckbox) {
        el.updateAmount(products);
      }
    });
  }
}

export { FilterComponents };
