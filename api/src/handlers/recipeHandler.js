const {Diet,Recipe} = require("../db");
const {getRecipeById,getRecipesAPI,getRecipesDB} = require("../controllers/recipeController");
const {postDiets} = require("../controllers/dietController");

async function getRecipesHandler (req,res) {
    const {name} = req.query;

    const [api,db] = await Promise.all([getRecipesAPI(),getRecipesDB()])

    const allRecipes = {...api,...db};

    if (name) {
		try {
			let filterRecipe = allRecipes.filter((x) =>
				x.title.toLowerCase().includes(name.toLowerCase())
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
    const recipe = await getRecipeById(id);
    res.status(200).json(recipe);
};


async function postRecipeHandler (req,res) {
    const {name,image,summary,healthScore,instructions,diets} = req.body;
    if (!name) {res.status(400).send("No se puede crear la receta. Envíe un nombre")};
    const createdRecipe = await Recipe.create({name,image,summary,healthScore,instructions});
    
    if (diets) {
        const dbDiets = await Diet.findAll();
        if (dbDiets.length === 0) {
            postDiets;
            await createdRecipe.addDiet(diets);
        };
        await createdRecipe.addDiet(diets);
    }

    res.status(200).send("La receta se ha creado correctamente");
};

module.exports = {getRecipesHandler, getRecipeHandler, postRecipeHandler};