import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';

import config from '../../config';
import normalizeRecipes from './helpers';
import { fetchHomePageDataFulfilled, fetchHomePageDataFailed } from './../actions/recipes/index';
import { FETCH_HOME_PAGE_DATA } from '../actions/recipes/recipeActions';

const fetchHomePageDataEpic = actionStream =>
  actionStream.ofType(FETCH_HOME_PAGE_DATA)
    .mergeMap(() =>
      ajax.getJSON(`${config.apiUrl}/frontend/home`)
        .map(response => response.data)
        .map(data => data.mostFavoritedRecipes.concat(data.latestRecipes))
        .map(recipes => normalizeRecipes(recipes))
        .map(recipes => fetchHomePageDataFulfilled(recipes))
        .catch(error => Observable.of(fetchHomePageDataFailed(error))));

export default fetchHomePageDataEpic;
