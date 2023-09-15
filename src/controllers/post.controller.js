/* controllers/post.controller.js */

//REQUIRES
const postService = require('../services/post.service');

//CLASE CONTROLADOR DE POSTS
class controllerPosts {

    //CONTROLLER VER TODOS LAS PUBLICACIONES
    async viewAllPosts(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        let message = "";
        const title = "ALL POSTS";
        const header = "LISTADO DE TODOS LOS POST";
        const templateName = "posts";
        try {
            const options = {
                order: [['title', 'ASC']],
            };
            const posts = await postService.getAllPosts(options);
            res.status(200).render('posts', { posts, title, header, templateName, message });
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
    async formPost(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        const postBody = req.body;
        try {
            const message = await postService.createPost(postBody);
            return res.status(200).send({ message });
        } catch(error) { 
                return res.status(400).send({ message: error.message });
        }
    }

    //CONTROLLER PROCESAMIENTO DE LA PUBLICACIÓN
    async processPost(req, res) {
        const postBody = req.body;
        try {
            const message = await postService.createPost(postBody);
            return res.status(200).send({ message });
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
            console.log(error);
            const title = "FORO ESTUDIANTIL";
            const header = "BIENVENID@, ESTE ES UN ESPACIO PENSADO PARA VOS...";
            const templateName = "index";
            return res.status(400).render('index', { title, header, templateName, message });
        }
    }

    //CONTROLLER ACTUALIZA DATOS DE UNA PUBLICACIÓN
    async updatePost(req, res) {
        const { guid } = req.params;
        const postBody = req.body;
        const title = "POST EDIT";
        const header = "EDICIÓN DE PUBLICACIÓN";
        const templateName = "postedit";
        const { post, user } = await postService.getPostById(guid);
        const firstName = user.firstName;
        const lastName = user.lastName;
        try {
            const message = await postService.updatePost(guid, postBody);
            return res.status(200).render('postedit', { post, title, firstName, lastName, header, templateName, message });
        } catch (error) {
            return res.status(400).render('index',{ message });
        }
    }

    //CONTROLLER ELIMINAR UNA PUBLICACIÓN
    async deletePost(req, res) {
        const { guid } = req.params;
        try {
            const message = await postService.deletePost(guid);
            return res.status(200).send({ message });
        } catch(error) {
            return res.status(400).send({ message: error.message });
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR DE PUBLICACIONES
module.exports = new controllerPosts();