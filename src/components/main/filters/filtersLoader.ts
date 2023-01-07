import { FilterComponents } from './filtersComponent';
import { IProductItem } from '../interface/Iproducts';
import { FilterProducts } from './filterProducts';
import { FilterSliderRange } from './filterDualSlider';

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
    sortSearchContainer.append(this.displayComponent.render());
    return sortSearchContainer;
  }

  setFilterStateFromQuery(products: IProductItem[], stateObj: { [x: string]: string[] }): void {
    this.setDefaultState();

    for (const key in stateObj) {
      if (key === 'brand' || key === 'category') {
        FilterProducts.activeFilters[key] = stateObj[key];
        stateObj[key].forEach((item) => {
          const input = document.getElementById(`${item}`);
          if (input instanceof HTMLInputElement) {
            input.checked = true;
          } else {
            this.setDefaultState();
            this.resetFilters();
          }
        });
      }

      if (key === 'rating' || key === 'price') {
        const sliderInput = FilterComponents.filterArray.find((el) => el.type === key);
        if (sliderInput instanceof FilterSliderRange) {
          if (
            +stateObj[key][0] >= sliderInput.getRangeData()[0] &&
            +stateObj[key][1] <= sliderInput.getRangeData()[1]
          ) {
            FilterProducts.activeFilters[key] = stateObj[key];
            sliderInput.setSavedValues(stateObj[key]);
            sliderInput.isActive = true;
          } else {
            this.resetFilters();
          }
        }
      }

      if (key === 'sort') {
        this.sortComponent.setSortValue(`${stateObj[key]}`);
      }

      if (key === 'search') {
        this.searchComponent.setSearchValue(`${stateObj[key]}`);
        this.searchComponent.updateSearchValue();
      }

      if (key === 'display') {
        this.displayComponent.setDisplayValue(`${stateObj[key]}`);
        this.displayComponent.changeProductsView();
      }
    }
    this.renderFilteredProducts(products);
  }
}
export { FiltersLoader };
