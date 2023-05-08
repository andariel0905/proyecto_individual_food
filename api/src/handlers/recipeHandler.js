const {Recipe} = require("../db");
const {getRecipeById,getRecipesAPI,getRecipesDB} = require("../controllers/recipeController");

async function getRecipesHandler (req,res) {
    const {title} = req.query;

    const [api,db] = await Promise.all([getRecipesAPI(),getRecipesDB()])

    const allRecipes = [...api,...db];

    if (title) {
		try {
			let filterRecipe = allRecipes.filter((x) =>
				x.title.toLowerCase().includes(title.toLowerCase())
			);

			filterRecipe.length
				? res.status(200).send(filterRecipe)
				: res.status(401).send("No existe receta con ese nombre");
		} catch (error) {
			return res.status(401).send("Error");
		}
	} else {
		res.send(allRecipes);
	}
};


async function getRecipeHandler (req,res) {
    const {id} = req.params;
	try {
		const recipe = await getRecipeById(id);
		res.status(200).json(recipe);
	} catch (error) {
		res.status(400).send(error.message);
	}
};


async function postRecipeHandler (req,res) {
    let {title,image,summary,healthScore,steps,diets} = req.body;
    if (!title) {res.status(400).send("No se puede crear la receta. Envíe un nombre")};
    const createdRecipe = await Recipe.create({title,image,summary,healthScore,steps});
    await createdRecipe.addDiet(diets);

    res.status(200).send("La receta se ha creado correctamente");
};

module.exports = {getRecipesHandler, getRecipeHandler, postRecipeHandler};