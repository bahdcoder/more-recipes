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
                <input className="form-control" placeholder="Recipe title ..." type="text" />
              </div>
              <div className="col-sm-4">
                <input className="form-control" placeholder="How long to cook ?" type="text" />
              </div>
            </div>
            <textarea placeholder="Tell the world about your recipe ..." cols={3} rows={3} className="form-control" defaultValue={""} />
            <hr />
            <h3 className="text-muted mb-3 mt-3">
              <span className="mr-2">Ingredients</span>
              <span className="text-muted h4"> 
                <i className="ion ion-plus" /> 
              </span>
            </h3>
            <ul className="list-group">
              <li className="list-group-item">
                <input className="form-control" placeholder="50 Naira Garri" type="text" />
              </li>
            </ul>
            <h3 className="text-muted mb-3 mt-3">
              <span className="mr-2">Procedure</span>
              <span className="text-muted h4"> 
                <i className="ion ion-plus" /> 
              </span>
            </h3>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-1 h3">
                    <span className="badge badge-primary">1</span>
                  </div>
                  <div className="col-11">
                    <input className="form-control" placeholder="Pour the garri inside the cup..." type="text" />
                  </div>
                </div>
              </li>
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