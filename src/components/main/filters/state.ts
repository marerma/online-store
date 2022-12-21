import { filtersList } from './index';
import { searchComponent } from './search';
import { sortComponent } from './sortProducts';

class QueryFilterState {
  generateCommonQuery() {
    const queryAll = [filtersList.makeQuery(), sortComponent.makeQuery(), searchComponent.makeQuery()]
      .filter((str) => str)
      .join('&');
    const query = queryAll.length === 0 ? '' : `?${queryAll}`;
    return query;
  }
  syncURL() {
    const path = document.location.pathname;
    const query = this.generateCommonQuery();
    window.history.pushState({}, '', `${path}${query}`);
  }
}

export const stateForQuery = new QueryFilterState();
