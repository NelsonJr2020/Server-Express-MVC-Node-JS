/* routes/user.routes.js */

//REQUIRES
const userRoutes = require('express').Router();
const controllerUsers = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

//RUTAS CON AUTENTICACIÓN SESSION Y TOKEN
//ALL USERS BY PAGE NUMBER
userRoutes.get('/users/page/:pageNumber', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.viewAllUsers);
//VIEW USER BY ID
userRoutes.get('/user/:id', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.viewUser); 
//CLOSE SESSION
userRoutes.get('/logout', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.closeSession);
//PROFILE USER
userRoutes.get('/profile', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.viewProfile); 
//EDIT USER FORM
userRoutes.get('/user/edit/:id', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.editUserForm);
//EDIT USER UPDATE
userRoutes.post('/user/edit/:id', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.updateUser);
//UPDATE PROFILE
userRoutes.post('/user/update', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.updateProfile);
//DELETE USER
userRoutes.post('/user/delete/:id', [auth.authenticateSession, auth.authenticateJWT], controllerUsers.deleteUser); 

//RUTAS SIN AUTENTICACIÓN
//REGISTER FORM
userRoutes.get('/register', controllerUsers.registerForm);
//REGISTER PROCESS
userRoutes.post('/register', controllerUsers.registerProcess); 
//LOGIN FORM
userRoutes.get('/login', controllerUsers.loginForm);
//LOGIN PROCESS
userRoutes.post('/login', controllerUsers.loginProcess); 

//EXPORTA RUTAS DE USUARIOS
module.exports = userRoutes;