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

interface Cart {
  inCart: string[];
  inCartAmount: Amount;
  counter: number;
}

type Amount = { [key: string]: number };

export { cartStatement, getState, setState, Cart, Amount };
