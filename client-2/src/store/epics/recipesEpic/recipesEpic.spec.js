import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { expect } from 'chai';
import { ActionsObservable } from 'redux-observable';

import config from '../../../config';
import { fetchHomePageDataEpic } from './index';
import { FETCH_HOME_PAGE_DATA_FULFILLED } from '../../actions/recipes/recipeActions';
import mockRawRecipes from '../../../mock/rawRecipes.json';
import { fetchHomePageData } from '../../actions/recipes';

describe('the fetchHomePageDataEpic ', () => {
  it('fetches the home page recipes ', (done) => {
    const actionStream = ActionsObservable.of(fetchHomePageData());

    const ajax = {
      getJSON: () => Observable.of({
        status: 'succes',
        data: {
          mostFavoritedRecipes: [mockRawRecipes[0]],
          latestRecipes: [mockRawRecipes[1]]
        }
      })
    };

    fetchHomePageDataEpic(actionStream, {}, { ajax, apiUrl: config.apiUrl })
      .toArray()
      .subscribe((storeActions) => {
        expect(storeActions.length).to.equal(1);
        expect(storeActions[0].type).to.equal(FETCH_HOME_PAGE_DATA_FULFILLED);
        const { payload } = storeActions[0];

        expect(payload.length).to.equal(2);
        expect(payload[0].id).to.equal(mockRawRecipes[0].id);
        expect(payload[1].id).to.equal(mockRawRecipes[1].id);
        done();
      });
  });
});

