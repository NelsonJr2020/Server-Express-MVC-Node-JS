/* services/user.service.js */

//REQUIRES
const User = require('../models/user.model');
const { Op } = require('sequelize');
const jwt = require('../middlewares/auth.middleware');
const bcrypt = require('bcrypt');

//CLASE SERVICIO DE USUARIO
class UserService {

    //USER SERVICE DEVUELVE A TODOS LOS USUARIOS
    async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch(error) {
            throw new Error("no se encontraron usuarios en la BD");
        }
    }

    //USER SERVICE DEVUELVE USUARIO POR ID
    async getUserById(id) {
        try {
            const user = await User.findOne({ where: {id: id} });
            if(!user) { throw new Error(`usuario con id: ${id} no encontrado en la BD`); }
            return user;
        } catch(error) {
            throw new Error(`al buscar al usuario con id: ${id}`);
        }
    }

    //USER SERVICE VERIFICA LAS CREDENCIALES DE UN USUARIO Y GENERA UN TOKEN JWT
    async verifyUserCredentials(req, email, password) {
        try {
            const user = await User.findOne({ where: { email: email } });

            if(!user) {
                throw new Error("usuario no encontrado");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid) {
                throw new Error("contraseña incorrecta");
            }

            req.session.userId = user.id;

            const payload = {
                userId: user.id,
                email: user.email,
            };
            
            const time = '20m';
            const token = jwt.generateToken(payload, time);
            return { user, token };
        } catch(error) {
            throw new Error("al intentar hacer el login");
        }
    }

    //USER SERVICE OBTIENE EL PERFIL DE UN USUARIO POR EL PARÁMETRO ID
    async getProfile(id) {
    try {
        const user = await User.findOne({ where: {id: id} });
        if(!user) {
            throw new Error("usuario no encontrado");
        }
        
        const profile = {
            user,
            //preferences: await getPreferences(id),
            //details: await getDetails(id),
        };
        
        return profile;
        } catch(error) {
            throw new Error("al obtener el perfil del usuario");
        }
    }

    //USER SERVICE VERIFICA SI EXISTE EL EMAIL
    async checkEmail(email) {
        try {
            const existingUser = await User.findOne({ where: { email } });
            return existingUser !== null;
        } catch (error) {
            throw new Error("al verificar el correo electrónico");
        }
    }

    //USER SERVICE CREA UN NUEVO USUARIO
    async createUser(userBody) {
        const { firstName, lastName, email, password, birthDate } = userBody;
        if(!firstName || !lastName || !email || !password || !birthDate) {
            throw new Error("complete todos los campos *obligatorios");
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: 3,
                birthDate,
                isActive: 1,
            });
            return `El usuario ${email} fue creado con éxito`;
        } catch(error) {
            throw new Error(`al intentar crear el usuario ${email}`);
        }
    }

    //SERVICE ACTUALIZA UN USUARIO POR ID
    async updateUser(id, userBody) {
        try {
            const user = await User.findOne({ where: {id: id} });
            if(!user) { throw new Error("Usuario no existe en la BD"); }
            await User.update(userBody, { where: {id: id} });
            return `Usuario con id: ${id} actualizado exitosamente`;
        } catch(error) {
            throw new Error(`al actualizar el usuario con id: ${id}`);
        }
    }

    //SERVICE ELIMINA UN USUARIO POR ID
    async deleteUser(id) {
        try {
            const deletedUser = await User.destroy({ where: { id: id } });
            if(!deletedUser) { throw new Error(`Usuario con id: ${id} no encontrado en la BD`); }
            return `Usuario con id: ${id} eliminado exitosamente`;
        } catch(error) {
            throw new Error(`al intentar eliminar el usuario con id: ${id}`);
        }
    }

    //SERVICE CIERRA SESIÓN DE USUARIO
    async closeSession(req, res) {
        try {
            delete req.session.userId;
            res.clearCookie('jwt');
            return true;
        } catch (error) {
            throw new Error("al cerrar la sesión");
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE SERVICIO DE USUARIO
module.exports = new UserService();