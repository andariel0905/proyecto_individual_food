import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import validate from './validate';
import axios from "axios";

const Form = () => {
    const dispatch = useDispatch();

    const diets = useSelector(state => state.diets);
    
    useEffect(() => {
		if (!diets.length) {
			dispatch(actions.getDiets());
		}
	}, []);
    
    const [form,setForm] = useState({
        title: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: []
    });

    const [errors, setErrors] = useState({count: 1});

    function changeHandler(e){
        const property = e.target.name;
        const value = e.target.value;

        if (property !== 'diets'){
            setForm({...form, [property]:value});
            setErrors(validate({...form, [property]:value}));
            return;
        };
        if (e.target.checked){
            setForm({...form, diets:[...form.diets, parseInt(value)]});
        }
        else {
            setForm({...form, diets: form.diets.filter(diet => diet !== parseInt(value))});
		};
    };

    function submitHandler(e) {
		e.preventDefault();
		axios.post("http://localhost:3001/recipes", form).then((res) => alert(res));
	};

    return (
        <div>
            <h2>Crea tu receta</h2>
            <form onSubmit={submitHandler}>
				<label>Nombre de la receta</label>
				<input type="text" value={form.title} name="title" onChange={changeHandler}/>
				{errors.title && <p>{errors.title}</p>}

				<label>Resumen</label>
				<textarea type="" value={form.summary} name="summary" onChange={changeHandler}/>
				{errors.summary && <p>{errors.summary}</p>}

				<label>Nivel de comida saludable</label>
				<input type="number" value={form.healthScore} name="healthScore" onChange={changeHandler}/>
				{errors.healthScore && <p>{errors.healthScore}</p>}

				<label>Pasos</label>
				<input type="text" value={form.steps} name="steps" onChange={changeHandler}/>
				{errors.steps && <p>{errors.steps}</p>}

				<label>Dietas</label>
				{diets.map((diet) => {
					return (
						<div key={diet.id}>
							<label htmlFor="">
								<input type="checkbox" onChange={changeHandler} name="diets" value={diet.id}/>
								{diet.name}
							</label>
						</div>
					);
				})}
				{!form.diets.length && <p>Seleccione al menos una dieta</p>}

				{!errors.count && form.diets.length > 0 ? (
					<button type="submit">
						Enviar
					</button>
				) : (
					<button type="submit" disabled>
						Enviar
					</button>
				)}
			</form>
        </div>
    );
};

export default Form;