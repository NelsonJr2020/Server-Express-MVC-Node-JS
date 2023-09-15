/* controllers/post.controller.js */

//REQUIRES
const postService = require('../services/post.service');
const userService = require('../services/user.service');

//CLASE CONTROLADOR DE POSTS
class controllerPosts {

    //CONTROLLER VER TODOS LAS PUBLICACIONES
    async viewAllPosts(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        const userId = req.session.userId;
        let message = "";
        const title = "ALL POSTS";
        const header = "LISTADO DE TODOS LOS POST";
        const templateName = "posts";
        try {
            const options = {
                order: [['title', 'ASC']],
            };
            const posts = await postService.getAllPosts(options);
            res.status(200).render('posts', { posts, userId, title, header, templateName, message });
        } catch(error) {
            return res.status(400).send({ message: error.message });
        }
    }
    
    //CONTROLLER VER PUBLICACIÓN POR GUID
    async viewPost(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        const { guid } = req.params;
        const title = "POST";
        const templateName = "post";
        let message = "";
        try {
            const { post, user } = await postService.getPostById(guid);
            const header = `PUBLICACIÓN « ${post.title} »`;
            const firstName = user.firstName;
            const lastName = user.lastName;
            return res.status(200).render('post', { post, firstName, lastName, title, header, templateName, message });
        } catch(error) {
            return res.status(400).send({ message: error.message });
        }
    }

    //CONTROLLER FORMULARIO DE CREACIÓN DE PUBLICACIÓN
    async postForm(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        let message = "";
        try {
            
            const userId = req.session.userId;
            const user = await userService.getUserById(userId);
            const firstName = user.firstName;
            const lastName = user.lastName;
            const title = "POST CREATE";
            const header = "CREACIÓN DE UNA PUBLICACIÓN";
            const templateName = "postcreate";
            return res.status(200).render('postcreate', { userId, firstName, lastName, title, header, templateName, message });
        } catch(error) { 
                return res.status(400).send({ message: error.message });
        }
    }

    //CONTROLLER PROCESAMIENTO DE LA CREACIÓN DE LA PUBLICACIÓN
    async postProcess(req, res) {
        const postBody = req.body;
        const title = "ALL POSTS";
        const header = "LISTADO DE TODOS LOS POST";
        const templateName = "posts";
        const userId = req.session.userId;
        const user = userService.getUserById(userId);
        const firstName = user.firstName;
        const lastName = user.lastName;
        try {
            const message = await postService.createPost(postBody);
            const options = {
                order: [['title', 'ASC']],
            };
            const posts = await postService.getAllPosts(options);
            res.status(200).render('posts', { posts, userId, firstName, lastName, title, header, templateName, message });
        } catch(error) { 
                return res.status(400).send({ message: error.message });
        }
    }

    //CONTROLLER ACTUALIZA DATOS DE UNA PUBLICACIÓN
    async editPost(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        const { guid } = req.params;
        let message = "";
        try {
            const title = "POST EDIT";
            const header = "EDICIÓN DE PUBLICACIÓN";
            const templateName = "postedit";
            const { post, user } = await postService.getPostById(guid);
            const firstName = user.firstName;
            const lastName = user.lastName;
            return res.status(200).render('postedit', { post, title, firstName, lastName, header, templateName, message });
        } catch (error) {
            message = error;
            const title = "FORO ESTUDIANTIL";
            const header = "BIENVENID@, ESTE ES UN ESPACIO PENSADO PARA VOS...";
            const templateName = "index";
            return res.status(400).render('index', { title, header, templateName, message });
        }
    }

    //CONTROLLER EDICION DE DATOS DE UNA PUBLICACIÓN
    async updatePost(req, res) {
        const { guid } = req.params;
        const postBody = req.body;
        const title = "POST";
        const templateName = "post";
        try {
            const message = await postService.updatePost(guid, postBody);
            const { post, user } = await postService.getPostById(guid);
            const header = `PUBLICACIÓN « ${post.title} »`;
            const firstName = user.firstName;
            const lastName = user.lastName;
            return res.status(200).render('post', { post, title, firstName, lastName, header, templateName, message });
        } catch (error) {
            return res.status(400).render('index',{ message });
        }
    }

    //CONTROLLER ELIMINAR UNA PUBLICACIÓN
    async deletePost(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        const { guid } = req.params;
        const title = "ALL POSTS";
        const header = "LISTADO DE TODOS LOS POST";
        const templateName = "posts";
        try {
            const message = await postService.deletePost(guid);
            const options = {
                order: [['title', 'ASC']],
            };
            const posts = await postService.getAllPosts(options);
            res.status(200).render('posts', { posts, title, header, templateName, message });
        } catch(error) {
            return res.status(400).send({ message: error.message });
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR DE PUBLICACIONES
module.exports = new controllerPosts();