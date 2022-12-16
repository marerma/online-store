import { getSelector } from '../../functions/utils';
import { PRODUCTS_DB } from '../../data/data';

class ProductPage {
  renderItem() {
    const items = Array.from(document.getElementsByClassName('product-item'));
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target === item.querySelector('.product-item__details')) {
          console.log(item);
          this.loadPage(+item.id);
          history.pushState(null, '', `product-${+item.id}`);
        }
      });
    });
  }

  loadPage(x: number) {
    PRODUCTS_DB.forEach((item) => {
      if (item.id === x) {
        console.log(item);
      }
    });
    getSelector(document, '.main-content').innerHTML = x.toString();
  }
}

export const loadProductPage = new ProductPage();
