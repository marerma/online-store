import { shopCatalogue } from './catalogue/index';
import { filtersList } from './filters/index';

class MainPage {
  title = 'Online Store';
  constructor() {
    document.title = this.title;
  }
  loadPage() {
    return [filtersList.loadFilters(), shopCatalogue.loadCatalogue()];
  }
}
const loadMainPage = new MainPage();

export { loadMainPage };
