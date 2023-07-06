import React, { useEffect, useState } from "react";
import styles from "./CardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import CardsBar from "../CardsBar/CardsBar";
import * as actions from "../../redux/actions";

const CardsContainer= () => {
    const dispatch = useDispatch();
    
    let recipes = useSelector(state => state.allRecipes);
    
    useEffect(()=>(dispatch(!recipes.length && actions.getAllRecipes())),[]);

    const searchQuery = useSelector(state => state.searchQuery);
    const filter = useSelector(state => state.activeFilter);
    const sort = useSelector(state => state.activeSort);
    const reduxState = useSelector(state => state);
    
    recipes = recipes.filter(recipe => recipe.title.includes(searchQuery));

    if(filter === "API" || filter === "BDD") { 
        recipes = recipes.filter(recipe => recipe.origin === filter)
    }
    else if(filter !== "todas") {
        recipes = recipes.filter(recipe => recipe.diets.includes(filter))
    }

    if (sort === "A") {
        recipes = recipes.sort((a,b) => (a.title > b.title ? 1 : -1))
    }   
    if (sort === "D") {
        recipes = recipes.sort((a,b) => (a.title < b.title ? 1 : -1))
    }
    if (sort === "plus") {
        recipes = recipes.sort((a,b) => (b.healthScore - a.healthScore))
    }
    if (sort === "minus") {
        recipes = recipes.sort((a,b) => (a.healthScore - b.healthScore))
    }


    const RECIPES_PER_PAGE = 9;

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;

    function handlePageChange (newPage) {setCurrentPage(newPage)};

    const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

    useEffect(() => {setCurrentPage(1)},[reduxState.activeFilter, reduxState.activeSort]);

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            <button key={i} onClick={() => handlePageChange(i)} className={styles.buttons}>
            {i}
            </button>
        )
    };
    
    function handlePrev () {if(currentPage > 1) setCurrentPage(currentPage-1)};
    
    function handleNext () {if(currentPage < totalPages) setCurrentPage(currentPage+1)};

    return (
        <div>
            <CardsBar/>
            <div className={styles.pageContainer}>
                <p>Current page: {currentPage}</p>
                <div className={styles.pageButtons}>
                    <button onClick={handlePrev} className={styles.prev}>Prev</button>
                    {pageButtons}
                    <button onClick={handleNext} className={styles.next}>Next</button>
                </div>
            </div>
            <div className={styles.cardsContainer}>
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
            <div className={styles.pageContainer}>
                <p>Current page: {currentPage}</p>
                <div className={styles.pageButtons}>
                    <button onClick={handlePrev} className={styles.prev}>Prev</button>
                    {pageButtons}
                    <button onClick={handleNext} className={styles.next}>Next</button>
                </div>
            </div>
        </div>
    );
};
export default CardsContainer;