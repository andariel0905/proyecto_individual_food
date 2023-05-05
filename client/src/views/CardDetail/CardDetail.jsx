import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as actions from "../../redux/actions";

const CardDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    function getRecipeById () {
        dispatch(actions.getRecipeDetail(id))
    };

    useEffect(getRecipeById,[]);

    const recipe = useSelector(state => state.recipeDetail)

    function removeTags(str) {
		if (str === null || str === "") return false;
		else str = str.toString();

		return str.replace(/(<([^>]+)>)/gi, "");
	};


    
    return (
        <div>
            <img src={recipe.image}/>
            <p>ID: {recipe.id}</p>
            <h3>{recipe.title}</h3>
            <p>{recipe.summary && removeTags(recipe.summary)}</p>
            <p>Health Score: {recipe.healthScore}</p>
            <h4>Instrucciones: </h4>
            {Array.isArray(recipe.steps) ? 
                <ul>
                    {recipe.steps.map((x) => (
                        <li>
                            {x.number}: {x.step}
                        </li> 
                    ))} 
                </ul>
                : <p>{recipe.steps}</p>
            }
            {recipe.diets && recipe.diets.map((diet) => (
                <span>{diet}</span>
            ))}
        </div>
    );
};

export default CardDetail;