import { getSelector } from '../../../functions/utils';
import { renderCartIcon, cartCounter } from '../cart-icon/icon';

let cartStatement: Cart;

if (localStorage.getItem('cartStatement')) {
  cartStatement = getState();
} else {
  cartStatement = {
    inCart: [],
    inCartAmount: {},
    counter: 0,
  };
}

function setState() {
  localStorage.setItem('cartStatement', JSON.stringify(cartStatement));
}

function getState() {
  return JSON.parse(<string>localStorage.getItem('cartStatement'));
}

function countAmountOfItems() {
  cartStatement.inCartAmount = cartStatement.inCart.reduce((item: Amount, id) => {
    item[id] = (item[id] || 0) + 1;
    if (item[id] === 0) delete item[id];
    return item;
  }, {});

  let sum = 0;

  for (const key in cartStatement.inCartAmount) {
    sum += cartStatement.inCartAmount[key];
  }

  cartStatement.counter = sum;

  getSelector(document, '.cart-count').textContent = cartStatement.counter.toString();
}

function showTotalCost() {
  let sum = 0;

  cartStatement.inCart.forEach((item: string) => {
    sum += +JSON.parse(item).price;
  });

  getSelector(document, '.money-counter').innerHTML = `€${sum.toString()}`;
}

interface Cart {
  inCart: string[];
  inCartAmount: Amount;
  counter: number;
}

type Amount = { [key: string]: number };

export { cartStatement, getState, setState, Cart, Amount, countAmountOfItems, showTotalCost };
