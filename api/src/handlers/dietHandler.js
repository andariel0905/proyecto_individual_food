const { getDietsTypesDB } = require("../controllers/dietController");

const getDietsHandler = async (req, res) => {
  res.send(await getDietsTypesDB());
};

module.exports = { getDietsHandler };