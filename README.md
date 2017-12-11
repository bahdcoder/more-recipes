[![Build Status](https://travis-ci.org/kati-frantz/more-recipes.svg?branch=server-side)](https://travis-ci.org/kati-frantz/more-recipes) [![Coverage Status](https://coveralls.io/repos/github/kati-frantz/more-recipes/badge.svg?branch=develop)](https://coveralls.io/github/kati-frantz/more-recipes?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/d86c0fb140d38e863e99/maintainability)](https://codeclimate.com/github/kati-frantz/more-recipes/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d86c0fb140d38e863e99/test_coverage)](https://codeclimate.com/github/kati-frantz/more-recipes/test_coverage)

# MORE-RECIPES
A platform for users to share awesome and exciting recipe ideas they have invented or learnt. 
****
## Introduction
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.
## Application features

* User signup and signin pages.
* A recipe listing or catalog page that allows viewers to search for recipes. It also includes a view/section showing popular (most favorited) recipes.
* A page that shows details of a recipe, allows users upvote/downvote/favorite recipes, and see any reviews. Authenticated users should be able to provide reviews on recipes.
* A page that shows the favorite recipes of an authenticated user
* A page where an authenticated user can see his/her profile
* A page where an authenticated user can do the following: 
  - Retrieve recipes from the catalog
  - Add a recipe to the catalog
  - Modify a recipe in the catalog, including upvoting, downvoting, favoriting e.t.c
  - Delete a recipe from the catalog
  - Retrieve favorited recipes from the catalog
  - Add a review for a recipe
  - Retrieve recipes with the most upvotes

## Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database
* Bootstrap 4 CSS Framework
* Redis key-value store

## Getting started
* Have nodeJS installed locally, with a postgres database.
* Clone the repository locally:
  ```sh
  $ git clone https://github.com/kati-frantz/more-recipes && cd more-recipes
  ```
* Install all required dependencies
  ```sh
  $ npm install
  ```
* Rename `.env.example` file to `.env`
* Setup required configurations as specified in the new .env file. Eg. Database configs, JWT secret
* Build the application with: 
  ```sh
  $ npm run build && npm run build:client
  ```
* Server should be up and running on port `4080`

## Using the application

### The server api 
The server api uses the [Jsend Response Standard](http://labs.omniti.com/labs/jsend)
#### THE ROUTES
