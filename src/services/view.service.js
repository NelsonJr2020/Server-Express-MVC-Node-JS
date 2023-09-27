/**
 * Módulo de servicios relacionados con vistas.
 * @module services/view.service
 */

// Requiere el modulo factory de vistas
const viewFactory = require('../utils/view.factory');


/**
 * Clase que proporciona servicios relacionados con generacion de vistas.
 */
class ViewService {

    /**
     * Crea una vista en función del nombre de la vista y los datos proporcionados.
     *
     * @param {string} viewName - El nombre de la vista a generar.
     * @param {Object} data - Un objeto que contiene solamente los datos necesarios para generar la vista.
     * @param {object} data.messages - Los mensajes que se deben pasar a la vista.
     * @param {Boolean} data.isAuthenticated - El estado de autenticación del usuario que solicita la vista.
     * @param {string} data.userId - El id del usuario si está logueado.
     * @param {string} data.userRole - El rol del usuario si está logueado.
     * @param {string} data.userActive - El estado activo del usuario si está logueado.
     * @param {Object} data.profile - Un objeto que contiene la información de 
     * @param {Object} data.user - Un objeto que contiene la información de un usuario.
     * @param {Object} data.post - Un objeto que contiene la información de una publicación.
     * @param {Array} data.users - Un objeto que contiene la información de varios usuarios.
     * @param {Array} data.posts - Un objeto que contiene la información de varias publicaciones.
     * @returns {string} El contenido de la vista generada.
     *
     * @example
     * 
     * Este es un ejemplo de uso particular de un usuario que desea ver una lista de publicaciones.
     * Suponiendo que el usuario está logueado, tenemos en el controlador de publicaciones lo siguiente.
     * Pudiendo ser dentro del método viewAllPosts(req, res) {...}
     * try {
     *  //Obtenemos todos los posts de la base de datos
     *  const posts = await postService.getAllPosts();
     *  //Obtenemos las credenciales de autenticación del usuario (ID, ROL, ACTIVE)
     *  const authData = userService.getAuthData(req);
     *  //Agregamos los datos obtenidos a data, junto a mensajes existentes y los posts obtenidos
     *  const data = {
     *      ...authData,
     *      messages: messageService.getMessages(),
     *      posts: posts,
     *  };
     *  //Intentamos generar la vista pasando el nombre de vista `posts` y los datos con `data`
     *  res.status(200).send(viewService.viewRender("posts", data));
     *   //En caso de error capturamos el error y lo agregamos con el servicio de mensajería interna
     * } catch (error) {
     *    messageService.addMessage(
     *       "Hubo un error al obtener las publicaciones.",
     *       "error"
     *    );
     *    //Redireccionamos al perfil de usuario para mostrar el error en pantalla
     *    return res.status(400).redirect('/profile');
     * }
     */
    viewRender(viewName, data) {
        return viewFactory.generateView(viewName, data);
    }
}

/**
 * Instancia de la clase ViewService.
 * @type {ViewService}
 */
 const viewServiceInstance = new ViewService();

 // EXPORTA LA INSTANCIA DE LA CLASE SERVICIO DE VISTAS
 module.exports = viewServiceInstance;