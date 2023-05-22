import { useState } from "react";
import styles from "./CardsBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

function CardsBar () {
    const dispatch = useDispatch();
    
    const [nameSearch, setNameSearch] = useState("");
    const [sortValue, setSortValue] = useState("default");
    const [filterValue, setFilterValue] = useState("todas");
    
    const diets = useSelector(state => state.diets);

    function nameHandler(e) {
		setNameSearch(e.target.value);
	};
    
    function getRecipeName(name) {
		dispatch(actions.getRecipeByName(name));
        setSortValue("default");
        setFilterValue("todas");
	};

    function sortHandler (e) {
        setSortValue(e.target.value);
        dispatch(actions.sort(e.target.value));
    };

    function filterHandler (e) {
        setFilterValue(e.target.value);
        dispatch(actions.filterRecipes(e.target.value));
    };
    return (
        <div className={styles.cardsBar}>
            <div className={styles.searchBar}>
                <p>Buscar</p>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    getRecipeName(nameSearch);
                }}>
                    <input type="text" onChange={nameHandler} value={nameSearch} className={styles.input}/>
                    <input type="submit" className={styles.submit}/>
                </form>
            </div>

            <div className={styles.selectContainer}>
                <div className={styles.sort}>
                    <p>Ordenar</p>
                    <select onChange={sortHandler} value={sortValue} className={styles.select}>
                        <option value="default">Default</option>
                        <option value="A">A-z</option>
                        <option value="D">Z-a</option>
                        <option value="plus">Más saludable</option>
                        <option value="minus">Menos saludable</option>
                    </select>
                </div>
                <div className={styles.filter}>
                    <p>Filtrar</p>
                    <select onChange={filterHandler} value={filterValue} className={styles.select}>
                        <option value="todas">Mostrar todas</option>
                        {diets.map((diet) => {
                            return <option value={diet.name}>{diet.name}</option>
                        })}
                        <option value="BDD">Creadas</option>
                        <option value="API">Importadas</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CardsBar;