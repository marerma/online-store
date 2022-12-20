import { getSelector } from '../../functions/utils';
import { IProductItem } from '../main/interface/Iproducts';
import { loadThumbnail, loadImages } from './images/images';
import { cartStatement, setState, Amount } from '../cart/local-storage/cart-storage';
import { increaseCartIcon } from '../cart/cart-icon/icon';

class ProductPage {
  loadPage(elements: IProductItem[]) {
    const items = Array.from(document.getElementsByClassName('product-item'));

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        const id = +item.id,
          target = e.target;

        if (target === getSelector(item, '.product-item__details')) {
          this.renderItem(elements, id);
          window.history.pushState({}, '', `product-${id}`);
        }

        if (target === getSelector(item, '.product-item__buy') && target instanceof HTMLElement) {
          addToCart(elements, id);
        }
      });
    });
  }

  renderItem(elements: IProductItem[], x: number) {
    elements.forEach((item: IProductItem) => {
      if (item.id === x) {
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
                  <div class="details">
                    <div class="details__header">Description:</div>
                    <div class="details__inner">${item.description}</div>
                  </div>
                  <div class="details">
                    <div class="details__header">Discount Percentage:</div>
                    <div class="details__inner">${item.discountPercentage}</div>
                  </div>
                  <div class="details">
                    <div class="details__header">Rating:</div>
                    <div class="details__inner">${item.rating}</div>
                  </div>
                  <div class="details">
                    <div class="details__header">Stock:</div>
                    <div class="details__inner">${item.stock}</div>
                  </div>
                  <div class="details">
                    <div class="details__header">Brand:</div>
                    <div class="details__inner">${item.brand}</div>
                  </div>
                  <div class="details">
                    <div class="details__header">Category:</div>
                    <div class="details__inner">${item.category}</div>
                  </div>
                </div>
              <div class="product__options">
                <div class="product__options-price">€${item.price}</div>
                <button class="product__options-add">ADD TO CART</button>
                <button class="product__options-buy">BUY NOW</button>
              </div>
              </div>
            </div>
          </div>
        `;

        const addToCartButton = getSelector(document, '.product__options-add');

        addToCartButton.addEventListener('click', () => {
          addToCart(elements, item.id);
        });

        this.appendImages(item);
      }
    });
  }

  appendImages(product: IProductItem) {
    loadThumbnail(product.thumbnail);
    loadImages(product.images);
  }
}

function addToCart(items: IProductItem[], id: number) {
  increaseCartIcon();

  const cartInner = cartStatement.inCart;

  cartInner.push(JSON.stringify(items[id - 1]));

  cartStatement.inCartAmount = cartInner.reduce((item: Amount, id) => {
    item[id] = (item[id] || 0) + 1;
    return item;
  }, {});

  setState();
}

interface ProductInCart {
  item: IProductItem;
  amount: number;
}

const loadProductPage = new ProductPage();

export { loadProductPage, ProductInCart };
