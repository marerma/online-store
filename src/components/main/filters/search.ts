import { IProductItem } from '../interface/Iproducts';

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
    const regEx = new RegExp(`.*` + `${this.getSearchValue()}` + `.*`, 'gi');
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

  makeQuery() {
    const searchValue = this.getSearchValue();
    if (searchValue === '') {
      return '';
    } else {
      return `search=${searchValue}`;
    }
  }
}

export const searchComponent = new Search();
