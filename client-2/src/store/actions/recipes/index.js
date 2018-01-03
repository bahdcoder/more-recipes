import { FETCH_HOME_PAGE_DATA, FETCH_HOME_PAGE_DATA_FULFILLED, FETCH_HOME_PAGE_DATA_FAILED } from './recipeActions';

export const fetchHomePageData = () => ({
  type: FETCH_HOME_PAGE_DATA
});

export const fetchHomePageDataFulfilled = payload => ({
  type: FETCH_HOME_PAGE_DATA_FULFILLED,
  payload
});

export const fetchHomePageDataFailed = payload => ({
  type: FETCH_HOME_PAGE_DATA_FAILED,
  payload
});

export default fetchHomePageData;
