import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Card from "../Card/Card";
import CardsBar from "../CardsBar/CardsBar";

const CardsContainer= () => {

    const dispatch = useDispatch();

    useEffect(()=>(dispatch(actions.getAllRecipes())),[]);

    const recipes = useSelector(state => state.activeRecipes);

    const RECIPES_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;

    function handlePageChange (newPage) {setCurrentPage(newPage)};

    const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

    useEffect(() => {
        if(totalPages && currentPage > totalPages){
            setCurrentPage(totalPages)
        }
    },[totalPages]);

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            <button key={i} onClick={() => handlePageChange(i)}>
            {i}
            </button>
        )
    };
    
    function handlePrev () {if(currentPage > 1) setCurrentPage(currentPage-1)};
    
    function handleNext () {if(currentPage < totalPages) setCurrentPage(currentPage+1)};

    return (
        <div>
            <CardsBar/>
            <div>
                <h5>Current page: {currentPage}</h5>
                <button onClick={handlePrev}>Prev</button>
                {pageButtons}
                <button onClick={handleNext}>Next</button>
            </div>
            <div>
                {recipes ? recipes.slice(startIndex, endIndex).map(recipe => {
                    return <Card
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        summary={recipe.summary}
                        healthScore={recipe.healthScore}
                        steps={recipe.steps}
                        diets={recipe.diets}
                    /> 
                })
                : <p>Loading...</p>}
            </div>
        </div>
    );
};
export default CardsContainer;