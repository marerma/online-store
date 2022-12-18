import { IProductItem } from '../main/interface/Iproducts';
import { icon } from './cart-icon/icon';
import { cartStatement } from './local-storage/cart-storage';
import { getSelector } from '../../functions/utils';

class CartPage {
  main: HTMLElement;

  constructor() {
    this.main = getSelector(document, '.main-content');
  }

  loadPage() {
    this.renderCart();
  }

  renderCart() {
    if (cartStatement.counter === 0) {
      this.main.innerHTML = 'Cart is empty.';
    } else {
      this.main.innerHTML = 'Cart is not empty.';
      console.log(cartStatement);
    }
  }
}

const loadCartPage = new CartPage();

export { loadCartPage };
