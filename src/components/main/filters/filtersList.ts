import { Filter } from './filtersClass';
import { HTMLComponent } from '../interface/Iproducts';
import { shopCatalogue } from '../catalogue/index';

// класс для формирования списка всех фильтров: 2 с чекбоксами и 2 со слайдерами

class FiltersList implements HTMLComponent {
  readonly typesList: ['brand', 'category', 'price', 'rating'];
  root: HTMLElement | null = document.querySelector('.main-content');
  filterComponent: HTMLElement = document.createElement('div');
  static activeFilters: { [x: string]: string[] };

  constructor() {
    this.typesList = ['brand', 'category', 'price', 'rating'];
    FiltersList.activeFilters = { brand: [], category: [], price: [], rating: [] };
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
    this.addListener();
    return this.filterComponent;
  }

  addListener() {
    this.filterComponent.addEventListener('input', (e) => {
      const clickedFilterField = e.target as HTMLInputElement;

      //проверяем, есть ли у цели аттрибут checked, если нет, то устанавливаем его,
      // если есть - проверяем, в каком он положении и меняем

      if (clickedFilterField.getAttribute('checked')) {
        clickedFilterField.getAttribute('checked') === 'true'
          ? clickedFilterField.setAttribute('checked', 'false')
          : clickedFilterField.setAttribute('checked', 'true');
      } else {
        clickedFilterField.setAttribute('checked', 'true');
      }

      // находим на странице все выбранные чекбоксы в положении true,
      // собираем из них объект для дальнейшей фильтрации по базе данных по ключу "название фильтра": [значения];
      // присваиваем статическому свойству класса этот объект,
      // т.о. он будет доступен для формирования query и быстрого сохранения в LS

      const allCheckedInputs = [...document.getElementsByTagName('input')];
      const checkedFieldNames = allCheckedInputs
        .filter((input) => input.type === 'checkbox')
        .forEach((checkbox) => {
          const key = checkbox.name;
          if (checkbox.checked === true) {
            if (!FiltersList.activeFilters[key].includes(checkbox.id)) {
              FiltersList.activeFilters[key].push(checkbox.id);
            }
          } else {
            if (FiltersList.activeFilters[key].includes(checkbox.id)) {
              const indexNotChecked = FiltersList.activeFilters[key].indexOf(checkbox.id);
              FiltersList.activeFilters[key].splice(indexNotChecked, 1);
            }
          }
        });
      hideProducts('.product-item');
    });
  }
}
export { FiltersList };

// функция отбирает продукты на странице по селектору и
// проходит по ним, добавляя display: none всем продуктам,
// а затем показывает только те, которые соответветствуют фильтру

function hideProducts(selector: string) {
  const productsCards = [...document.querySelectorAll(selector)];
  productsCards.forEach((card) => card.classList.add('hidden'));

  for (const key in FiltersList.activeFilters) {
    const filterField = FiltersList.activeFilters[key];
    const filteredID = shopCatalogue.catalogue.filter(key, filterField);

    filteredID?.forEach((el) => {
      const id = String(el);
      (document.getElementById(id) as HTMLElement).classList.remove('hidden');
    });
  }
}
