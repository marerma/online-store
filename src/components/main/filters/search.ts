import { IProductItem } from '../interface/Iproducts';
import { compareStrings } from '../../../functions/utils';

const EMPTY_SEARCH_VALUE = '';
export class Search {
  searchComponent: HTMLInputElement = document.createElement('input');
  searchValue = EMPTY_SEARCH_VALUE;

  getSearchValue() {
    return this.searchValue;
  }

  isActiveSearch() {
    if (this.getSearchValue().length < 2) {
      return false;
    }
    return true;
  }

  setSearchValue(value: string) {
    this.searchValue = value;
  }

  resetSearch() {
    this.searchComponent.placeholder = 'Search the products..';
    this.setSearchValue(EMPTY_SEARCH_VALUE);
    this.searchComponent.value = this.getSearchValue();
  }

  updateSearchValue() {
    this.searchComponent.value = this.getSearchValue();
  }

  render() {
    this.searchComponent.setAttribute('type', 'search');
    this.searchComponent.setAttribute('id', 'search');
    this.searchComponent.setAttribute('name', 'search-products');
    this.searchComponent.setAttribute('placeholder', 'Search the products..');
    return this.searchComponent;
  }

  loadSearchComponent(root: HTMLElement) {
    const container = document.createElement('div');
    container.className = 'search-products';
    container.append(this.render());
    root.append(container);
    return this.searchComponent;
  }

  searchProducts(products: IProductItem[]) {
    const searchValue = this.getSearchValue();
    const result = products.filter(
      ({ title, brand, category, description, discountPercentage, price, rating, stock }) => {
        return [title, brand, category, description, discountPercentage, price, rating, stock].some((prop) =>
          compareStrings(prop, searchValue)
        );
      }
    );
    return result;
  }

  makeQuery() {
    const searchValue = this.getSearchValue();
    if (searchValue === EMPTY_SEARCH_VALUE) {
      return EMPTY_SEARCH_VALUE;
    } else {
      return `search=${searchValue}`;
    }
  }
}

export const searchComponent = new Search();
