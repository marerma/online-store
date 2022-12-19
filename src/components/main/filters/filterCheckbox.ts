import { FilterBase, filtersTypes } from './filterBase';
import { IProductItem } from '../interface/Iproducts';

export class FilterCheckbox extends FilterBase {
  root: HTMLElement;
  constructor(type: filtersTypes, products: IProductItem[]) {
    super(type, products);
    this.root = document.createElement('div');
  }

  render() {
    let filtersListHTML = '';
    const filterItems = this.getFilterFieldList(this.products);
    const count = this.getCountByField(this.products);

    filterItems.forEach((filterItem) => {
      filtersListHTML += `
      <div class='filter__checkbox-item'>
          <input class='filter__checkbox-input' 
                 type='checkbox' 
                 name='${this.type}' 
                 id ='${filterItem}'>
          <label class='filter__checkbox-label' for='${filterItem}'>${filterItem}
            <span class='checkbox-amount-active'> ${count[filterItem]}/ </span>
            <span class='checkbox-amount'>${count[filterItem]}</span>
          </label>
      </div>`;
    });
    this.root.innerHTML +=
      `<div class='filter__checkbox-container'><h3 class='filter__title'>${this.type}</h3>` +
      `<div class='filter__list'>${filtersListHTML}</div></div>`;
    return this.root.innerHTML;
  }

  updateAmount(products: IProductItem[]) {
    const count = this.getCountByField(products);
    for (const key in count) {
      const label = [...document.querySelectorAll(`.filter__checkbox-label`)] as HTMLElement[];
      label.forEach((el) => {
        const activeAmount = el.querySelector('.checkbox-amount-active') as HTMLElement;
        if (el.getAttribute('for') === key) {
          activeAmount.innerHTML = ` ${count[key]}/ `;
        }
      });
    }
  }
}
