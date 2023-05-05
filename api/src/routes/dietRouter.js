const{Router} = require('express');
const {getDietsHandler} = require("../handlers/dietHandler")
const router = Router();

router.get("/", getDietsHandler);

module.exports = router;