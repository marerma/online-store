import { HTMLComponent, IProductItem } from '../interface/productItem';
import ProductComponent from '../catalogue/productItem';
import { PRODUCTS_DB } from '../../../data/data';

export default class ProductList implements HTMLComponent {
  private productsList: IProductItem[];
  constructor() {
    this.productsList = PRODUCTS_DB;
  }

  render() {
    return `
    <div class="product-list">
      ${this.productsList.map((product) => new ProductComponent(product).render()).join('')}
    </div>`;
  }
}
