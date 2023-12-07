const router = require("express").Router();
const requestCallBack = require("./Callback/requestCallBack");

router.post("/request", requestCallBack);

module.exports = router;
