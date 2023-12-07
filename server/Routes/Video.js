const router = require("express").Router();

const getDetails = require("./Video/getDetails");

router.get("/", getDetails);

module.exports = router;
