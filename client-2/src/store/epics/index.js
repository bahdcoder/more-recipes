import { combineEpics } from 'redux-observable';
import recipesEpic from './recipesEpic';


const rootEpic = combineEpics(recipesEpic);

export default rootEpic;

