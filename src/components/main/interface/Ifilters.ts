import { IProductItem } from './Iproducts';
export default interface IFilter {
  type: string;
  productList: IProductItem[];
  getProductList(): IProductItem[];
  render(): string;
}
