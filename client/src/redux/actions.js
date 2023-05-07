import axios from 'axios';

import {
    GET_ALL_RECIPES,
    GET_RECIPE_BY_NAME,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    SORT,
    FILTER_RECIPES
} from "./types"

export const getAllRecipes = () => async (dispatch) => {
    axios.get(`http://localhost:3001/recipes`)
        .then(response => {
            dispatch({
                type: GET_ALL_RECIPES,
                payload: response.data
            })
        })
};

export const getRecipeByName = (name) => async (dispatch) => {
    axios.get(`http://localhost:3001/recipes?title=${name}`)
        .then(response => {
            dispatch({
				type: GET_RECIPE_BY_NAME,
				payload: response.data
			});
        });
};

export const getRecipeDetail = (id) => async (dispatch) => {
    axios.get(`http://localhost:3001/recipes/${id}`)
        .then(response => {
            dispatch({
                type: GET_RECIPE_DETAIL,
                payload: response.data
            })
        })
};

export const getDiets = () => async (dispatch) => {
    axios.get(`http://localhost:3001/diets`)
        .then(response => {
            dispatch({
                type: GET_DIETS,
                payload: response.data
            })
        })
};

export const sort = (order) => async (dispatch) => {
    dispatch({type: SORT, payload: order});
};

export const filterRecipes = (choice) => async (dispatch) => {
    dispatch({type:FILTER_RECIPES, payload: choice})
};