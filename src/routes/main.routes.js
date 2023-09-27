/* routes/main.routes.js */

//REQUIRES
const mainRoutes = require('express').Router();
const controllerMain = require('../controllers/main.controller');

//RUTAS DE ENTRADA DE LA APP SIN AUTENTICACIÓN
mainRoutes.get('/', controllerMain.index); //VIEW MAIN INDEX
mainRoutes.get('/info', controllerMain.info); //VIEW TESTING VIEW

module.exports = mainRoutes;