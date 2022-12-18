let cartStatement: Cart;

if (localStorage.getItem('cartStatement')) {
  cartStatement = getState();
} else {
  cartStatement = {
    inCart: [],
    counter: 0,
  };
}

function setState() {
  localStorage.setItem('cartStatement', JSON.stringify(cartStatement));
}

function getState() {
  return JSON.parse(<string>localStorage.getItem('cartStatement'));
}

interface Cart {
  inCart: number[];
  counter: number;
}

export { cartStatement, getState, setState, Cart };
