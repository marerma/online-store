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
  const valuesNotEmpty = values.filter((item) => item.length !== 0);
  if (valuesNotEmpty.length > 1) {
    const combinedArray = Object.values(object).reduce((acc, item) => {
      return acc.concat(item);
    }, [] as IProductItem[]);
    const cleanedArray = combinedArray.filter((item, index) => combinedArray.indexOf(item) !== index);
    return cleanedArray;
  } else {
    return valuesNotEmpty.flat();
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

function parseQuery(url: string) {
  const paramObj: { [x: string]: string[] } = {};
  if (url.includes('?')) {
    const query = url.split('?')[1];
    const paramsFromUrl = new URLSearchParams(query);
    for (const [key, value] of paramsFromUrl.entries()) {
      paramObj[`${key}`] = value.split(',');
    }
    return paramObj;
  } else {
    return {};
  }
}

function checkQueryString() {
  const enteredQuery = window.location.search;
  const regex = new RegExp('\\?(brand|category|price|rating|search|sort)\\=([\\da-z\\%&])+', 'gi');
  if (enteredQuery && enteredQuery.match(regex)) {
    const paramsObj = parseQuery(window.location.href);
    const isEmpty = JSON.stringify(paramsObj) === '{}';
    return isEmpty;
  }
}

export {
  getSelector,
  getDataBase64,
  appendImage,
  getIntersectionsInArray,
  copyURLtoClipboard,
  parseQuery,
  checkQueryString,
};
