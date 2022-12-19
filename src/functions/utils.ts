function getSelector(parent: DocumentFragment | Document | Element, selector: string) {
  const item = parent.querySelector(selector);
  if (!(item instanceof HTMLElement)) {
    throw new Error('There is no items');
  } else {
    return item;
  }
}

function getDataBase64() {
  return (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
}

function appendImage(parentSelector: string, className: string, path: string) {
  const img = document.createElement('img'),
    parent = document.querySelector(parentSelector);

  img.classList.add(className);
  img.src = path;

  parent?.append(img);
}

export { getSelector, getDataBase64, appendImage };
