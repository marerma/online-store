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
                  <div class="side__images"></div>
                  <div class="head__image"></div>
                </div>
                <div class="product__info-details">
                  <div class="">
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
    renderImage('.head__image', 'thumbnail', product.thumbnail);

    getImages(product.images);
  }

  addImageChanger() {
    const sideImages = getSelector(document, '.side__images'),
      thumbnail = <HTMLImageElement>getSelector(document, '.thumbnail');

    sideImages.addEventListener('click', (e) => {
      const target = <HTMLImageElement>e.target;
      thumbnail.src = target.src;
    });
  }
}

const renderImage = (parentSelector: string, className: string, path: string) => {
  const img = document.createElement('img'),
    parent = document.querySelector(parentSelector);

  img.classList.add(className);
  img.src = path;

  parent?.append(img);
};

async function getImages(array: string[]): Promise<void> {
  const arr: unknown[] = [];

  for (let i = 0; i < array.length; i++) {
    const response = await fetch(array[i]);
    const blob = response.blob().then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
    arr.push(blob);
  }

  Promise.all(arr).then((res) => {
    const unique = res.filter((item, index) => {
      return res.indexOf(item) === index;
    });

    for (let i = 0; i < unique.length; i++) {
      renderImage('.side__images', 'side__images-item', <string>unique[i]);
    }
  });
}

const loadProductPage = new ProductPage();

export { loadProductPage };
