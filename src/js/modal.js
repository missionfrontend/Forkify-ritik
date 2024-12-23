import { async } from "regenerator-runtime/runtime"
import { API_URL, KEY } from "./view/config.js";
import { getJSON,sendJSON } from "./view/helper.js";
export const state = {
    recipe:{},
    search:{
        query:'',
        results:[],
        page:1,
    },
    bookmarks:[],
}

export const loadRecipe = async function(id) {

    try{
        
        const data = await getJSON(`${API_URL}/${id}`)
         
            
            
            
            let {recipe} = data.data
            
            state.recipe = {
                id:recipe.id,
                title:recipe.title,
                publisher:recipe.publisher,
                sourceURL:recipe.source_url,
                image:recipe.image_url,
                servings:recipe.servings,
                cookingTime:recipe.cooking_time,
                ingredients:recipe.ingredients,
                ...(recipe.key && {key:recipe.key})
            }
            if(state.bookmarks.some(bookmark=>bookmark.id === id))
                state.recipe.bookmarked = true
        }catch(err){
            console.error(err);
            
        }
        
};

export const loadSearchResults = async function (query) {
     try{
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`)
        

        state.search.results = data.data.recipes.map(rec=>{
            return {
                id:rec.id,
                title:rec.title,
                publisher:rec.publisher,
                image:rec.image_url
            }
        })
        state.search.page =1;
     }catch(err){
        throw err
     }
}

export const getSearchResultsPage = function(page = state.search.page){
    state.search.page = page
    const start = (page-1) * 10;
    const end = page * 10

    return state.search.results.slice(start,end)
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) /state.recipe.servings
    });

    state.recipe.servings = newServings;
}
const persistbookmarks = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}
export const addBookmark = function(recipe){
    state.bookmarks.push(recipe)

    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistbookmarks()
}

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex(el=>el.id === id)
    state.bookmarks.splice(index,1)

    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistbookmarks()
}
const init = function(){
    const storage = localStorage.getItem('bookmarks')
    if(storage) state.bookmarks =JSON.parse(storage)
    
    
}
init()
export const uploadRecipe = async function (newRecipe) {
    const ingredients = Object.entries(newRecipe).filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '').map(ing=>{const [quantity,unit,description] = ing[1].replaceAll(' ','').split(','); return {quantity:quantity ? +quantity : null,unit,description}})
    
    

    const recipe = {
        
        title:newRecipe.title,
        source_url:newRecipe.sourceUrl,
        image_url:newRecipe.image,
        publisher:newRecipe.publisher,
        cooking_time:+newRecipe.cookingTime,
        servings:+newRecipe.servings,
        ingredients,
    }
    
    const data = await sendJSON(`${API_URL}?key=${KEY}`,recipe)

    state.recipe = data
    

}




