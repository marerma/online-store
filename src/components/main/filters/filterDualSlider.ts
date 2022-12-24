import { FilterBase, filtersTypes } from './filterBase';
import { IProductItem } from '../interface/Iproducts';

export class FilterSliderRange extends FilterBase {
  sliderInputOne = document.createElement('input');
  sliderInputOneID = `${this.type}-one`;
  sliderInputTwo = document.createElement('input');
  sliderInputTwoID = `${this.type}-two`;
  sliderValueOne = '';
  sliderValueTwo = '';

  constructor(type: filtersTypes, products: IProductItem[]) {
    super(type, products);
    this.setDefaultState();
  }

  getRangeData() {
    const filterItems = this.getFilterFieldList(this.products);
    const rangeArr = (filterItems as number[]).sort((a, b) => a - b);
    const rangeData = [rangeArr[0], rangeArr[rangeArr.length - 1]];
    return rangeData;
  }

  setDefaultState() {
    const valuesData = this.getRangeData();
    const defaultvalueMin = `${valuesData[0]}`;
    const defaultvalueMax = `${valuesData[1]}`;
    this.sliderValueOne = defaultvalueMin;
    this.sliderValueTwo = defaultvalueMax;
    this.sliderInputOne.id = this.sliderInputOneID;
    this.sliderInputOne.type = 'range';
    this.sliderInputOne.min = '0';
    this.sliderInputOne.max = `${valuesData[1]}`;
    this.sliderInputOne.setAttribute('value', defaultvalueMin);
    this.sliderInputOne.step = '0.1';
    this.sliderInputOne.name = `${this.type}`;
    this.sliderInputTwo.id = this.sliderInputTwoID;
    this.sliderInputTwo.type = 'range';
    this.sliderInputTwo.min = '0';
    this.sliderInputTwo.max = `${valuesData[1]}`;
    this.sliderInputTwo.setAttribute('value', defaultvalueMax);
    this.sliderInputTwo.step = '0.1';
    this.sliderInputTwo.name = `${this.type}`;
    if (this.type === 'price') {
      this.sliderInputOne.step = '1';
      this.sliderInputTwo.step = '1';
    }
    if (this.type === 'rating') {
      this.sliderInputOne.step = '0.1';
      this.sliderInputTwo.step = '0.1';
    }
  }

  render() {
    const valuesData = this.getRangeData();
    const sliderHTML = `
            <div class="filter__slider" id="slider-${this.type}">
            <h3 class="filter__title">${this.type}</h3>
            <div class="filter-values" id="${this.type}-values">
              <span class="filter-values__item" id="${this.type}-value-min">
                ${valuesData[0]}
              </span>
              <span class="filter-values__item" id="${this.type}-value-max">
              ${valuesData[1]}
              </span>
            </div>
              <div class="filter__slider-container">
                <div class="filter__slider-track" id="${this.type}-track"></div>
                ${this.sliderInputOne.outerHTML}
                ${this.sliderInputTwo.outerHTML}
              </div>
            </div>`;
    /*<input id="${this.type}-one"
                      type="range"
                      min=${valuesData[0]}
                      max=${valuesData[1]}
                      value="${(valuesData[1] + valuesData[0]) / 2}"
                      step="0.01"
                      name="${this.type}">
                <input id="${this.type}-two"
                      type="range"
                      min=${valuesData[0]}
                      max=${valuesData[1]}
                      value="${valuesData[1] - valuesData[0]}"
                      step="0.01"
                      name="${this.type}"> */
    return sliderHTML;
  }

  setValue(value: string, id: string) {
    if (id === this.sliderInputOneID) {
      this.sliderValueOne = value;
    }
    if (id === this.sliderInputTwoID) {
      this.sliderValueTwo = value;
    }
  }

  setSavedValues(values: string[]) {
    this.sliderValueOne = values[0];
    this.sliderValueTwo = values[1];
  }

  getValue() {
    return [this.sliderValueOne, this.sliderValueTwo].sort((a, b) => +a - +b);
  }

  setValueSpan() {
    const spanDiv = document.getElementById(`${this.type}-values`);

    if (spanDiv instanceof HTMLElement) {
      spanDiv.innerHTML = `
        <span class="filter-values__item" id="${this.type}-value-min">
                ${this.getValue()[0]}
              </span>
              <span class="filter-values__item" id="${this.type}-value-max">
              ${this.getValue()[1]}
              </span>
        `;
    }
  }

  setOneSpan(message: string) {
    const spanDiv = document.getElementById(`${this.type}-values`);
    if (spanDiv instanceof HTMLElement) {
      spanDiv.innerHTML = `
        <span class="filter-value__one-span">
              ${message}
              </span>
        `;
    }
  }

  updatePointers() {
    const currentInputOne = document.getElementById(`${this.sliderInputOneID}`);
    const currentInputTwo = document.getElementById(`${this.sliderInputTwoID}`);

    const min = `${this.getValue()[0]}`;
    const max = `${this.getValue()[1]}`;
    if (currentInputOne instanceof HTMLInputElement && currentInputTwo instanceof HTMLInputElement) {
      currentInputOne.value = min;
      currentInputTwo.value = max;
    }
  }

  updateState(products: IProductItem[]) {
    const key: keyof IProductItem = this.type;
    const productsValues = products.map((item) => +item[key]);
    if (productsValues.length) {
      const min = Math.min.apply(Math, [...productsValues]);
      const max = Math.max.apply(Math, [...productsValues]);
      this.setValue(`${min}`, this.sliderInputOneID);
      this.setValue(`${max}`, this.sliderInputTwoID);
      if (min === max) {
        this.setOneSpan(`${min}`);
      } else {
        this.setValueSpan();
      }
      this.updatePointers();
    } else {
      this.setOneSpan('Products not found!');
    }
    this.fillColor();
  }

  fillColor() {
    const sliderTrack = document.getElementById(`${this.type}-track`);
    const sliderMaxValue = +this.sliderInputOne.max;
    if (sliderTrack instanceof HTMLElement) {
      const percent1 = (+this.getValue()[0] / sliderMaxValue) * 100;
      const percent2 = (+this.getValue()[1] / sliderMaxValue) * 100;
      sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    }
  }
}
