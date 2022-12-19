import { setState, cartStatement } from '../local-storage/cart-storage';
import { getSelector } from '../../../functions/utils';

const cartButton = getSelector(document, '.header__container-cart'),
  cartCounter = getSelector(cartButton, '.cart-count');

renderCartIcon();

function renderCartIcon() {
  cartCounter.textContent = cartStatement.counter.toString();
}

function increaseCartIcon() {
  cartStatement.counter++;
  renderCartIcon();
  setState();
}

export { increaseCartIcon, cartCounter, cartButton };
