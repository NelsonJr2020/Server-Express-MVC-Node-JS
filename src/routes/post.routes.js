/* routes/post.routes.js */

//REQUIRES
const postRoutes = require('express').Router();
const controllerPosts = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');

//RUTAS DE POSTS CON AUTENTICACIÓN
//VIEW ALL POSTS BY PAGE NUMBER
postRoutes.get('/posts/page/:pageNumber', [auth.authenticateSession, auth.authenticateJWT], controllerPosts.viewAllPosts);
//VIEW POST BY GUID
postRoutes.get('/post/:guid', [auth.authenticateSession, auth.authenticateJWT], controllerPosts.viewPost);

//NEW FORM POST
postRoutes.get('/newpost', [auth.authenticateSession, auth.authenticateJWT], controllerPosts.postForm);
//CREATE PROCESS POST
postRoutes.post('/post/create', [auth.authenticateSession, auth.authenticateJWT], controllerPosts.createPost);

//EDIT FORM POST
postRoutes.get('/post/edit/:guid', [auth.authenticateSession, auth.authenticateJWT], controllerPosts.editPost);
//UPDATE PROCESS POST
postRoutes.post('/post/update/:guid', [auth.authenticateSession, auth.authenticateJWT], controllerPosts.updatePost);
//DELETE POST
postRoutes.post('/post/delete/:guid', [auth.authenticateSession, auth.authenticateJWT], controllerPosts.deletePost); 

//EXPORTA RUTAS DE USUARIOS
module.exports = postRoutes;