import ProductList from './productList';

export class Catalogue {
  catalogue: ProductList;
  root: HTMLElement | null = document.querySelector('.main-content'); // согласовать селектор в зависимости от главной страницы!
  catalogueComponent: HTMLElement = document.createElement('div');

  constructor() {
    this.catalogue = new ProductList();
  }

  loadCatalogue() {
    this.catalogueComponent.innerHTML = this.catalogue.render();
    this.catalogueComponent.className = 'catalogue__container';
    return this.catalogueComponent;
  }
}
