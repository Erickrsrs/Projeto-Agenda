const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");

route.get("/", homeController.paginaInicialGet);
route.post("/", homeController.paginaInicialPost);

module.exports = route;
