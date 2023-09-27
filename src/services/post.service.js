/**
 * Módulo de servicios relacionados con publicaciones.
 * @module services/post.service
 */

// Requiere el modelo de post
const Post = require('../models/post.model');

// Requiere el modelo de usuario
const User = require('../models/user.model');

// Requiere el módulo de generación de Universal Unique ID
const { v4: uuidv4 } = require('uuid');

/**
 * Clase que proporciona servicios relacionados con publicaciones.
 */
class PostService {

    /**
     * Obtiene todos las publicaciones almacenados en la base de datos.
     * @returns {Promise<Array>} Un array de objetos de publicaciones.
     * @throws {Error} Si no se encuentran publicaciones en la base de datos.
     * 
     * @example
     * const posts = await postService.getAllPosts();
     */
    async getAllPosts() {
        try {
            const posts = await Post.findAll();
            return posts;
        } catch(error) {
            throw new Error("No se encontraron posts en la BD");
        }
    }

    /**
   * Obtiene un conjunto de publicaciones de la base de datos paginadas.
   * @param {number} pageNumber - El numero de página deseado.
   * @returns {Promise<Array>} Un array de objetos de publicaciones limitado por la paginación.
   * @throws {Error} Si no se encuentran publicaciones en la base de datos.
   *                 Esto puede ocurrir debido a problemas de conexión o consulta.
   * 
   * @example
   * const pageNumber = 2;
   * try {
   *   const users = await getAllUsersByPageNumber(pageNumber);
   *   console.log(users); // Array de usuarios de la página 2
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
  async getAllPostsByPageNumber(pageNumber) {
    try {
      const itemsPerPage = 4; 
      const offset = (pageNumber - 1) * itemsPerPage;
      const posts = await Post.findAll({
        offset,
        limit: itemsPerPage,
      });
      return posts;
    } catch (error) {
      throw new Error("no se encontraron publicaciones en la BD");
    }
  }

    /**
     * Obtiene todos los datos de una publicación por su GUID almacenados en la base de datos y del usuario que publicó.
     * @param {number} guid - El GUID de la publicación a obtener.
     * @returns {Promise<{post: Object, user: Object}>} Un objeto que contiene los datos de la publicación y del usuario que publicó.
     * @throws {Error} Si no se encuentra la publicación buscada en la base de datos.
     * 
     * @example
     * const { post, user } = await postService.getPostByGuid(guid);
     */
    async getPostByGuid(guid) {
        try {
            const post = await Post.findOne({ where: { guid: guid } });
            const user = await User.findOne({ where: { id: post.userId } })
            if(!post) { throw new Error(`Post con guid: ${guid} no encontrado en la BD`); }
            return { post, user };
        } catch(error) {
            throw new Error(`Error al buscar un post con guid: ${guid}`);
        }
    }

    /**
     * Crea una nueva publicación en la base de datos.
     *
     * @param {Object} userBody - Un objeto que contiene la información de la nueva publicación.
     * @param {string} userBody.title - El título de la publicación.
     * @param {string} userBody.content - El contenido de la publicación.
     * @param {string} userBody.img - El link de la imagen de la publicación.
     * @param {string} userBody.userId - El ID del usuario que publica.
     * @returns {string} Un mensaje que indica si la publicación fue guardada con éxito o no.
     * @throws {Error} Si ocurre un error al intentar crear la publicación.
     *
     * @example
     * const newPost = {
     *   title: "Nueva Publicación",
     *   content: "Este es el cuerpo del mensaje de la nueva publicación que se desea guardar",
     *   img: "https://imagesserver.com/image-name-description-link.jpg",
     *   userId: "2",
     * };
     * try {
     *   const resultMessage = await createPost(newUser);
     *   console.log(resultMessage);
     * } catch (error) {
     *   console.error(error.message);
     * }
     */
    async createPost(userBody) {
        const { title, content, img, userId } = userBody;
        if(!title || !content || !img || !userId) {
            throw new Error("complete todos los campos *obligatorios");
        }
        try {
            const newPost = await Post.create({
                guid: uuidv4(),
                title: title,
                content: content,
                img: img,
                userId: userId,
                datePost: new Date(),
            });
            if(newPost) {
                return `Su publicación "${title}" fue creada con éxito`;
            } else {
                throw new Error("Error al intentar crear la publicación");
            }
        } catch(error) {
            throw new Error("Error no se pudo crear la publicación");
        }
    }

    /**
     * Actualiza una publicación en la base de datos.
     * @param {number} guid - El GUID de la publicación a actualizar.
     * @param {object} userBody - Los datos actualizados de la publicación.
     * @returns {string} Un mensaje de éxito o un error si falla.
     * @throws {Error} Si la publicación no existe en la base de datos.
     */
    async updatePost(guid, userBody) {
        try {
            const post = await Post.findOne({ where: {guid: guid} });
            if(!post) { throw new Error("El post no existe en la BD"); }
            await Post.update(userBody, { where: {guid: guid} });
            return `El post #${guid} ha sido actualizado con éxito`;
        } catch(error) {
            throw new Error(`Error al actualizar el post con guid: ${guid}`);
        }
    }

    /**
     * Elimina una publicación de la base de datos.
     * @param {number} guid - El GUID de la publicación a eliminar.
     * @returns {string} Un mensaje de éxito o un error si falla.
     * @throws {Error} Si la publicación no existe en la base de datos.
     */
    async deletePost(guid) {
        try {
            const deletedPost = await Post.destroy({ where: { guid: guid} });
            if(!deletedPost) { throw new Error(`El post con guid: ${guid} no se ha encontrado en la BD`); }
            if(deletedPost) { 
                return `El post con guid: ${guid} ha sido eliminado con éxito`; 
            } else {
                throw new Error(`Error al intentar eliminar el post con guid: ${guid}`);
            }
        } catch(error) {
            throw new Error(`Error al eliminar el post con guid: ${guid}`);
        }
    }
}

/**
 * Instancia de la clase PostService.
 * @type {PostService}
 */
const postServiceInstance = new PostService();

// EXPORTA LA INSTANCIA DE LA CLASE SERVICIO DE PUBLICACIONES
module.exports = postServiceInstance;