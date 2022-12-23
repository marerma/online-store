import { IProductItem } from '../main/interface/Iproducts';
import { cartStatement, setState } from './local-storage/cart-storage';
import { getSelector } from '../../functions/utils';
import { clearContent } from '../../router/router';
import { countAmountOfItems } from './local-storage/cart-storage';
import { showTotalCost } from './local-storage/cart-storage';
import { decreaseCartIcon, increaseCartIcon } from './cart-icon/icon';

class CartPage {
  loadPage(elements?: IProductItem[] | string[]) {
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
          <div class="cart__inner"></div>
        </div>

        <div class="cart__summary">
        </div>
      `;
      countAmountOfItems();
      renderCartInner();
      showTotalCost();
    }
  }

  renderCart() {
    clearContent();
    const main = getSelector(document, '.main-content'),
      div = document.createElement('div');

    div.classList.add('cart');

    main.append(div);
  }
}

function renderCartInner() {
  countAmountOfItems();

  const productsInCart = cartStatement.inCart,
    productsAmount = cartStatement.inCartAmount,
    products = Object.keys(productsAmount),
    productsOnScreen = getSelector(document, '.cart__inner');

  products.forEach((product, i) => {
    const parsedProduct = JSON.parse(product),
      wrapper = document.createElement('div'),
      amount = productsAmount[product];

    wrapper.classList.add('cart__inner-item');
    wrapper.innerHTML = `
      <div class="cart__inner-index">${i + 1}</div>
      <img class="cart__inner-thumbnail" src="${parsedProduct.thumbnail}"></img>
      <div class="cart__inner-description">
        <div class="product__title">${parsedProduct.title}</div>
        <div class="product__description">${parsedProduct.description}</div>
        <div class="product__rest">
          <div class="product__rest-prop">Rating: ${parsedProduct.rating}</div>
          <div class="product__rest-prop">Price: €${parsedProduct.price}</div>
          <div class="product__rest-prop">Discount: ${parsedProduct.discountPercentage}%</div>
        </div>
      </div>
      <div class="cart__inner-amount">
        <div class="stock">Stock: ${parsedProduct.stock}</div>
        <div class="amount__changers">
          <button class="amount__changers-decrease">-</button>
          <div class="amount__changers-number">${amount}</div>
          <button class="amount__changers-increase">+</button>
        </div>
        <div class="item__cost">€${parsedProduct.price * amount}</div>
      </div>
    `;

    productsOnScreen.append(wrapper);
    wrapper.dataset.index = parsedProduct.id;
  });

  const renderedProducts: Element[] = Array.from(document.getElementsByClassName('cart__inner-item'));

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

const loadCartPage = new CartPage();

export { loadCartPage, CartPage };
