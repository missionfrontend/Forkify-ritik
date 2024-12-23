import icons from 'url:../img/icons.svg'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './modal.js';
import recipeview from './view/RecipeView.js';
import Searchview from './view/searchView.js'
import ResultView from  './view/Resultview.js'
import PaginationView from './view/paginationView.js';
import paginationView from './view/paginationView.js';
import RecipeView from './view/RecipeView.js';
import bookmarkView from './view/bookmarkView.js';
import addRecipe from './view/addRecipe.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////



const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    recipeview.Renderspinner()

    await model.loadRecipe(id)

    recipeview.render(model.state.recipe)
    
    ResultView.Renderspinner()
    
    ResultView.render(model.state.search.results)
  } catch (err) {
    recipeview.renderError("We could not find that Receipe")
  }
}

const controlSearchResults = async function () {
  try {
    const query = Searchview.getQuery()
    await model.loadSearchResults(query)
    ResultView.render(model.getSearchResultsPage())
    

    PaginationView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }


}

const controlPagination = function(goto){
  ResultView.render(model.getSearchResultsPage(goto))
  paginationView.render(model.state.search)
}
paginationView.clickHandler(controlPagination)
Searchview.addhandlerSearch(controlSearchResults)
window.addEventListener('hashchange', controlRecipe)
window.addEventListener('load', controlRecipe)

const controlServings = function(newServings){
  model.updateServings(newServings)

  RecipeView.render(model.state.recipe)
}

RecipeView.addHandlerUpdateServings(controlServings)

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)
  RecipeView.render(model.state.recipe)
  bookmarkView.render(model.state.bookmarks)
}
RecipeView.addHandlerAddBookmark(controlAddBookmark)

const controlbookmarks =  function(){
   bookmarkView.render(model.state.bookmarks)
}
bookmarkView.addHandlerBookmarks(controlbookmarks)


const controlAddRecipe = function(newRecipe){
  model.uploadRecipe(newRecipe)
  setTimeout(function(){
    addRecipe.toggleWindow()
  },2000)
  
  RecipeView.render(model.state.recipe)
  bookmarkView.render(model.state.bookmarks)

  window.history.pushState(null,'',`#${model.state.recipe.id}`)
  
}
addRecipe.addHandlerUploadRecipe(controlAddRecipe)