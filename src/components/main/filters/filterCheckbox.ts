import { FilterBase, filtersTypes } from './filterBase';
import { IProductItem } from '../interface/Iproducts';
import { ProductList } from '../catalogue/productList';

export class FilterCheckbox extends FilterBase {
  root: HTMLElement;
  constructor(type: filtersTypes, products: IProductItem[]) {
    super(type, products);
    this.root = document.createElement('div');
  }

  render() {
    let filtersListHTML = '';
    const filterItems = this.getFilterFieldList(this.products);
    filterItems.forEach((filterItem) => {
      filtersListHTML += `
      <div class="filter__checkbox-item">
        <label for="${filterItem}">
          <input type="checkbox" name="${this.type}" id ="${filterItem}">${filterItem}
          </label>
      </div>`;
    });
    this.root.innerHTML +=
      `<div class="filter__checkbox-container"><h3 class="filter__title">${this.type}</h3>` +
      `<div class="filter__list">${filtersListHTML}</div></div>`;
    return this.root;
  }

  getRoot(): HTMLElement {
    return document.querySelector('.filter__checkbox-item') as HTMLElement;
  }

  checkState() {
    const allCheckboxes = [...document.querySelectorAll(`input[name="${this.type}"`)] as HTMLInputElement[];
    if (!allCheckboxes.filter((checkbox) => checkbox.checked)) {
      return true;
    }
    return false;
  }
}
