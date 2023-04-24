const { Recipe, Diet } = require("../db");
const getAPIDiets = require("./getAPIDiets");

async function postRecipe(req, res, next) {
  const { name, image, summary, healthScore, instructions, diets } = req.body;

  try {
    if (!name || !image || !summary || !healthScore || !instructions || !diets) {
      return res.status(400).send("No se puede crear. Envíe los datos requeridos");
    }

    // Verifica si existen registros en Diet. Si no hay registros, Diet se llena con
    // las dietas que están en la documentación de la API (guardadas en un array en 
    // el archivo arrayDietasAPI).
    const dietasExist = await Diet.findAll();
    if (dietasExist.length === 0) {
      await Diet.bulkCreate(await getAPIDiets());
    };

    // Buscar o crear instancias de dieta para cada dieta en el array
    const dietInstances = await Promise.all(
      diets.map((dietName) => Diet.findOrCreate({ where: { name: dietName } }))
    );

    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      instructions,
    });

    // Agregar instancias a la tabla RecipeDiet a través del método generado por Sequelize "addDiet"
    // Agrega nuevas instancias por cada dieta que viene en req.body. 
    // Cada nueva instancia va a tener el id de la receta + el id de la dieta
    await Promise.all(
      dietInstances.map(([diet]) => newRecipe.addDiet(diet))
    );
    return res.status(200).send("Receta creada exitosamente");
  } catch (error) {
    return next(error);
  }
}


module.exports = postRecipe;