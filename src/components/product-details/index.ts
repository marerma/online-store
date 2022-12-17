import { getSelector } from '../../functions/utils';
import { PRODUCTS_DB } from '../../data/data';

class ProductPage {
  renderItem() {
    const items = Array.from(document.getElementsByClassName('product-item'));

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target === item.querySelector('.product-item__details')) {
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
        getSelector(document, '.main-content').innerHTML = `
          <div class="container__details">
            <div class="crumbs">
              <div class="crumbs__item">Store</div>
              <div class="crumbs__arrow">></div>
              <div class="crumbs__item">${item.category}</div>
              <div class="crumbs__arrow">></div>
              <div class="crumbs__item">${item.brand}</div>
              <div class="crumbs__arrow">></div>
              <div class="crumbs__item">${item.title}</div>
            </div>
            <div class="product">
              <div class="product__title">${item.title}</div>
              <div class="product__info">
                <div class="product__info-images"></div>
              </div>
            </div>
          </div>
        `;
      }
    });
  }
}

export const loadProductPage = new ProductPage();
