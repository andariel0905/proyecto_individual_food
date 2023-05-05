import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

function CardsBar () {
    const dispatch = useDispatch();
    const [nameSearch, setNameSearch] = useState("");
    
    const diets = useSelector(state => state.diets);
    
    useEffect(() => {
		if (!diets.length) {
			dispatch(actions.getDiets());
		}
	}, []);

    function nameHandler(e) {
		setNameSearch(e.target.value);
	};
    
    function getRecipeName(name) {
		dispatch(actions.getRecipeByName(name));
	};

    function sortHandler (e) {
        dispatch(actions.sort(e.target.value));
    };

    function filterHandler (e) {
        dispatch(actions.filterRecipes(e.target.value));
    };
    return (
        <div>
            <div>
                <p>Buscar:</p>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    getRecipeName(nameSearch);
                }}>
                    <input type="text" onChange={nameHandler} value={nameSearch}/>
                    <input type="submit"/>
                </form>
            </div>

            <div>
                <p>Ordenar</p>
                <select onChange={sortHandler}>
                    <option value="default">Default</option>
                    <option value="A">A-z</option>
                    <option value="D">Z-a</option>
                    <option value="plus">Más saludable</option>
                    <option value="minus">Menos saludable</option>
                </select>
            </div>

            <div>
                <p>Filtrar</p>
                <select onChange={filterHandler}>
                    <option value="todas">Mostrar todas</option>
                    <option value="BDD">Creadas</option>
                    <option value="API">Importadas</option>
                    {diets.map((diet) => {
                        return <option value={diet.name}>{diet.name}</option>
                    })}
                </select>
            </div>
        </div>
    );
};

export default CardsBar;