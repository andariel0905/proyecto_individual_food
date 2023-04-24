const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipeRouter = require("./Recipe");
const DietRouter = require("./Diet");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes",RecipeRouter);
router.use("/diets",DietRouter);

module.exports = router;
