import { Observable } from 'rxjs/Observable';

import normalizeRecipes from './../helpers';
import { fetchHomePageDataFulfilled, fetchHomePageDataFailed } from './../../actions/recipes/index';
import { FETCH_HOME_PAGE_DATA } from '../../actions/recipes/recipeActions';

export const fetchHomePageDataEpic = (actionStream, store, { ajax, apiUrl }) =>
  actionStream.ofType(FETCH_HOME_PAGE_DATA)
    .mergeMap(() =>
      ajax.getJSON(`${apiUrl}/frontend/home`)
        .map(response => response.data)
        .map(data => data.mostFavoritedRecipes.concat(data.latestRecipes))
        .map(recipes => normalizeRecipes(recipes))
        .map(recipes => fetchHomePageDataFulfilled(recipes))
        .catch(error => Observable.of(fetchHomePageDataFailed(error))));

export default fetchHomePageDataEpic;
