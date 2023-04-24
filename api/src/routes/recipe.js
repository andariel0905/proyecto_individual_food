const {Router} = require('express');
const getRecipeById = require("../controllers/getRecipeById");
const getRecipeByName = require("../controllers/getRecipeByName");
const postRecipe = require("../controllers/postRecipe");
const router = Router();

router.get("/:idRecipe", getRecipeById);

router.get("/", getRecipeByName);

router.post("/", postRecipe);

module.exports = router;