import { loadCartPage } from '..';
import { getSelector } from '../../../functions/utils';
import { cartStatement, countAmountOfItems, setState, showTotalCost } from '../local-storage/cart-storage';

export function addAmountChangers() {
  const renderedProducts: Element[] = Array.from(document.getElementsByClassName('cart__inner-item'));
  const productsInCart = cartStatement.inCart;

  renderedProducts.forEach((product) => {
    if (product && product instanceof HTMLElement) {
      const index = product.dataset.index;

      product.addEventListener('click', (e) => {
        for (let i = 0; i < productsInCart.length; i++) {
          const parsedItem = JSON.parse(productsInCart[i]);

          if (e.target === getSelector(product, '.amount__changers-decrease') && index == parsedItem.id) {
            productsInCart.splice(i, 1);
            countAmountOfItems();
            showTotalCost();
            setState();
            loadCartPage.loadPage(productsInCart);
            break;
          }

          if (e.target === getSelector(product, '.amount__changers-increase') && index == parsedItem.id) {
            const amountItem = getSelector(document, '.amount__changers-number');

            if (parsedItem.stock > +(<string>amountItem.textContent)) {
              productsInCart.push(productsInCart[i]);
            } else {
              alert('No more items in stock :(');
            }

            productsInCart.forEach((item, j) => {
              const lastPushed = productsInCart.slice(-1).pop();
              if (item === lastPushed) {
                productsInCart.splice(j, 0, lastPushed);
                productsInCart.pop();
              }
            });

            countAmountOfItems();
            showTotalCost();
            setState();
            loadCartPage.loadPage(productsInCart);
            break;
          }
        }
      });
    }
  });
}
