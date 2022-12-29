import { IProductItem } from '../components/main/interface/Iproducts';

function getSelector(parent: DocumentFragment | Document | Element, selector: string) {
  const item = parent.querySelector(selector);
  if (item instanceof HTMLElement) {
    return item;
  } else {
    throw new Error(`Can't find selector: ${selector}`);
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

function getIntersectionsInArray(object: { [x: string]: IProductItem[] }) {
  const values = Object.values(object);
  const result: IProductItem[] = [];
  if (values.some((arr) => arr.length === 0)) {
    return result;
  } else {
    let result: IProductItem[] = values[0];
    for (let i = 1; i < values.length; i++) {
      result = [...result.filter((el) => values[i].includes(el))];
    }
    return result;
  }
}

function copyURLtoClipboard() {
  const url = window.location.href;
  const element = document.createElement('textarea');
  element.value = url;
  element.setAttribute('readonly', '');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
}

function parseQuery() {
  const url = window.location.href,
    paramObj: { [x: string]: string[] } = {};

  if (url.includes('?')) {
    const query = url.split('?')[1],
      paramsFromUrl = new URLSearchParams(query);

    for (const [key, value] of paramsFromUrl.entries()) {
      paramObj[key] = value.split(',');
    }
  }

  return paramObj;
}

export { getSelector, getDataBase64, appendImage, getIntersectionsInArray, copyURLtoClipboard, parseQuery };
