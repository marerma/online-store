import ProductList from './productList';

export class Catalogue {
  catalogue: ProductList;
  root: HTMLElement | null = document.querySelector('body'); // согласовать селектор в зависимости от главной страницы!
  constructor() {
    this.catalogue = new ProductList();
  }
  loadCatalogue() {
    const catalogueHtml = this.catalogue.render();
    if (this.root) {
      this.root.innerHTML = catalogueHtml;
    } else {
      return false;
    }
  }
}
