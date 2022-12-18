import { shopCatalogue } from './catalogue/index';
import { filtersList } from './filters/index';
import { Loader } from './catalogue/loader';
import { IApiResponse, IProductItem } from './interface/Iproducts';
import { loadProductPage } from '../product-details';
import { clearContent } from '../../router/router';

class MainPage extends Loader {
  title = 'Online Store';
  constructor() {
    super('https://dummyjson.com/products?limit=100');
    document.title = this.title;
  }
  loadPage() {
    clearContent();

    this.fetchData(this.baseLink)
      .then((data: IApiResponse) => data.products)
      .then((products: IProductItem[]) => {
        const element = document.querySelector('.main-content');

        element?.append(filtersList.loadFilters(products), shopCatalogue.loadCatalogue(products));
        loadProductPage.loadPage();
      });
    //return [filtersList.loadFilters(), shopCatalogue.loadCatalogue()];
  }
}
const loadMainPage = new MainPage();

export { loadMainPage };
