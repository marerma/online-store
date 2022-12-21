import { IProductItem } from '../interface/Iproducts';
import { filtersList } from './index';

export class Search {
  searchComponent: HTMLInputElement = document.createElement('input');
  searchValue = '';

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
    this.setSearchValue('');
    this.searchComponent.value = this.getSearchValue();
  }

  addListener(products: IProductItem[]) {
    this.searchComponent.addEventListener('input', (e) => {
      const searchInput = e.target;
      if (searchInput instanceof HTMLInputElement) {
        this.setSearchValue(searchInput.value);
        this.renderProducts(products);
        this.syncURL();
      }
    });
  }

  render() {
    this.searchComponent.setAttribute('type', 'search');
    this.searchComponent.setAttribute('id', 'search');
    this.searchComponent.setAttribute('name', 'search-products');
    this.searchComponent.setAttribute('placeholder', 'Search the products..');
    return this.searchComponent;
  }

  loadSearchComponent(root: HTMLElement, products: IProductItem[]) {
    const container = document.createElement('div');
    container.className = 'search-products';
    container.append(this.render());
    root.append(container);
    this.addListener(products);
    return this.searchComponent;
  }

  searchProducts(products: IProductItem[]) {
    const regEx = new RegExp(`${this.getSearchValue()}`, 'gi');
    const result = products.filter((product) => {
      return (
        regEx.test(product.title) ||
        regEx.test(product.brand) ||
        regEx.test(product.category) ||
        regEx.test(product.description) ||
        regEx.test(`${product.discountPercentage}`) ||
        regEx.test(`${product.price}`) ||
        regEx.test(`${product.rating}`) ||
        regEx.test(`${product.stock}`)
      );
    });
    return result;
  }

  renderProducts(products: IProductItem[]) {
    filtersList.renderFilteredProducts(products);
  }

  makeQuery() {
    const searchValue = this.getSearchValue();
    const query = `search=${searchValue}`;
    return `?${query}`;
  }

  syncURL() {
    const path = document.location.pathname;
    const query = this.makeQuery();
    window.history.pushState({}, '', `${path}${query}`);
  }
}

export const searchComponent = new Search();
