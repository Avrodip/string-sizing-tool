/**
 * file which containts all routes of the Common controllers.
 */

const express = require("express");
const parameterValidation = require("../models/request/parameter.validator");
const { getParameterList } = require("../controllers/common.controller");
const verifyToken = require("../middlewares/auth.js");

const router = express.Router();
router.post("/getParameterList", verifyToken, parameterValidation, getParameterList);

module.exports = router;
