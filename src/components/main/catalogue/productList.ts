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

  filter(filterName: string, filterField: string[]) {
    if (
      filterField.length !== 0 &&
      (filterName === 'brand' || filterName === 'category' || filterName === 'price' || filterName === 'rating')
    ) {
      const filteredProducts = this.productsList.filter((el) => {
        const a = String(el[filterName]);
        if (filterField.includes(a)) {
          return a;
        }
      });
      const filteredProductsID = filteredProducts.map((el) => el.id);
      return filteredProductsID;
    }
  }
}
