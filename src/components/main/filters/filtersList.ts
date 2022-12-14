import { Filter } from './filtersClass';
import { HTMLComponent } from '../interface/Iproducts';

// класс для формирования списка всех фильтров: 2 с чекбоксами и 2 со слайдерами

class FiltersList implements HTMLComponent {
  readonly typesList: ['brand', 'category', 'price', 'rating'];
  root: HTMLElement | null = document.querySelector('.main-content');
  filterComponent: HTMLElement = document.createElement('div');

  constructor() {
    this.typesList = ['brand', 'category', 'price', 'rating'];
  }

  render() {
    let innerHTML = '';
    this.typesList.forEach((filterName) => {
      innerHTML += new Filter(filterName).render();
    });
    return innerHTML;
  }

  loadFilters() {
    this.filterComponent.innerHTML = this.render();
    this.filterComponent.className = 'filters__container';
    return this.filterComponent;
  }
}

export { FiltersList };
