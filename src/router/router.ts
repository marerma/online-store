const route = (event: Event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target?.href);
  handleLocation();
};

const routes: Routes = {
  404: '/components/error-page/error.html',
  '/': '/components/main/main.html',
  '/cart': '/components/cart/cart.html',
  '/description': '/components/description/description.html',
};

const handleLocation = async () => {
  const path: string = window.location.pathname,
    route = routes[path] || routes[404];
  const htmlInner = await fetch(route).then((data) => data.text());
  getSelector(document, '#wrapper').innerHTML = htmlInner;
};

window.addEventListener('popstate', () => {
  handleLocation();
});
window.route = route;
handleLocation();

interface Routes {
  [index: string]: string;
}

function getSelector(parent: DocumentFragment | Document, selector: string) {
  const item = parent.querySelector(selector);
  if (!item) throw new Error(`Selector ${selector} didn't match any elements.`);
  return <HTMLElement>item;
}

export * from './router';
