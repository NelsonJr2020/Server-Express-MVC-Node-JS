/* routes/post.routes.js */

//REQUIRES
const postRoutes = require("express").Router();
const controllerPosts = require("../controllers/post.controller");
const auth = require('../middlewares/auth.middleware');
const img = require('../middlewares/img.middleware');

//RUTAS DEL CRUD DE POSTS
postRoutes.get("/posts", [auth.authenticateSession, auth.authenticateJWT], controllerPosts.viewAllPosts); //VIEW ALL POSTS
postRoutes.get("/post/:guid", [auth.authenticateSession, auth.authenticateJWT], controllerPosts.viewPost); //VIEW POST BY GUID

//CREATE FORM POST
postRoutes.get("/post/create/:guid", [auth.authenticateSession, auth.authenticateJWT], controllerPosts.postForm); 
//CREATE PROCESS POST
postRoutes.post("/post/create", [auth.authenticateSession, auth.authenticateJWT], controllerPosts.postProcess); 

//UPDATE FORM POST 
postRoutes.get("/post/edit/:guid", [auth.authenticateSession, auth.authenticateJWT], controllerPosts.editPost);
//UPDATE PROCESS POST
postRoutes.post("/post/edit/:guid", [auth.authenticateSession, auth.authenticateJWT], controllerPosts.updatePost);
//DELETE POST
postRoutes.post("/post/delete/:guid", [auth.authenticateSession, auth.authenticateJWT], controllerPosts.deletePost); 

//EXPORTA RUTAS DE USUARIOS
module.exports = postRoutes;