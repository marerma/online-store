import { getSelector } from '../../functions/utils';
import { PRODUCTS_DB } from '../../data/data';
import { IProductItem } from '../main/interface/Iproducts';

class ProductPage {
  loadPage() {
    const items = Array.from(document.getElementsByClassName('product-item'));

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target === item.querySelector('.product-item__details')) {
          this.renderItem(+item.id);
          history.pushState(null, '', `product-${+item.id}`);
        }
      });
    });
  }

  renderItem(x: number) {
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
                <div class="product__info-images">
                  <div class="side-images"></div>
                  <div class="head-image"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        this.renderImages(item);
        this.addImageChanger();
      }
    });
  }

  renderImages(product: IProductItem) {
    const renderImage = (parentSelector: string, className: string, path: string) => {
      const img = document.createElement('img'),
        parent = document.querySelector(parentSelector);

      img.classList.add(className);
      img.style.backgroundImage = `url(${path})`;

      parent?.append(img);
    };

    renderImage('.head-image', 'thumbnail', product.thumbnail);

    product.images.forEach((url: string) => {
      renderImage('.side-images', 'product__image', url);
    });
  }

  addImageChanger() {
    const sideImages = getSelector(document, '.side-images'),
      thumbnail = getSelector(document, '.thumbnail');

    sideImages.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;

      thumbnail.style.backgroundImage = target?.style.backgroundImage;
    });
  }
}

const loadProductPage = new ProductPage();

export { loadProductPage };
