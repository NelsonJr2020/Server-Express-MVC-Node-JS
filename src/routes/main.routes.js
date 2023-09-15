//REQUIRES
const mainRoutes = require('express').Router();
const controllerMain = require('../controllers/main.controller');

//RUTAS DE ENTRADA DE LA APP
mainRoutes.get('/', controllerMain.index); //VIEW MAIN INDEX

module.exports = mainRoutes;