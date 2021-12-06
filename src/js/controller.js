import * as model from './model.js'; // import all named export from model.js
import recipeView from './views/recipeView.js'; // u can give this any name
import SearchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
/*
What is the difference between Polyfilling and Transpiling?

Transpiling -> converting new syntax like arrow function or optional chain to old syntax
Polyfilling -> shabih sazi new features to old browers -> like Number.isNaN is added in es6 and not working on old browsers -> polyfilling converting this to Number.isNaN = function isNaN(n){
   return n!== n; 
  }
} 

*/
import 'core-js/stable'; // polyfills for ECMAScript up to 2021:
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

// my key = 4e237be4-ce20-47e2-8a61-cb2365ee7ba7

// if (module.hot) {
//   module.hot.dispose();
// }

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // remove #

    if (!id) return;
    recipeView.renderSpinner();

    // 0  update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    // 1) loading recipe
    // this function returns promise , so we should wait for it
    await model.loadRecipe(id);
    //2 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    // console.log(`${err} : => controller.js`);
  }
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();

    if (!query) return;
    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    //console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (page) {
  //console.log(page);
  resultsView.render(model.getSearchResultPage(page));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // update the recipe servings (in state)
  model.updateServings(newServing); // updating current recipe data in state
  // update the recipe view(re rendering)
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
