import { MainRender } from './catalogue/index';
import { Loader } from './catalogue/loader';
import { IApiResponse, IProductItem } from './interface/Iproducts';
import { loadProductPage } from '../product-details';
import { clearContent } from '../../router/router';
import { cartButton } from '../cart/cart-icon/icon';
import { loadCartPage } from '../cart';
import { parseQuery, checkQueryString } from '../../functions/utils';
import { showTotalCost } from '../cart/local-storage/cart-storage';

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
        const element = document.querySelector('.main-content') as HTMLElement;
        //element?.append(filtersList.loadFilters(products), shopCatalogue.loadCatalogue(products));

        const mainContent = new MainRender(element);
        mainContent.load(products);

        if (!checkQueryString()) {
          const paramObj = parseQuery(window.location.search);
          mainContent.filters.setFilterStateFromQuery(products, paramObj);
        }

        loadProductPage.loadPage(products);

        showTotalCost();
      });
  }
}

cartButton.addEventListener('click', () => {
  loadCartPage.loadPage();
  history.pushState({}, '', `cart`);
});

const loadMainPage = new MainPage();

export { loadMainPage };
