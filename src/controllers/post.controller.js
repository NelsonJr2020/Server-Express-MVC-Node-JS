/* controllers/post.controller.js */

//REQUIRES
const postService = require("../services/post.service");
const viewService = require("../services/view.service");
const userService = require("../services/user.service");
const messageService = require("../services/message.service");

//CLASE CONTROLADOR DE POSTS
class controllerPosts {
  //CONTROLLER VER TODOS LAS PUBLICACIONES
  async viewAllPosts(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    try {
      const authData = userService.getAuthData(req);
      const { pageNumber } = req.params;
      const posts = await postService.getAllPostsByPageNumber(pageNumber);
      const data = {
        ...authData,
        messages: messageService.getMessages(),
        posts: posts,
      };
      res.status(200).send(viewService.viewRender("posts", data));
    } catch (error) {
      messageService.addMessage(
        "Hubo un error al obtener las publicaciones.",
        "error"
      );
      // return res.status(400).redirect('/profile');
      return res.status(400).send({ message: error.message });
    }
  }

  //CONTROLLER VER PUBLICACIÓN POR GUID
  async viewPost(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    const { guid } = req.params;
    const validGuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!validGuidPattern.test(guid)) {
      messageService.addMessage(
        "No se puede obtener una publicación con un guid no válido",
        "error"
      );
      return res.status(400).redirect("/posts/page/1");
    }
    try {
      const { post, user } = await postService.getPostByGuid(guid);
      const authData = userService.getAuthData(req);
      const data = {
        ...authData,
        messages: messageService.getMessages(),
        post: post,
        user: user,
      };
      return res.status(200).send(viewService.viewRender("post", data));
    } catch (error) {
      messageService.addMessage(
        "Hubo un error al obtener la publicación.",
        "error"
      );
      // return res.status(400).redirect('/posts');
      return res.status(400).send({ message: error.message });
    }
  }

  //CONTROLLER FORMULARIO DE CREACIÓN DE PUBLICACIÓN
  async postForm(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    try {
      const authData = userService.getAuthData(req);  
      if (authData.userActive) {
        const profile = await userService.getProfile(authData.userId);
        const data = {
          ...authData,
          isAuthenticated: res.locals.isAuthenticated,
          messages: messageService.getMessages(),
          profile: profile,
        };
        return res.status(200).send(viewService.viewRender("postcreate", data));
      } else {
        messageService.addMessage(
          "No posee la autorización para crear una publicación",
          "error"
        );
        return res.status(401).redirect("/posts/page/1");
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/posts/page/1");
    }
  }

  //CONTROLLER PROCESAMIENTO DE LA CREACIÓN DE LA PUBLICACIÓN
  async createPost(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    const postBody = req.body;
    try {
      const authData = userService.getAuthData(req);
      if (authData.userActive) {
        const message = await postService.createPost(postBody);
        messageService.addMessage(message, "success");
        return res.status(200).redirect("/posts/page/1");
      } else {
        messageService.addMessage(
          "No posee la autorización para publicar",
          "error"
        );
        return res.status(401).redirect("/posts/page/1");
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/posts/page/1");
    }
  }

  //CONTROLLER MUESTRA EL FORMULARIO DE EDICIÓN DE UNA PUBLICACIÓN
  async editPost(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    const { guid } = req.params;
    try {
      const authData = userService.getAuthData(req);
      const { post, user } = await postService.getPostByGuid(guid);
      if (authData.userRole == 1 || authData.userRole == 2) {
        const data = {
          ...authData,
          messages: messageService.getMessages(),
          post: post,
          user: user,
        };
        return res.status(200).send(viewService.viewRender("postedit", data));
      } else {
        if (authData.userActive) {
          if (user.id == authData.userId) {
            const data = {
              ...authData,
              messages: messageService.getMessages(),
              post: post,
              user: user,
            };
            return res
              .status(200)
              .send(viewService.viewRender("postedit", data));
          } else {
            messageService.addMessage(
              "No posee la autorización para editar una publicación de otro usuario",
              "error"
            );
            return res.status(401).redirect("/posts/page/1");
          }
        } else {
          messageService.addMessage(
            "No posee la autorización para editar publicaciones",
            "error"
          );
          return res.status(401).redirect("/posts/page/1");
        }
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/posts/page/1");
    }
  }

  //CONTROLLER PARA ACTUALIZAR LOS DATOS DE UNA PUBLICACIÓN
  async updatePost(req, res) {
    if (!req.session.userId) {
      res.locals.isAuthenticated = false;
      return res.redirect("/");
    }
    const { guid } = req.params;
    const postBody = req.body;
    try {
      const authData = userService.getAuthData(req);
      if (authData.userRole == 1 || authData.userRole == 2) {
        const message = await postService.updatePost(guid, postBody);
        messageService.addMessage(message, "success");
        return res.status(200).redirect(`/post/${guid}`);
      } else {
        if (authData.userActive) {
          if (user.id == authData.userId) {
            const message = await postService.updatePost(guid, postBody);
            messageService.addMessage(message, "success");
            return res.status(200).redirect(`/post/${guid}`);
          } else {
            messageService.addMessage(
              "No posee la autorización para editar una publicación de otro usuario",
              "error"
            );
            return res.status(401).redirect("/posts/page/1");
          }
        } else {
          messageService.addMessage(
            "No posee la autorización para editar publicaciones",
            "error"
          );
          return res.status(401).redirect("/posts/page/1");
        }
      }
    } catch (error) {
      messageService.addMessage("Error al actualizar los datos de la publicación", "error");
      return res.status(400).redirect("/posts/page/1");
    }
  }

  //CONTROLLER ELIMINAR UNA PUBLICACIÓN
  async deletePost(req, res) {
    if (!req.session.userId) {
      userService.closeSession(req, res);
      return res.redirect("/");
    }
    const { guid } = req.params;
    try {
      const authData = userService.getAuthData(req);
      if (authData.userRole == 1 ||authData.userRole == 2) {
        const message = await postService.deletePost(guid);
        messageService.addMessage(message, "success");
        return res.status(200).redirect("/posts/page/1");
      } else {
        if (authData.userActive) {
          if (user.id == authData.userId) {
            const message = await postService.deletePost(guid);
            messageService.addMessage(message, "success");
            return res.status(200).redirect("/posts/page/1");
          } else {
            messageService.addMessage(
              "No posee la autorización para eliminar una publicación de otro usuario",
              "error"
            );
            return res.status(401).redirect("/posts/page/1");
          }
        } else {
          messageService.addMessage(
            "No posee la autorización para eliminar publicaciones",
            "error"
          );
          return res.status(401).redirect("/posts/page/1");
        }
      }
    } catch (error) {
      messageService.addMessage(error, "error");
      return res.status(400).redirect("/posts/page/1");
      //return res.status(400).send({ message: error.message });
    }
  }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR DE PUBLICACIONES
module.exports = new controllerPosts();
