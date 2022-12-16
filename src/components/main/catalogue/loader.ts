import { IApiResponse } from '../interface/Iproducts';

export class Loader {
  baseLink: string;

  constructor(baseLink: string) {
    this.baseLink = baseLink;
  }

  async fetchData(url: string) {
    return fetch(url)
      .then((res: Response) => res.json())
      .then((data): IApiResponse => data)
      .catch((error) => {
        throw new Error(`Something went wrong: ${error}`);
      });
  }
}
