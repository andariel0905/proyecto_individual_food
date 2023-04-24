const { Diet } = require('../db');
const getAPIDiets = require("./getAPIDiets");

async function getDiets(req, res, next) {
    try {
        let diets = await Diet.findAll();
        if (diets.length === 0) {diets = await Diet.bulkCreate(await getAPIDiets())};
        return res.status(200).json(diets);
    } 
    catch (error) {
        return next(error); 
    }
}

module.exports = getDiets;
