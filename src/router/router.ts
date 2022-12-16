import { loadMainPage } from '../components/main/index';
import { loadErrorPage } from '../components/error-page';
import { loadProductPage } from '../components/product-details';
import { PRODUCTS_DB } from '../data/data';

const route = (event: Event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target?.href);
  handleLocation();
};

const routes: Routes = {
  404: () => loadErrorPage.loadPage(),
  '/': () => loadMainPage.loadPage(), // вот тут получается, что по ключу вызывается метод, а в main я добавила, что загрузка идет в main-content
  '/cart': '/components/cart/cart.html',
};

PRODUCTS_DB.forEach((item) => {
  routes[`/product-${+item.id}`] = () => loadProductPage.loadPage(+item.id);
});

const handleLocation = () => {
  const path: string = window.location.pathname,
    route = routes[path] || routes[404];
  //container = getSelector(document, '.main-content');
  route(); // вот тут получается, что по ключу объекта вызывается метод
  //route.forEach((block: string | Node) => container.append(block));
};

window.addEventListener('popstate', () => {
  handleLocation();
});
window.route = route;
handleLocation();

export { routes };
