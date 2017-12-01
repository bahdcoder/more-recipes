import React from 'react';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from '../../components/RecipeCard';
import RecipeCardLoader from './../../components/RecipeCardLoader';

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: props.location.query.sort || 'Sort By',
      query: props.location.query.query || '',
      loading: true,
      perPage: props.location.query.perPage || 'Per page',
      recipesMeta: {
        pageCount: 0,
        recipes: [],
        recipesCount: 0
      }
    };
    

    this.getRecipes = this.getRecipes.bind(this);
    this.changeRouterQueryParams = this.changeRouterQueryParams.bind(this);
    this.changeRouterPageQueryParams = this.changeRouterPageQueryParams.bind(this);
  }

  componentDidMount() {
    browserHistory.listen(location => {
      // get data from api right now.
    });
  }

  async getRecipes() {
    this.state.loading = true;
    try {
      const response = await this.props.getRecipesCatalog();
      const recipeResponse = response.data.data.recipes;
      const { paginationMeta, recipes } = recipeResponse;
      let recipesMeta = {...this.state.recipesMeta};

      recipesMeta = {
        recipes,
        pageCount: paginationMeta.pageCount,
        recipesCount: paginationMeta.recipesCount
      }
      this.setState({
        recipesMeta,
        loading: false
      });
    } catch (error) {
      console.log(`error getting recipes catalog: `, error);
    }
  }

  componentWillMount() {
    this.getRecipes();
  }

  changeRouterPageQueryParams({ selected }) {
    this.props.changeRouterQueryParams('page', selected + 1, this.props.location);
    this.getRecipes();
  }

  changeRouterQueryParams(event, explicit) {
    let { value } = event.target;
    let { name } = event.target;
    this.setState({
      [name]: value
    });
    this.props.changeRouterQueryParams(name, value, this.props.location);
  }

  render() {
    let recipes;
    
    if (this.state.loading) {
      recipes = (
        <div className="row">
          <div className="col-md-4">
            <RecipeCardLoader/>
          </div>
          <div className="col-md-4">
            <RecipeCardLoader/>
          </div>
          <div className="col-md-4">
            <RecipeCardLoader/>
          </div>
        </div>
      );
    } else {
      recipes = this.state.recipesMeta.recipes.map((recipe) => {
        return (
          <div className="col-md-4" key={recipe.id}>
            <RecipeCard recipe={recipe} {...this.props} />
          </div>
        );
      });
    }

    return (
      <div>
      {/* The navigation bar begin */}
      <Navbar {...this.props}/>
      {/* The recipes page body */}
      <div className="container-fluid my-5">
        {/* Header */}
        <h1 className="text-center display-5 my-5">All Recipes</h1>
        {/* End Header */}
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-lg-3">
              <input type="text" name="query" onChange={this.changeRouterQueryParams} value={this.props.location.query.query || ''} placeholder="Keywords..." className="form-control mb-3" />
            </div>
            <div className="col-lg-3">
              <select value={this.props.location.query.sort || 'Sort By'} name="sort" className="form-control mb-3" onChange={this.changeRouterQueryParams}>
                <option disabled> Sort By</option>
                <option value="date">Date</option>
                <option value="mostFavorited">Most Favorited</option>
                <option value="mostUpvoted">Up votes</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select value={this.state.perPage} name="perPage" className="form-control mb-3" onChange={this.changeRouterQueryParams}>
                <option disabled>Per page</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </div>
            <div className="col-lg-3">
              <button className="btn btn-primary form-control" onClick={this.getRecipes}>Search recipes</button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          {/* Search filters section */}
          {/* End of search filters section */}
          <div className="col-lg-10 mb-5">
            {/* List of filtered recipes */}
            <div className="card-deck wow fadeIn">
              {recipes}
            </div>
            {/* End List of filtered recipes */}
            {/* Pagination links  */}
            <nav className="row justify-content-center">
              <ReactPaginate previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={<a>...</a>}
                        breakClassName={"page-link"}
                        pageCount={this.state.recipesMeta.pageCount}
                        forcePage={Number(this.props.location.query.page - 1) || 0}
                        onPageChange={this.changeRouterPageQueryParams}
                        containerClassName={"pagination pagination-lg"}
                        pageLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        previousLinkClassName={"page-link"}
                        disabledClassName={"disabled"}
                        pageClassName={"page-item"}
                        previousClassName={"page-item"}
                        nextClassName={"page-item"}
                        activeClassName={"active"} />
            </nav>
            {/* End of pagination links */}
          </div>
        </div>
      </div>
      {/* End of The recipes page body */}

      {/*Begin page footer */}
      <Footer/>
    </div>
    );
  }
}
