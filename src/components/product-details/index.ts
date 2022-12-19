import { getSelector } from '../../functions/utils';
import { PRODUCTS_DB } from '../../data/data';
import { IProductItem } from '../main/interface/Iproducts';
import { loadThumbnail, loadImages } from './images/images';
import { cartStatement, getState, setState, Cart } from '../cart/local-storage/cart-storage';
import { increaseCartIcon } from '../cart/cart-icon/icon';

class ProductPage {
  loadPage() {
    const items = Array.from(document.getElementsByClassName('product-item'));

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target === getSelector(item, '.product-item__details')) {
          this.renderItem(+item.id);
          window.history.pushState({}, '', `product-${+item.id}`);
        }

        if (e.target === getSelector(item, '.product-item__buy')) {
          cartStatement.inCart.push(+item.id);
          increaseCartIcon();
        }
      });
    });
  }

  renderItem(x: number) {
    PRODUCTS_DB.forEach((item: IProductItem) => {
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
          addToCart(+item.id);
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

function addToCart(item: number) {
  const cart: number[] = cartStatement.inCart;
  cart.push(item);
  increaseCartIcon();
  setState();
}

const loadProductPage = new ProductPage();

export { loadProductPage };
