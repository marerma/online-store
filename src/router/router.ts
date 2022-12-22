import { loadMainPage } from '../components/main/index';
import { loadErrorPage } from '../components/error-page';
import { loadProductPage } from '../components/product-details';
import { loadCartPage } from '../components/cart';
import { PRODUCTS_DB } from '../data/data';

const route = (event: Event) => {
  event = event || window.event;
  event.preventDefault();
  // window.history.pushState({}, '', event.target?.href);
  handleLocation();
};

const routes: Routes = {
  404: () => loadErrorPage.loadPage(),
  '/': () => loadMainPage.loadPage(),
  '/cart': () => loadCartPage.loadPage(PRODUCTS_DB),
};

const handleLocation = async () => {
  const path: string = window.location.pathname,
    route = routes[path] || routes[404];
  route();
};

const clearContent = () => {
  const children = document.querySelector('.main-content')?.childNodes;

  children?.forEach((item) => {
    item.remove();
  });
};

PRODUCTS_DB.forEach((item) => {
  routes[`/product-${+item.id}`] = () => loadProductPage.renderItem(PRODUCTS_DB, +item.id);
});

window.addEventListener('popstate', () => {
  clearContent();
  handleLocation();
});

//window.route = route;
handleLocation();

export { clearContent, route, handleLocation };
