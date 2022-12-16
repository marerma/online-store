function getSelector(parent: DocumentFragment | Document, selector: string) {
  const item = parent.querySelector(selector);
  if (!item) throw new Error(`Selector ${selector} didn't match any elements.`);
  return <HTMLElement>item;
}

export { getSelector };
