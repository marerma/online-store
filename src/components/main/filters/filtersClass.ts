import { shopCatalogue } from '../catalogue/index';
import { IProductItem } from '../interface/Iproducts';
import IFilter from '../interface/Ifilters';

type filtersTypes = 'brand' | 'category' | 'price' | 'rating';

class Filter implements IFilter {
  readonly type: filtersTypes;
  productList: IProductItem[];

  constructor(type: filtersTypes) {
    this.type = type;
    this.productList = shopCatalogue.catalogue.productsList; // получаем список всех начальных загруженных на страницу товаров
  }
  getProductList() {
    return this.productList;
  }

  //метод для получения списка полей, по которым будет фильтрация в зависимости от типа фильтра

  getFilterFieldList() {
    const fieldsList = this.productList.map((product: IProductItem) => product[this.type]);
    const fieldsListFormatted: (string | number)[] = [...new Set(fieldsList)]; // убираем повторения;

    //если фильтры по цене и рейтингу, то формируем диапазон [minPrice, maxPrice]

    if (this.type === 'price' || this.type === 'rating') {
      const rangeArr = (fieldsListFormatted as number[]).sort((a, b) => a - b);
      const range = [rangeArr[0], rangeArr[rangeArr.length - 1]];
      return range;
    }
    return fieldsListFormatted;
  }

  render(): string {
    let innerHTML = '';
    if (this.type === 'price' || this.type === 'rating') {
      innerHTML = `
        <div class="filter__slider">
        <h3 class="filter__title">${this.type}</h3>
            <div class="filter__slider-track"></div>
            <input type="range" 
                   min=${0} 
                   max=${this.getFilterFieldList()[1]} 
                   value="30">
            <input type="range"
                   min=${0} 
                   max=${this.getFilterFieldList()[1]}
                   value="2">
        </div>`;
    }
    if (this.type === 'brand' || this.type === 'category') {
      let filtersListHTML = '';
      this.getFilterFieldList().forEach((filterItem) => {
        filtersListHTML += `
        <div class="filter__checkbox-item">
          <label><input type="checkbox" name="${this.type}">${filterItem}</label>
        </div>`;
      });
      innerHTML = `<h3 class="filter__title">${this.type}</h3>` + `<div class="filter__list">${filtersListHTML}</div>`;
    }
    return innerHTML;
  }
}
export { Filter, filtersTypes };
