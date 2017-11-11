import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from '../../components/RecipeCard';

export default class Recipes extends React.Component {
  render() {
    return (
      <div>
      {/* The navigation bar begin */}
      <Navbar data={this.props}/>
      {/* The recipes page body */}
      <div className="container-fluid my-5">
        {/* Header */}
        <h1 className="text-center display-3 my-5">All Recipes</h1>
        {/* End Header */}
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-lg-4">
              <input type="text" placeholder="Keywords..." className="form-control mb-3" />
            </div>
            <div className="col-lg-4">
              <select className="form-control mb-3">
                <option> Sort By</option>
                <option>Date</option>
                <option>Popularity</option>
                <option>Most Favorited</option>
                <option>Up votes</option>
              </select>
            </div>
            <div className="col-lg-4">
              <select className="form-control mb-5">
                <option> Categories</option>
                <option>Fufus</option>
                <option>Soups</option>
                <option>Yoruba</option>
                <option>Salads</option>
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
              <RecipeCard/>
              <RecipeCard/>
              <RecipeCard/>
            </div>
            {/* End List of filtered recipes */}
            <br />
            {/* Pagination links  */}
            <nav className="row mt-5 justify-content-center">
              <ul className="pagination pagination-lg">
                <li className="page-item disabled">
                  <a className="page-link" href="#">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item active"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
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
