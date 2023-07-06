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
    activeSort:"default",
    activeFilter:"todas",
    searchQuery: "",
    recipeDetail:{},
    diets:[]
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {...state, allRecipes:action.payload};


        case GET_RECIPE_BY_NAME:;
            return { ...state, searchQuery:action.payload};
        

        case GET_RECIPE_DETAIL:
            return {...state, recipeDetail:action.payload};

        case GET_DIETS:
            return {...state, diets:action.payload};
        

        case SORT:
            return {...state, activeSort:action.payload}


        case FILTER_RECIPES:
            return {...state, activeFilter:action.payload}

        default:
            return state;
    }
};