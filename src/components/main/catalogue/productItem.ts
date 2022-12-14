import { IProductItem, HTMLComponent } from '../interface/Iproducts';

export default class ProductComponent implements HTMLComponent {
  product: IProductItem;
  constructor(product: IProductItem) {
    this.product = product;
  }

  //TODO: проверка загрузки или асинхронный запрос картинки, т.к. могут быть битые ссылки или картинка не загрузится
  render() {
    return `
    <div class="product-item">
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
