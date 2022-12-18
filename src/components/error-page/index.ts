class ErrorPage {
  loadPage() {
    const element = document.querySelector('.main-content');
    const errorPage = document.createElement('article');

    errorPage.classList.add('error');
    errorPage.innerHTML = `
      <div class="error__number">
        404
      </div>

      <div class="error__description">
        The page you are looking for doesn't exist.
      </div>
    `;

    element?.append(errorPage);
  }
}

const loadErrorPage = new ErrorPage();

export { loadErrorPage };
