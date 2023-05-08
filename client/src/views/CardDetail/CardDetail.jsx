import { useEffect } from "react";
import styles from './CardDetail.module.css';
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
            <header className={styles.header}>
                <h2>Encuentre la información que desee</h2>
            </header>
            <div className={styles.container}>
                <div className={styles.cardDetail}>
                    <img alt={recipe.title} src={recipe.image}/>
                    <p>ID: {recipe.id}</p>
                    <h3>{recipe.title}</h3>
                    <div className={styles.dietsContainer}>
                        {recipe.diets && recipe.diets.map((diet) => (
                            <span>{diet}</span>
                        ))}
                    </div>
                    <p>{recipe.summary && removeTags(recipe.summary)}</p>
                    <p>Health Score: {recipe.healthScore}</p>
                    <div className={styles.stepsContainer}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;