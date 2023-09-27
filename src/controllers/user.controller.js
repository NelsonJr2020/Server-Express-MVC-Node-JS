/* controllers/user.controller.js */

//REQUIRES
const userService = require("../services/user.service");
const viewService = require("../services/view.service");
const messageService = require("../services/message.service");

//CLASE CONTROLADOR DE USUARIOS
class controllerUsers {
  //CONTROLLER VER TODOS LOS USUARIOS
  async viewAllUsers(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    try {
      const authData = userService.getAuthData(req);
      const { pageNumber } = req.params;
      const users = await userService.getAllUsersByPageNumber(pageNumber);
      const data = {
        ...authData,
        messages: messageService.getMessages(),
        users: users,
      };
      res.status(200).send(viewService.viewRender("users", data));
    } catch (error) {
      messageService.addMessage(
        "Hubo un error al obtener los usuarios.",
        "error"
      );
      return res.status(400).redirect("/profile");
    }
  }

  //CONTROLLER VER USUARIO POR ID
  async viewUser(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    try {
      const { id } = req.params;
      const authData = userService.getAuthData(req);
      const profile = await userService.getProfile(id);
      const data = {
        ...authData,
        messages: messageService.getMessages(),
        profile: profile,
      };
      return res.status(200).send(viewService.viewRender("user", data));
    } catch (error) {
      messageService.addMessage("No existe el usuario", "error");
      // return res.status(400).redirect('/users');
      return res.status(400).send({ message: error.message });
    }
  }

  //CONTROLLER MUESTRA PERFIL DE USUARIO
  async viewProfile(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/login");
    }
    try {
      const authData = userService.getAuthData(req);
      const profile = await userService.getProfile(authData.userId);
      const data = {
        ...authData,
        messages: messageService.getMessages(),
        profile: profile,
      };
      return res.status(200).send(viewService.viewRender("profile", data));
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  //CONTROLLER FORMULARIO DE EDICIÓN DE DATOS DE USUARIO
  async editUserForm(req, res) {
    try {
      const { id } = req.params;
      const authData = userService.getAuthData(req);
      if (authData.userRole == 1 || authData.userRole == 2) {
        const profile = await userService.getProfile(id);
        const data = {
          ...authData,
          messages: messageService.getMessages(),
          profile: profile,
        };
        return res.status(200).send(viewService.viewRender("useredit", data));
      } else {
        messageService.addMessage(
          "No posee credenciales para editar un usuario",
          "error"
        );
        return res.status(400).redirect("/users/page/1");
      }
    } catch (error) {
      messageService.addMessage(
        `Hubo un error con el registro! ${error}`,
        `error`
      );
      return res.status(400).send({ message: error.message });
    }
  }

  //CONTROLLER FORMULARIO DE REGISTRO DE USUARIO
  registerForm(req, res) {
    if (req.session.userId) {
      return res.redirect("/profile");
    } else {
      res.locals.isAuthenticated = false;
    }
    try {
      const data = {
        isAuthenticated: res.locals.isAuthenticated,
        messages: messageService.getMessages(),
      };
      return res.status(200).send(viewService.viewRender("register", data));
    } catch (error) {
      messageService.addMessage(
        `Hubo un error con el registro! ${error}`,
        `error`
      );
      return res.status(400).redirect("/");
    }
  }

  //CONTROLLER PROCESAMIENTO DE REGISTRO DE USUARIO
  async registerProcess(req, res) {
    let userBody = req.body;
    res.locals.isAuthenticated = false;
    const emailExists = await userService.checkEmail(userBody.email);
    if (emailExists) {
      messageService.addMessage(
        `El correo electrónico ${userBody.email} ya está en uso`,
        `warning`
      );
      const data = {
        isAuthenticated: res.locals.isAuthenticated,
        messages: messageService.getMessages(),
      };
      return res.status(400).send(viewService.viewRender("register", data));
    }
    try {
      const authData = userService.getAuthData(req);
      const message = await userService.createUser(userBody);
      messageService.addMessage(message, "success");
      const data = {
        ...authData,
        messages: messageService.getMessages(),
      };
      return res.status(200).send(viewService.viewRender("login", data));
    } catch (error) {
      messageService.addMessage(
        `Error al procesar el registro, reintente por favor! ${error}`,
        `error`
      );
      const data = {
        isAuthenticated: res.locals.isAuthenticated,
        messages: messageService.getMessages(),
      };
      return res.status(400).send(viewService.viewRender("register", data));
    }
  }

  //CONTROLLER FORMULARIO DE LOGIN DE USUARIO
  loginForm(req, res) {
    if (req.session.userId) {
      return res.redirect("/profile");
    } else {
      res.locals.isAuthenticated = false;
    }
    try {
      const data = {
        isAuthenticated: res.locals.isAuthenticated,
        messages: messageService.getMessages(),
      };
      return res.status(200).send(viewService.viewRender("login", data));
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/");
    }
  }

  //CONTROLLER PROCESAMIENTO DE LOGIN DE USUARIO
  async loginProcess(req, res) {
    const { email, password } = req.body;
    try {
      const { user, token } = await userService.verifyUserCredentials(
        req,
        email,
        password
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); //3.600.000 ms -> 1 h
      return res.status(200).redirect("/profile");
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(401).redirect("login");
    }
  }

  //CONTROLLER ACTUALIZA INFORMACIÓN DE USUARIO
  async updateUser(req, res) {
    const { id } = req.params;
    const userBody = req.body;
    try {
      const authData = userService.getAuthData(req);
      if (authData.userRole == 1 || authData.userRole == 2) {
        if (!userBody.isActive) {
          const desactivate = await userService.desactivateUser(id);
          if (desactivate) {
            messageService.addMessage(`El usuario ${userBody.email} fue desactivado`, "success");
          }
        } else if (userBody.isActive) {
          const userIsActive = await userService.checkUserIsActive(id);
          if (!userIsActive) {
            const activate = await userService.activateUser(id);
            if (activate) {
              messageService.addMessage(`El usuario ${userBody.email} fue desactivado`, "success");
            }
          }
        }
        const message = await userService.updateUser(id, userBody);
        messageService.addMessage(message, "success");
        return res.status(200).redirect("/users/page/1");
      } else {
        messageService.addMessage(
          "No posee credenciales para editar un usuario",
          "error"
        );
        return res.status(400).redirect("/users/page/1");
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/users/page/1");
    }
  }

  //CONTROLLER ACTUALIZA INFORMACIÓN DE PERFIL DE USUARIO
  async updateProfile(req, res) {
    const userBody = req.body;
    try {
      const authData = userService.getAuthData(req);
      if (authData.userActive) {
        const message = await userService.updateUser(authData.userId, userBody);
        messageService.addMessage(message, "success");
        return res.status(200).redirect("/profile");
      } else {
        messageService.addMessage(
          "Ud. se encuentra desactivado por favor contáctese con el administrador",
          "error"
        );
        return res.status(400).redirect("/profile");
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/profile");
    }
  }

  //CONTROLLER ELIMINA UN USUARIO POR ID
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const authData = userService.getAuthData(req);
      if (authData.userRole == 1) {
        const deleteUser = await userService.deleteUser(id);
        messageService.addMessage(deleteUser, "success");
        return res.status(200).redirect("/users/page/1");
      } else {
        messageService.addMessage(
          "No posee credenciales para eliminar un usuario",
          "error"
        );
        return res.status(400).redirect("/users/page/1");
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/users/page/1");
    }
  }

  //CONTROLLER CIERRA SESIÓN
  async closeSession(req, res) {
    try {
      const success = await userService.closeSession(req, res);
      if (success) {
        messageService.addMessage(
          "Muchas gracias por utilizar nuestros servicios!",
          "success"
        );
        return res.status(200).redirect("/");
      } else {
        messageService.addMessage(
          "Ocurrió un error al intentar cerrar la sesión!",
          "error"
        );
        return res.status(500).redirect("/");
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(500).redirect("/");
    }
  }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR DE USUARIOS
module.exports = new controllerUsers();
