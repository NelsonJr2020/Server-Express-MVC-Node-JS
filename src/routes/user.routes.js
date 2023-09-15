/* routes/user.routes.js */

//REQUIRES
const userRoutes = require("express").Router();
const controllerUsers = require("../controllers/user.controller");
const auth = require('../middlewares/auth.middleware');

//RUTAS DEL CRUD DE USUARIOS
userRoutes.get('/users', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.viewAllUsers); //ALL USERS
userRoutes.get('/user/:id', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.viewUser); //VIEW USER
userRoutes.get('/register', controllerUsers.registerForm); //REGISTER FORM
userRoutes.post('/register', controllerUsers.registerProcess); //REGISTER PROCESS
userRoutes.get('/logout', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.closeSession); //CLOSE SESSION
userRoutes.get("/login", controllerUsers.loginForm); //LOGIN FORM
userRoutes.post('/login', controllerUsers.loginProcess); //LOGIN PROCESS
userRoutes.get('/profile', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.profileUser); //PROFILE USER
userRoutes.put('/user/:id', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.updateUser); //UPDATE USER
userRoutes.delete('/user/:id', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.deleteUser); //DELETE USER

//EXPORTA RUTAS DE USUARIOS
module.exports = userRoutes;