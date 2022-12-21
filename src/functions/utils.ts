import { IProductItem } from '../components/main/interface/Iproducts';

function getSelector(parent: DocumentFragment | Document | Element, selector: string) {
  const item = parent.querySelector(selector);
  if (!(item instanceof HTMLElement)) {
    throw new Error(`Can't find selector: ${selector}`);
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

export { getSelector, getDataBase64, appendImage, getIntersectionsInArray };
