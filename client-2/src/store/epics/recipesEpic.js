import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import { FETCH_HOME_PAGE_DATA } from '../actions/recipes/recipeActions';

const recipeEpic = actionStream =>
  actionStream.filter(action => action.type === FETCH_HOME_PAGE_DATA)
    .mapTo({ type: 'PONG_PIDI_PONG' });

export default recipeEpic;
