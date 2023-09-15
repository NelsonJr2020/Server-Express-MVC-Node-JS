/* controllers/user.controller.js */

//REQUIRES
const userService = require('../services/user.service');

//CLASE CONTROLADOR DE USUARIOS
class controllerUsers {

    //CONTROLLER VER TODOS LOS USUARIOS
    async viewAllUsers(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        const title = "USERS";
        let users = "";
        let header = "VISTA DE TODOS LOS USUARIOS";
        let message = "";
        const templateName = "users";
        
        try {
            users = await userService.getAllUsers();
            res.status(200).render('users', { users, header, title, templateName, message });
        } catch(error) {
            return res.status(400).render('users', { users, header, title, templateName, message });
        }
    }

    //CONTROLLER VER USUARIO POR ID
    async viewUser(req, res) {
        if(!req.session.userId) {
            return res.redirect('/');
        }
        const { id } = req.params;
        let title = "VIEW USER";
        let header = "";
        let message = "";
        let user = "";
        let templateName = "user";
        try {
            user = await userService.getUserById(id);
            header = "VISTA DEL USUARIO: " + user.firstName;
            return res.status(200).render('user', { user, title, header, templateName, message });
        } catch(error) {
            const users = await userService.getAllUsers();
            message = "No existe el usuario";
            title = "USERS";
            header = "LISTADO DE USUARIOS";
            templateName = "users";
            return res.status(400).render('users', { users, title, header, templateName, message });
        }
    }

    //CONTROLLER FORMULARIO DE REGISTRO DE USUARIO
    registerForm(req, res) {
        if(req.session.userId) {
            return res.redirect('profile');
        }
        try {
            const title = "REGISTRO";
            const header = "REGISTRO DE USUARIO";
            const templateName = "register";
            let message = "";
            res.locals.isAuthenticated = false;
            return res.status(200).render('register', { title, header, templateName, message });
        } catch(error) {
            message = error;
            return res.status(400).render('index', { message });
        }
    }

    //CONTROLLER PROCESAMIENTO DE REGISTRO DE USUARIO
    async registerProcess(req, res) {
        const title = "REGISTRO";
        const header = "REGISTRO DE USUARIO";
        const templateName = "register";
        const userBody = req.body;
        let message = "";
        const emailExists = await userService.checkEmail(userBody.email);
        if (emailExists) {
            const message = "El correo electrónico ya está en uso";
            return res.status(400).render('register', { title, header, templateName, message });
        }
        try {
            const title = "LOGIN";
            const header = "INICIO DE SESIÓN";
            const templateName = "login";
            message = await userService.createUser(userBody);
            return res.status(200).render('login', { title, header, templateName, message });
        } catch(error) {
            message = error;
            return res.status(400).render('register', { title, header, templateName, message });
        }
    }

    //CONTROLLER FORMULARIO DE LOGIN DE USUARIO
    loginForm(req, res) {
        if(req.session.userId) {
            return res.redirect('profile');
        }
        let message = "";
        try {
            const title = "LOGIN";
            const header = "INICIO DE SESIÓN";
            const templateName = "login";
            res.locals.isAuthenticated = false;
            return res.status(200).render('login', { title, header, templateName, message });
        }
        catch(error) {
            message = error;
            return res.status(400).render('index', { message });
        }
    }

    //CONTROLLER PROCESAMIENTO DE LOGIN DE USUARIO
    async loginProcess(req, res) {
        const { email, password } = req.body;
        let title = "LOGIN";
        let header = "INICIO DE SESIÓN";
        let templateName = "login";
        let message = "";
        try {
            const { user, token } = await userService.verifyUserCredentials(req, email, password);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); //3.600.000 ms -> 1 h
            return res.status(200).redirect('profile');
        } catch(error) {
            message = error;
            return res.status(401).render('login',{ title, header, templateName, message });
        }
    }

    //CONTROLLER MUESTRA PERFIL DE USUARIO
    async profileUser(req, res) {
        const title = "PROFILE";
        const header = "PERFIL DE USUARIO";
        const templateName = "profile";
        let message = req.session.message;
        delete req.session.message;
        try {
            const id = req.user.userId;
            const profile = await userService.getProfile(id);
            message = `${profile.user.firstName} bienvenid@ a tu perfil`;
            return res.status(200).render('profile', { profile, title, header, templateName, message });
        } catch(error) {
            message = error;
            return res.status(400).render('index', { message });
        }
    }

    //CONTROLLER ACTUALIZA INFORMACIÓN DE USUARIO
    async updateUser(req, res) {
        const { id } = req.params;
        const userBody = req.body;
        try {
            const message = await userService.updateUser(id, userBody);
            return res.status(200).send({ message });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    //CONTROLLER ELIMINA UN USUARIO POR ID
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const message = await userService.deleteUser(id);
            return res.status(200).send({ message });
        } catch(error) {
            return res.status(400).send({ message: error.message });
        }
    }

    //CONTROLLER CIERRA SESIÓN
    async closeSession(req, res) {
        try {
            const success = await userService.closeSession(req);
    
            if(success) {
                return res.status(200).render('/', { message: '¡Gracias por usar la aplicación!' });
            } else {
                return res.status(500).render('/', { message: 'Hubo un error al cerrar la sesión.' });
            }
        } catch(error) {
            return res.status(500).render('/', { message: 'Hubo un error al cerrar la sesión.' });
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR DE USUARIOS
module.exports = new controllerUsers();