export class DisplayOptions {
  displayComponent = document.createElement('div');
  displayValue = 'default';

  getDisplayValue() {
    return this.displayValue;
  }

  setDisplayValue(value: string) {
    if (value === 'table' || value === 'list') {
      this.displayValue = value;
    } else {
      this.displayValue = 'default';
    }
  }

  render() {
    this.displayComponent.classList.add('products__display-options');
    this.displayComponent.innerHTML = `
      <span class="products__display-icon active-icon" id="table"></span>
      <span class="products__display-icon" id="list"></span>`;

    return this.displayComponent;
  }

  makeQuery() {
    const displayValue = this.getDisplayValue();
    if (displayValue === 'default') {
      return '';
    } else {
      return `display=${displayValue}`;
    }
  }

  changeProductsView() {
    const displayedProducts = document.querySelector('.product-list');
    if (displayedProducts instanceof HTMLElement) {
      displayedProducts.className = `product-list product-list-${this.getDisplayValue()}`;
    }
    this.addActiveStyle();
  }

  addActiveStyle() {
    let id = this.getDisplayValue();
    if (id === 'default') {
      id = 'table';
    }
    const icons = [...document.querySelectorAll('.products__display-icon')];
    const icon = document.getElementById(`${id}`);

    if (icon instanceof HTMLElement) {
      icons.forEach((item) => item.classList.remove('active-icon'));
      icon.className = 'products__display-icon active-icon';
    }
  }
}
