import axios from 'axios'
import React from 'react';
import Dropzone from 'react-dropzone';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';


import CreateRecipeValidator from './validation/createRecipeValidator';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from '../../components/RecipeCard';

import bannerImage1 from '../../../../assets/img/banner-1.jpg';


const dropZoneStyles = {
  border: 'none',
  cursor: 'pointer'
};

export default class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.miniError = {
      color: '#E27C3E',
      fontWeight: '700'
    };
    this.state = {
      title: '',
      description: '',
      imageUrl: '',
      timeToCook: '',
      ingredients: [''],
      procedure: [''],
      errors: {
        title: [],
        description: [],
        timeToCook: []
      }
    };

    // Method bindings 
    this.handleDrop = this.handleDrop.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNewProcedureStep = this.addNewProcedureStep.bind(this);
    this.handleProcedureChange = this.handleProcedureChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
  }
  /**
   * Handle a new file upload event
   * 
   * @param {any} file The uploaded file instance
   * @memberof CreateRecipe
   */
  handleDrop(file) {
    console.log(file);
  }


  /**
   * Handle input change events
   * 
   * @param {any} event change event
   * @memberof CreateRecipe
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Validate form input fields
   * 
   * @param {any} event blur event object
   * @memberof CreateRecipe
   */
  validateInput(event) {
    const validator = new CreateRecipeValidator(this.state);

    if (!validator.isValid()) {
      const errors = { ...this.state.errors };
      errors[event.target.name] = validator.errors[event.target.name];

      this.setState({ errors });
    } else {
      const errors = {
        title: [],
        description: [],
        timeToCook: []
      }
      this.setState({ errors });
    }
  }

  addNewIngredient() {
    const ingredients = this.state.ingredients;
    ingredients.push('');
    this.setState({ ingredients });
  }

  addNewProcedureStep() {
    const procedure = this.state.procedure;
    procedure.push('');
    this.setState({ procedure });
  }

  handleIngredientChange(event, index) {
    const ingredients = this.state.ingredients;
    ingredients[index] = event.target.value;
    this.setState({ ingredients });
  }

  handleProcedureChange(event, index) {
    const procedure = this.state.procedure;
    procedure[index] = event.target.value;
    this.setState({ procedure });
  }

  render() {
    // create an ingredients array
    const ingredientList = this.state.ingredients.map((ingredient, index) => {
            return (  <li key={index} className="list-group-item">
                <input className="form-control" placeholder="50 Naira Garri" type="text" onChange={event => { this.handleIngredientChange(event, index) }}  value={this.state.ingredients[index]} />
              </li>
            );
    });
    const procedureList = this.state.procedure.map((step, index) => {
          return (  <li className="list-group-item" key={index}>
                      <div className="row">
                        <div className="col-1 h3">
                          <span className="badge badge-primary">{index + 1}</span>
                        </div>
                        <div className="col-11">
                          <input className="form-control" value={this.state.procedure[index]} onChange={event => { this.handleProcedureChange(event, index) }}  type="text" />
                        </div>
                      </div>
                    </li>
                  );
    });
    // create a procedure array, this one is ordered
    // use react-sortable-hoc plugin for the sorting of the ingredients and procedure arrays
    let titleErrors = <small></small>;
    let timeToCookErrors = <small></small>;
    let descriptionErrors = <small></small>;
    if (this.state.errors['title'].length > 0) {
      titleErrors = this.state.errors['title'].map((error, index) => {
        return <small style={this.miniError} key={index}>{error}</small>;
      });
    } 
    if (this.state.errors['timeToCook'].length > 0) {
      timeToCookErrors = this.state.errors['timeToCook'].map((error, index) => {
        return <small style={this.miniError} key={index}>{error}</small>;
      });
    } 
    if (this.state.errors['description'].length > 0) {
      descriptionErrors = this.state.errors['description'].map((error, index) => {
        return <small style={this.miniError} key={index}>{error}</small>;
      });
    }
    return (
      <div>
        <Navbar/>
        <div className="container my-5">
          <div className="row justify-content-center">
            <h1 className="text-center my-5 header-color">Create a recipe</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-10">
              <div className="card">
                {/* Upload recipe image */}
                <Dropzone 
                    onDrop={this.handleDrop}  
                    accept="image/*"
                    multiple={false}
                    style={dropZoneStyles}
                  >
                  <div className="upload-recipe-img">
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <p className="text-center">
                          <span className="h2"><i className="ion ion-camera" /></span>
                          <br />
                          Click to upload image
                        </p>
                      </div>
                    </div>
                  </div>
                </Dropzone>
                
                {/* End upload recipe image */}
                <hr />
                {/* Create recipe form */}
                <div className="card-body">
                  <div className="form-group row">
                    <div className="col-sm-8">
                      <input className="form-control" onBlur={this.validateInput} name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Recipe title ..." type="text" />
                      {titleErrors}
                    </div>
                    <div className="col-sm-4">
                      <input className="form-control" onBlur={this.validateInput} placeholder="How long to cook ?" value={this.state.timeToCook} onChange={this.handleInputChange} type="text" name="timeToCook"/>
                      {timeToCookErrors}
                    </div>
                  </div>
                  <textarea name="description" value={this.state.description} onBlur={this.validateInput} onChange={this.handleInputChange}  placeholder="Tell the world about your recipe ..." cols={3} rows={3} className="form-control"/>
                  {descriptionErrors}
                  <hr />
                  <h3 className="text-muted mb-3 mt-3">
                    <span className="mr-2">Ingredients</span>
                    <span className="text-muted h4"> 
                      <i className="ion ion-plus" onClick={this.addNewIngredient} /> 
                    </span>
                  </h3>
                  <ul className="list-group">
                    {ingredientList}
                  </ul>
                  <h3 className="text-muted mb-3 mt-3">
                    <span className="mr-2">Procedure</span>
                    <span className="text-muted h4"> 
                      <i className="ion ion-plus" onClick={this.addNewProcedureStep}/> 
                    </span>
                  </h3>
                  <ul className="list-group">
                    {procedureList}
                  </ul>
                  <br />
                  <br />
                  <button className="btn btn-primary form-control">
                    Publish Recipe
                  </button>
                </div>
                {/* End create recipe form */}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
