const axios = require("axios");
const { API,API_KEY } = process.env;
const {Recipe} = require("../db");
const {Diet} = require("../db");

async function getRecipeById (id) {
    const source = isNaN(id) ? "db" : "api";

    if (source === "api") {
        const {data} = await axios.get(`${API}/${id}/information?apiKey=${API_KEY}`);
        return {
            id,
            title:data.title,
            image:data.image,
            summary:data.summary,
            healthScore:data.healthScore,
            steps: data.analyzedInstructions[0].steps,
            diets:data.diets
        }
    }

    return await Recipe.findByPk(id);
};


const getRecipesAPI = async () => {
	const responseApi = await axios.get(`${API}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

	return responseApi.data.results.map((x) => {
		return {
			id: x.id,
			title: x.title,
			summary: x.summary,
			healthScore: x.healthScore,
			steps: x.steps,
			image:
				x.image ||
				"https://st3.depositphotos.com/1064969/18252/v/450/depositphotos_182528054-stock-illustration-flat-grayscale-icon-burger.jpg",
			diets: x.diets.map((y) => y),
			origin: "API"
		};
	});
};


const getRecipesDB = async () => {
	const res = await Recipe.findAll({
		attributes: ["id", "title", "summary", "healthScore", "steps", "image"],
		include: { model: Diet },
	});

	return await res.map((x) => {
		return {
			id: x.dataValues.id,
			title: x.dataValues.title,
			summary: x.dataValues.summary,
			healthScore: x.dataValues.healthScore,
			steps: x.dataValues.steps,
			image:
				x.dataValues.image ||
				"https://st3.depositphotos.com/1064969/18252/v/450/depositphotos_182528054-stock-illustration-flat-grayscale-icon-burger.jpg",
			diets: x.dataValues.diets.map((y) => y.name),
			origin: "BDD"
		};
	});
};

module.exports = {getRecipeById,getRecipesAPI,getRecipesDB};