import { getSelector } from '../../../functions/utils';
import { cartStatement, setState } from '../local-storage/cart-storage';
import { addAmountChangers } from './amountChangers';
import { paginationData } from './renderCart';

export function paginate() {
  const currentPageDiv = getSelector(document, '.page__current'),
    forwardButton = getSelector(document, '.page__forward'),
    backButton = getSelector(document, '.page__back'),
    amountItemsInput = document.querySelector('.items__amount-num'),
    productsOnScreen = getSelector(document, '.cart__inner');

  let currentPage = cartStatement.currentPage;

  displayList(paginationData, cartStatement.itemsPerPage, currentPage);

  forwardButton.addEventListener('click', () => {
    currentPage++;
    displayOtherPage();
    setQuery();
  });

  backButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayOtherPage();
      setQuery();
    }
  });

  if (amountItemsInput instanceof HTMLInputElement) {
    amountItemsInput.addEventListener('change', () => {
      cartStatement.itemsPerPage = +amountItemsInput.value;
      displayList(paginationData, cartStatement.itemsPerPage, currentPage);
      setState();
      setQuery();
    });
  }

  function displayList(data: HTMLDivElement[], rowPerPage: number, page: number) {
    productsOnScreen.innerHTML = '';
    page--;

    const start = rowPerPage * page,
      end = start + rowPerPage,
      paginatedData = data.slice(start, end);

    if (paginatedData.length === 0) {
      currentPage--;
      displayOtherPage();
      setQuery();
    }

    paginatedData.forEach((item) => {
      productsOnScreen.append(item);
    });
  }

  function displayOtherPage() {
    addAmountChangers();
    currentPageDiv.innerHTML = currentPage.toString();
    cartStatement.currentPage = currentPage;
    setState();
    displayList(paginationData, cartStatement.itemsPerPage, currentPage);
  }

  function setQuery() {
    if (window.location.href.includes('cart')) {
      const url = new URL(window.location.href);
      url.searchParams.set('page', cartStatement.currentPage.toString());
      url.searchParams.set('limit', cartStatement.itemsPerPage.toString());
      history.pushState({}, '', url.search);
    }
  }
}
