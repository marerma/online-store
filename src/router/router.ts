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

const handleLocation = () => {
  const path: string = window.location.pathname,
    route = routes[path] || routes[404];

  route(); // вот тут получается, что по ключу объекта вызывается метод
};

// добавил обнуление контента при нажатии "назад/вперед"
const clearContent = () => {
  const children = document.querySelector('.main-content')?.childNodes;

  children?.forEach((item) => {
    item.remove();
  });
};

PRODUCTS_DB.forEach((item) => {
  routes[`/product-${+item.id}`] = () => loadProductPage.renderItem(+item.id);
});

window.addEventListener('popstate', () => {
  clearContent();
  handleLocation();
});

window.route = route;
handleLocation();

export { clearContent };
