/* services/data.service.js */

//REQUIRES
const Post = require('../models/post.model');
const User = require('../models/user.model');
const { Op } = require('sequelize');

//CLASE SERVICIO DE DATOS
class DataService {

    //DATA SERVICE DEVUELVE CANTIDAD DE USUARIOS
    async getCountUsers() {
        try {
            const total = await User.count();
            return total;
        } catch(error) {
            throw new Error("No se encontraron usuarios en la BD");
        }
    }

    //DATA SERVICE DEVUELVE CANTIDAD DE PUBLICACIONES
    async getCountPosts() {
        try {
            const total = await Post.count();
            return total;
        } catch(error) {
            throw new Error("No se encontraron publicaciones en la BD");
        }
    }

    //DATA SERVICE DEVUELVE CANTIDAD DE USUARIOS Y DE PUBLICACIONES
    async getCountUsersAndPosts() {
        try {
            const totalUsers = await User.count();
            const totalPosts = await Post.count();
            return { totalUsers, totalPosts };
        } catch (error) {
            throw new Error("Error al obtener datos del sistema");
        }
    }

    //DATA SERVICE DEVUELVE CANTIDAD DE USUARIOS ACTIVOS
    async getCountActiveUsers() {
        try {
            const totalActive = await User.count({
                where: {
                    isActive: true,
                },
            });
            return totalActive;
        } catch (error) {
            throw new Error("No se encontraron usuarios activos en la BD");
        }
    }

    //DATA SERVICE DEVUELVE PUBLICACIONES CREADAS DESPUÉS DE UNA FECHA
    async getPostsCreatedAfter(date) {
        try {
            const posts = await Post.findAll({
                where: {
                    createdAt: {
                        [Op.gt]: date,
                    },
                },
            });
            return posts;
        } catch (error) {
            throw new Error("Error al obtener publicaciones después de la fecha proporcionada");
        }
    }
    
}

//EXPORTA LA INSTANCIA DE LA CLASE SERVICIO DE USUARIO
module.exports = new DataService();