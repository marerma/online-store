import { IProductItem } from '../main/interface/Iproducts';
import { cartStatement } from './local-storage/cart-storage';
import { getSelector } from '../../functions/utils';
import { clearContent } from '../../router/router';

class CartPage {
  loadPage(elements: IProductItem[]) {
    clearContent();
    this.renderCart();

    const container = getSelector(document, '.cart');

    if (cartStatement.counter === 0) {
      container.innerHTML = 'Cart is empty.';
    } else {
      container.innerHTML = `
        <div class="cart__products">
          <div class="cart__products-header">
            <div class="header__name">Products in Cart</div>
            <div class="items__amount">
              <div class="items__amount-text">Items:</div>
              <input class="items__amount-num" type="number"></input>
            </div>
            <div class="page">
              <div class="page__text">Page:</div>
              <button class="page__less"><</button>
              <div class="page__current">1</div>
              <button class="page__less">></button>
            </div>
          </div>
        </div>

        <div class="cart__summary">
        </div>
      `;

      const productsInCart = cartStatement.inCart;

      productsInCart.forEach((item, i) => {
        // console.log(item.id);
        // if (productsInCart.indexOf(item) !== i) {
        //   console.log(i);
        // }
      });
    }
  }

  renderCart() {
    const main = getSelector(document, '.main-content'),
      div = document.createElement('div');

    div.classList.add('cart');

    main.append(div);
  }
}

const loadCartPage = new CartPage();

export { loadCartPage };
