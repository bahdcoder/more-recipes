import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';

import config from '../../config';
import { fetchHomePageDataEpic } from './recipesEpic';

const rootEpic = (...args) => combineEpics(fetchHomePageDataEpic)(
  ...args,
  { ajax, apiUrl: config.apiUrl }
);

export default rootEpic;
