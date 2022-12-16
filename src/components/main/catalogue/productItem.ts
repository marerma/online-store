import { IProductItem } from '../interface/Iproducts';

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
            <span class="product-item__price">$ ${this.product.price}</span>
            <div class="product-item__button-container">
            <a href="" class="product-item__button">BUY</a>
            <a href="" class="product-item__button">DETAILS</a>
            </div>
        </div>
      </div>`;
  }
}
