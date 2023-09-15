/* services/post.service.js */

//REQUIRES
const Post = require('../models/post.model');
const User = require('../models/user.model');

//CLASE SERVICIO DE POSTS
class PostService {

    //DEVUELVE A TODOS LOS USUARIOS
    async getAllPosts(options) {
        try {
            const posts = await Post.findAll(options);
            return posts;
        } catch(error) {
            console.log("Error:", error);
            throw new Error("No se encontraron posts en la BD");
        }
    }

    //DEVUELVE UN POST POR GUID
    async getPostById(guid) {
        try {
            const post = await Post.findOne({ where: { guid: guid } });
            const user = await User.findOne({ where: { id: post.userId } })
            if(!post) { throw new Error(`Post con guid: ${guid} no encontrado en la BD`); }
            return { post, user };
        } catch(error) {
            throw new Error(`al buscar un post con guid: ${guid}`);
        }
    }

    //CREA UN NUEVO POST
    async createPost(userBody) {
        try {
            const newPost = await Post.create(userBody);
            return "Post creado exitosamente";
        } catch(error) {
            throw new Error("Error al intentar crear el post");
        }
    }

    //ACTUALIZA UN POST POR GUID
    async updatePost(guid, userBody) {
        try {
            const post = await Post.findOne({ where: {guid: guid} });
            if(!post) { throw new Error("El post no existe en la BD"); }
            await Post.update(userBody, { where: {guid: guid} });
            return `El post ${post.title} ha sido actualizado exitosamente`;
        } catch(error) {
            throw new Error(`Error al actualizar el post con guid: ${guid}`);
        }
    }

    //ELIMINA UN POST POR GUID
    async deletePost(guid) {
        try {
            const deletedPost = await Post.destroy({ where: { guid: guid} });
            if(!deletedPost) { throw new Error(`El post con guid: ${guid} no se ha encontrado en la BD`); }
            return `El post con guid: ${guid} ha sido eliminado exitosamente`;
        } catch(error) {
            throw new Error(`al intentar eliminar el post con guid: ${guid}`);
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE SERVICIO DE POSTS
module.exports = new PostService();