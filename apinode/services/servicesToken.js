"use strict";
var jwt = require("jwt-simple");
var secret = "palabrasecretaqueserautilizadaparaeljwt";
var moment = require("moment");

exports.crearToken = function (user) {
  var payload = {
    ...user,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, secret);
};
