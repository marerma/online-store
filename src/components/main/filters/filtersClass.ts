import { IProductItem } from '../interface/Iproducts';

type filtersTypes = 'brand' | 'category' | 'price' | 'rating';

class Filter {
  readonly type: filtersTypes;
  constructor(type: filtersTypes) {
    this.type = type;
  }

  getFilterFieldList(products: IProductItem[]) {
    const fieldsList = products.map((product: IProductItem) => product[this.type]);
    const fieldsListFormatted: (string | number)[] = [...new Set(fieldsList)]; // убираем повторения;

    //если фильтры по цене и рейтингу, то формируем диапазон [minPrice, maxPrice]

    if (this.type === 'price' || this.type === 'rating') {
      const rangeArr = (fieldsListFormatted as number[]).sort((a, b) => a - b);
      const range = [rangeArr[0], rangeArr[rangeArr.length - 1]];
      return range;
    }
    return fieldsListFormatted;
  }

  render(products: IProductItem[]): string {
    const arrayFilter = this.getFilterFieldList(products);
    let innerHTML = '';
    if (this.type === 'price' || this.type === 'rating') {
      innerHTML = `
          <div class="filter__slider">
          <h3 class="filter__title">${this.type}</h3>
              <div class="filter__slider-track"></div>
              <input type="range" 
                     min=${0} 
                     max=${arrayFilter[1]} 
                     value="30"
                     name="${this.type}">
              <input type="range"
                     min=${0} 
                     max=${arrayFilter[1]}
                     value="2"
                     name="${this.type}">
          </div>`;
    }
    if (this.type === 'brand' || this.type === 'category') {
      let filtersListHTML = '';
      arrayFilter.forEach((filterItem) => {
        filtersListHTML += `
          <div class="filter__checkbox-item">
            <label for="${filterItem}"><input type="checkbox" name="${this.type}" id ="${filterItem}">${filterItem}</label>
          </div>`;
      });
      innerHTML = `<h3 class="filter__title">${this.type}</h3>` + `<div class="filter__list">${filtersListHTML}</div>`;
    }
    return innerHTML;
  }
}

export { Filter, filtersTypes };
