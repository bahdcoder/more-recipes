import React from 'react';

import { browserHistory } from 'react-router';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from '../../components/RecipeCard';

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.location);

    this.state = {
      sort: props.location.query.sort || 'Sort By',
      query: props.location.query.query || ''
    };

    this.changeRouterQueryParams = this.changeRouterQueryParams.bind(this);
  }

  componentDidMount() {
    browserHistory.listen(location => {
      // get data from api right now.
    });
  }

  changeRouterQueryParams(event) {
    let { value } = event.target;
    let { name } = event.target;
    this.setState({
      [name]: value
    });
    this.props.changeRouterQueryParams(name, value, this.props.location);
  }

  render() {
    console.log(this.state);
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
            <div className="col-lg-4">
              <input type="text" name="query" onChange={this.changeRouterQueryParams} value={this.state.query} placeholder="Keywords..." className="form-control mb-3" />
            </div>
            <div className="col-lg-4">
              <select value={this.state.sort} name="sort" className="form-control mb-3" onChange={this.changeRouterQueryParams}>
                <option disabled> Sort By</option>
                <option value="date">Date</option>
                <option value="mostFavorited">Most Favorited</option>
                <option value="mostUpvoted">Up votes</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          {/* Search filters section */}
          {/* End of search filters section */}
          <div className="col-lg-10 mb-5">
            {/* List of filtered recipes */}
            <div className="card-deck wow fadeIn">

            </div>
            {/* End List of filtered recipes */}
            <br />
            {/* Pagination links  */}
            <p className="text-center">
              <button className="btn-lg btn-primary" disabled>Load more</button>
            </p>
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
