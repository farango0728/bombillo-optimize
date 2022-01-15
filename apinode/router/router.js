"use strict";
var express = require("express");
var api = express.Router();

// -> Controladores
var _controladorOptimize = require("../controller/controllerOptimize");

// -> middlewares
// var middlewareAutorizacion = require('../middleware/verificaciondetoken');
const middlewareValidation = require("../middleware/joi_validation");

// -> schemasValidations
const _authSchema = require("../utils/authSchema");
// -> Routes

api.post(
  "/matriz/optimize",
  middlewareValidation(_authSchema.schemaRegister),
  _controladorOptimize.Optimize
);
api.get("/matriz/resultado", _controladorOptimize.GetLastmatriz);

module.exports = api;
