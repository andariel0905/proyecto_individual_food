import {
    GET_ALL_RECIPES,
    GET_RECIPE_BY_NAME,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    SORT,
    FILTER_RECIPES
} from "./types"

const initialState = {
    allRecipes:[],
    recipesByName:[],
    activeRecipes:[],
    activeSort:"default",
    activeFilter:"todas",
    defaultRecipeSort:[],
    recipeDetail:{},
    diets:[]
}

function sort (recipesToSort, sortType) {
    if (sortType === "default") {
        return recipesToSort;
    }
    if (sortType === "A") {
        recipesToSort.sort((a,b) => (a.title > b.title ? 1 : -1))
    }   
    if (sortType === "D") {
        recipesToSort.sort((a,b) => (a.title < b.title ? 1 : -1))
    }
    if (sortType === "plus") {
        recipesToSort.sort((a,b) => (b.healthScore - a.healthScore))
    }
    if (sortType === "minus") {
        recipesToSort.sort((a,b) => (a.healthScore - b.healthScore))
    }
    return recipesToSort;
};

function filter (recipesToFilter, filterType) {
    if (filterType === "todas") {
        return recipesToFilter;
    }
    else if (filterType === "BDD") {
        return recipesToFilter.filter(recipe => recipe.origin === "BDD")
    }
    else if (filterType === "API") {
        return recipesToFilter.filter(recipe => recipe.origin === "API")
    }
    else {
        return recipesToFilter.filter(recipe => recipe.diets.includes(filterType))
    }
};



export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {...state, allRecipes:action.payload, recipesByName:action.payload, activeRecipes:action.payload, defaultRecipeSort:action.payload};


        case GET_RECIPE_BY_NAME:;
            return { ...state, recipesByName:action.payload, activeRecipes:action.payload, defaultRecipeSort:action.payload, activeSort:"default", activeFilter:"todas"};
        

        case GET_RECIPE_DETAIL:
            return {...state, recipeDetail:action.payload};

        case GET_DIETS:
            return {...state, diets:action.payload};
        

        case SORT:
            let sortedRecipes  = [...state.activeRecipes];
            if (action.payload === "default") {
                sortedRecipes = [...state.defaultRecipeSort];
            }
            else {
                sortedRecipes = sort(sortedRecipes,action.payload);
            }   
            return {...state, activeRecipes:sortedRecipes, activeSort:action.payload}


        case FILTER_RECIPES:
            let filteredRecipes  = filter([...state.recipesByName],action.payload);
            
            let activeSort = state.activeSort;
            const defaultSort = [...filteredRecipes];
            if (activeSort !== "default") {
                filteredRecipes = sort(filteredRecipes,activeSort);
            }
            return {...state, activeRecipes:filteredRecipes, activeFilter:action.payload, defaultRecipeSort:defaultSort}

        default:
            return state;
    }
};