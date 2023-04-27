const {Router} = require('express');
const {getRecipesHandler,getRecipeHandler,postRecipeHandler} = require("../handlers/recipeHandler");
const router = Router();

router.get("/", getRecipesHandler);

router.get("/:id", getRecipeHandler);

router.post("/", postRecipeHandler);

module.exports = router;