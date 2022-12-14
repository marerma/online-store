import { loadMainPage } from '../components/main/index';

const route = (event: Event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target?.href);
  handleLocation();
};

const routes: Routes = {
  404: '/components/error-page/error.html',
  '/': loadMainPage.loadPage(),
  '/cart': '/components/cart/cart.html',
  '/description': '/components/description/description.html',
};

const handleLocation = () => {
  const path: string = window.location.pathname,
    route = routes[path] || routes[404],
    container = getSelector(document, '.main-content');

  route.forEach((block: string | Node) => container.append(block));
};

window.addEventListener('popstate', () => {
  handleLocation();
});
window.route = route;
handleLocation();

function getSelector(parent: DocumentFragment | Document, selector: string) {
  const item = parent.querySelector(selector);
  if (!item) throw new Error(`Selector ${selector} didn't match any elements.`);
  return <HTMLElement>item;
}

export * from './router';
