import { shopCatalogue } from './catalogue/index';
import { filtersList } from './filters/index';

class MainPage {
  title = 'Main';
  constructor() {
    document.title = this.title;
  }
  loadPage() {
    filtersList.loadFilters();
    shopCatalogue.loadCatalogue();
  }
}
const loadMainPage = new MainPage();

loadMainPage.loadPage();

export * from './index';
