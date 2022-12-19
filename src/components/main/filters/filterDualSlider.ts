import { FilterBase, filtersTypes } from './filterBase';
import { IProductItem } from '../interface/Iproducts';

export class FilterSliderRange extends FilterBase {
  constructor(type: filtersTypes, products: IProductItem[]) {
    super(type, products);
  }

  getRangeData() {
    const filterItems = this.getFilterFieldList(this.products);
    const rangeArr = (filterItems as number[]).sort((a, b) => a - b);
    const rangeData = [rangeArr[0], rangeArr[rangeArr.length - 1]];
    return rangeData;
  }

  render() {
    const valuesData = this.getRangeData();
    const sliderHTML = `
            <div class="filter__slider">
            <h3 class="filter__title">${this.type}</h3>
                <div class="filter__slider-track"></div>
                <input type="range" 
                       min=${valuesData[0]} 
                       max=${valuesData[1]} 
                       value="${(valuesData[1] - valuesData[0]) / 2}"
                       name="${this.type}">
                <input type="range"
                       min=${valuesData[0]} 
                       max=${valuesData[1]}
                       value="${(valuesData[1] - valuesData[0]) / 2}"
                       name="${this.type}">
            </div>`;
    return sliderHTML;
  }
  upDateAmount() {
    return true;
  }
}
