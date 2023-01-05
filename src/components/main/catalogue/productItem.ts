import { IProductItem } from '../interface/Iproducts';
import { cartStatement } from '../../cart/local-storage/cart-storage';
import { setBuyButtonState } from '../../product-details';

export class ProductComponent {
  product: IProductItem;
  constructor(product: IProductItem) {
    this.product = product;
  }

  render() {
    return `
    <div class="product-item" id=${this.product.id}>
        <img class="product-item__thumb" src=${this.product.thumbnail} alt="${this.product.title}">  
        <div class="product-item__props">
          <h3 product-item__title>${this.product.title}</h3>
            <span class="product-item__price">€${this.product.price}</span>
            <div class="product-item__button-container">
            <button class="product-item__buy">${setBuyButtonState(this.product)}</button>
            <button class="product-item__details">DETAILS</button>
            </div>
        </div>
      </div>`;
  }
}
