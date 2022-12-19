import { getState, setState, cartStatement } from '../local-storage/cart-storage';
import { getSelector } from '../../../functions/utils';

const icon = getSelector(document, '.cart-count');

renderCartIcon();

function renderCartIcon() {
  icon.textContent = cartStatement.counter.toString();
}

function increaseCartIcon() {
  cartStatement.counter++;
  renderCartIcon();
  setState();
}

export { increaseCartIcon, icon };
