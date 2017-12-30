import { combineEpics } from 'redux-observable';
import fetchHomePageDataEpic from './recipesEpic';

const rootEpic = combineEpics(fetchHomePageDataEpic);

export default rootEpic;
