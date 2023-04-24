const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://spoonacular.com/food-api/docs#Diets';

module.exports = async function getAPIDiets() {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const dietsSection = $('section[jss-title="Diets"]');
    const h4Tags = dietsSection.find('h4');
    return dietsNames =  h4Tags.map((i, el) => {
            return { id: i + 1, name: $(el).text() };
        }).get();
};