import { HTMLComponent, IProductItem } from '../interface/Iproducts';
import ProductComponent from '../catalogue/productItem';
import { PRODUCTS_DB } from '../../../data/data';

export default class ProductList implements HTMLComponent {
  productsList: IProductItem[];
  constructor() {
    this.productsList = [...PRODUCTS_DB]; //TODO: здесь бы по идее надо как-то асинхронность, но я пока не поняла как
  }

  render() {
    return `
    <div class="product-list">
      ${this.productsList.map((product) => new ProductComponent(product).render()).join('')}
    </div>`;
  }
}
