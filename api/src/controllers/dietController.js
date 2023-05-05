const { default: axios } = require("axios");
// Requerimos el modelo de la tabla Diet de la base de datos
const { Diet } = require("../db");
const { getRecipesAPI } = require("./recipeController");

const getDietsTypesAPI = async () => {
  const recipesApi = await getRecipesAPI();

  const dietAllApi = recipesApi.map((x) => x.diets);

  const dietsAll = [];

  dietAllApi.forEach((x) => x.forEach((y) => dietsAll.push(y)));

  return [...new Set(dietsAll)];
};

const getDietsTypesDB = async () => {
  // Utilizamos el metodo finAll de sequelize en el modelo Diet para acceder a todos los atributos
  const dietsAll = await Diet.findAll({
    // mediante la opcion attributes especificamos cuales son los unicos que queremos
    attributes: ["name", "id"],
  });

  // console.log(dietsAll);

  const dietsAllArray = [];

  dietsAll.forEach((x) => dietsAllArray.push({ name: x.name, id: x.id }));

  return dietsAllArray;

  // Recorremos dietAll para pushear en el nuevo array dietsAllArray todo nuevamente.
};

const postDiets = async () => {
  const dietsTypes = await getDietsTypesAPI();
  let allDietTypes = dietsTypes.map((e) =>
    Diet.findOrCreate({ where: { name: e } })
  );
  Promise.all(allDietTypes).then((e) => console.log("Dietas Cargadas"));
};

module.exports = { getDietsTypesDB, getDietsTypesAPI, postDiets };
