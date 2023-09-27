/**
 * Módulo de servicios relacionados con usuarios.
 * @module services/user.service
 */

// Requiere el modelo de usuario
const User = require("../models/user.model");

// Requiere el modelo de rol
const Role = require("../models/role.model");

// Requiere el modelo de perfil
const Profile = require("../models/profile.model");

// Requiere el módulo de autenticación JWT
const jwt = require("../middlewares/auth.middleware");

// Requiere el módulo de bcryptjs para el hash de contraseñas
const bcrypt = require("bcryptjs");

/**
 * Clase que proporciona servicios relacionados con usuarios.
 */
class UserService {
  /**
   * Obtiene todos los usuarios almacenados en la base de datos.
   * @returns {Promise<Array>} Un array de objetos de usuario.
   * @throws {Error} Si no se encuentran usuarios en la base de datos.
   *
   * @example
   * const users = await userService.getAllUsers();
   */
  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error("no se encontraron usuarios en la BD");
    }
  }

  /**
   * Obtiene un conjunto de usuarios de la base de datos paginados.
   * @param {number} pageNumber - El numero de página deseado.
   * @returns {Promise<Array>} Un array de objetos de usuarios limitado por la paginación.
   * @throws {Error} Si no se encuentran usuarios en la base de datos.
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
  async getAllUsersByPageNumber(pageNumber) {
    try {
      const itemsPerPage = 10;
      const offset = (pageNumber - 1) * itemsPerPage;
      const users = await User.findAll({
        offset,
        limit: itemsPerPage,
      });
      return users;
    } catch (error) {
      throw new Error("no se encontraron usuarios en la BD");
    }
  }

  /**
   * Obtiene todos los datos del usuario por ID almacenados en la base de datos.
   * @param {number} id - El ID del usuario a obtener.
   * @returns {Promise<Object>} Un objeto que contiene los datos del usuario.
   * @throws {Error} Si no se encuentra el usuario buscado en la base de datos.
   *
   * @example
   * const user = await userService.getUserById(id);
   */
  async getUserById(id) {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        throw new Error(`Usuario con id: ${id} no encontrado en la BD`);
      }
      return user;
    } catch (error) {
      throw new Error(`Error al buscar al usuario con id: ${id}`);
    }
  }

  /**
   * Obtiene todos los datos del usuario por ID almacenados en la base de datos.
   * @param {string} email - El email del usuario buscado.
   * @returns {Promise<Object>} Un objeto que contiene los datos del usuario.
   * @throws {Error} Si no se encuentra el usuario buscado en la base de datos.
   *
   * @example
   * const user = await userService.getUserById(email);
   */
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new Error(`Usuario con email: ${email} no encontrado en la BD`);
      }
      return user;
    } catch (error) {
      throw new Error(`Error al buscar al usuario con email: ${email}`);
    }
  }

  /**
   * Verifica las credenciales de un usuario y genera un token JWT si son válidas.
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {string} email - El correo electrónico ingresado por el usuario.
   * @param {string} password - La contraseña ingresada por el usuario.
   * @returns {Object} Un objeto que contiene al usuario y al token JWT.
   * @throws {Error} Si el usuario no se encuentra o la contraseña es incorrecta.
   *
   * @example
   * const { user, token } = await userService.verifyUserCredentials(req, "correo@example.com", "contraseñaSegura");
   */
  async verifyUserCredentials(req, email, password) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new Error("usuario no encontrado");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("contraseña incorrecta");
      }
      req.session.userId = user.id;
      req.session.userRole = user.role;
      req.session.userActive = user.isActive;
      const payload = {
        userId: user.id,
        email: user.email,
        userRole: user.role,
        userActive: user.isActive,
      };
      const time = "1h";
      const token = jwt.generateToken(payload, time);

      return { user, token };
    } catch (error) {
      throw new Error("al intentar hacer el login");
    }
  }

  /**
   * Obtiene todos los datos del usuario por ID almacenados en la base de datos,
   * así como los datos de los roles y de las preferencias de usuario.
   * @param {number} id - El ID del usuario a obtener.
   * @returns {Promise<Object>} Un objeto que contiene los datos del usuario, su rol y preferencias.
   * @throws {Error} Si no se encuentran usuarios en la base de datos.
   *
   * @example
   * const profile = await userService.getProfile(id);
   */
  async getProfile(id) {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        throw new Error("usuario no encontrado");
      }
      const role = await Role.findOne({ where: { id: user.role } });
      const profile = {
        user,
        role,
        preferences: await this.getPreferences(id),
        //details: await this.getDetails(id),
      };
      return profile;
    } catch (error) {
      throw new Error("Error al obtener el perfil del usuario");
    }
  }

  /**
   * Obtiene todas las preferencias del usuario por su ID que están almacenadas en la base de datos.
   * @param {number} id - El ID del usuario para obtener sus preferencias.
   * @returns {Promise<Object>} Un objeto que contiene las preferencias del usuario.
   * @throws {Error} Si no se encuentran usuarios en la base de datos.
   *
   * @example
   * const preferences = await this.getPreferences(id);
   */
  async getPreferences(id) {
    try {
      const preferences = await Profile.findOne({ where: { profileId: id } });
      return preferences;
    } catch (error) {
      throw new Error("al obtener las preferencia del perfil del usuario");
    }
  }

  /**
   * Verifica si un correo electrónico ya existe en la base de datos.
   *
   * @param {string} email - El correo electrónico a verificar.
   * @returns {boolean} `true` si el correo electrónico existe en la base de datos, `false` de lo contrario.
   * @throws {Error} Si ocurre un error al verificar el correo electrónico.
   *
   * @example
   * const emailToCheck = "correo@example.com";
   * try {
   *   const emailExists = await checkEmail(emailToCheck);
   *   if (emailExists) {
   *     console.log("El correo electrónico ya existe en la base de datos.");
   *   } else {
   *     console.log("El correo electrónico no existe en la base de datos.");
   *   }
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
  async checkEmail(email) {
    try {
      const existingUser = await User.findOne({ where: { email } });
      return existingUser !== null;
    } catch (error) {
      throw new Error("Error al verificar el correo electrónico");
    }
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   *
   * @param {Object} userBody - Un objeto que contiene la información del nuevo usuario.
   * @param {string} userBody.firstName - El nombre del usuario.
   * @param {string} userBody.lastName - El apellido del usuario.
   * @param {string} userBody.email - El correo electrónico del usuario.
   * @param {string} userBody.password - La contraseña del usuario.
   * @param {Date} userBody.birthDate - La fecha de nacimiento del usuario.
   * @returns {string} Un mensaje que indica si el usuario fue registrado con éxito o no.
   * @throws {Error} Si ocurre un error al intentar crear el usuario.
   *
   * @example
   * const newUser = {
   *   firstName: "John",
   *   lastName: "Doe",
   *   email: "johndoe@example.com",
   *   password: "secretpassword",
   *   birthDate: new Date("1990-01-01"),
   * };
   * try {
   *   const resultMessage = await createUser(newUser);
   *   console.log(resultMessage);
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
  async createUser(userBody) {
    const { firstName, lastName, email, password, birthDate } = userBody;
    if (!firstName || !lastName || !email || !password || !birthDate) {
      throw new Error("complete todos los campos *obligatorios");
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: 3,
        birthDate: birthDate,
        isActive: 1,
      });
      if (newUser) {
        const user = await this.getUserByEmail(email);
        const newProfile = await Profile.create({
          profileId: user.id,
          color: "#ffffff",
          avatar:
            "https://img.freepik.com/free-vector/faceless-human-model-blank-dummy-part-male-female-body-isolated-background_1441-2248.jpg",
        });
        if (newProfile) {
          return `El usuario ${email} fue registrado con éxito`;
        } else {
          throw new Error(
            "Hubo un error al procesar el registro del nuevo usuario y su perfil"
          );
        }
      } else {
        throw new Error("Hubo un error al crear el nuevo usuario");
      }
    } catch (error) {
      throw new Error(`Error al intentar crear el usuario ${email}`);
    }
  }

  /**
   * Actualiza un usuario en la base de datos.
   * @param {number} id - El ID del usuario a actualizar.
   * @param {object} userBody - Los datos actualizados del usuario.
   * @returns {string} Un mensaje de éxito o un error si falla.
   * @throws {Error} Si el usuario no existe en la base de datos.
   */
   async updateUser(id, userBody) {
    try {
      // Buscar el usuario por ID
      const user = await User.findByPk(id);
  
      if (!user) {
        throw new Error("El usuario no existe en la base de datos");
      }
  
      // Verificar si se proporciona una nueva contraseña
      if (userBody.password) {
        if (userBody.password.length < 8) {
          throw new Error("La contraseña es muy corta (debe tener al menos 8 caracteres)");
        }
  
        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(userBody.password, 10);
  
        // Actualizar los campos del usuario, incluida la contraseña
        await user.update({
          firstName: userBody.firstName,
          lastName: userBody.lastName,
          email: userBody.email,
          gender: userBody.gender,
          password: hashedPassword, // Actualizar contraseña si se proporciona
          birthDate: userBody.birthDate,
        });
      } else {
        // Si no se proporciona una nueva contraseña, actualizar los otros campos
        await user.update({
          firstName: userBody.firstName,
          lastName: userBody.lastName,
          email: userBody.email,
          gender: userBody.gender,
          birthDate: userBody.birthDate,
        });
      }
  
      // Verificar si se proporciona información adicional (color y avatar)
      if (userBody.color || userBody.avatar) {
        // Actualizar la información del perfil
        const [profileUpdateCount] = await Profile.update(
          {
            color: userBody.color,
            avatar: userBody.avatar,
          },
          {
            where: { profileId: id },
          }
        );
  
        if (profileUpdateCount > 0) {
          return `El usuario ${userBody.email} se actualizó con éxito`;
        } else {
          throw new Error("Hubo problemas al guardar la información adicional del perfil. Intente nuevamente.");
        }
      }
  
      return `El usuario ${userBody.email} se actualizó con éxito`;
  
    } catch (error) {
      console.error(error);
      throw new Error(`Error al actualizar el usuario ${userBody.email}`);
    }
  }

  /**
   * Verifica si un usuario está activo o no lo está.
   *
   * @param {string} id - El de usuario a verificar.
   * @returns {boolean} `true` si el usuario está activo, `false` si no lo está.
   * @throws {Error} Si ocurre un error al verificar el correo electrónico.
   *
   * @example
   * const userId = 20;
   * try {
   *   const userIsActive = await checkUserIsActive(id);
   *   if (id) {
   *     console.log("El usuario está activo");
   *   } else {
   *     console.log("El usuario no está activo.");
   *   }
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
    async checkUserIsActive(id) {
    try {
      const user = await User.findOne({ where: { id } });
      if(user) {
        return user.isActive;
      } else {
        throw new Error("El usuario no se encuentra en la base de datos");
      }
    } catch (error) {
      throw new Error("Error al verificar el estado del usuario");
    }
  }

  /**
   * Cambia el rol de un usuario de la base de datos.
   * @param {number} userId - El ID del usuario que se desea cambiar de rol.
   * @param {object} userBody.role - Los nuevos datos de rol del usuario.
   * @returns {string} Un mensaje de éxito o un error si falla.
   * @throws {Error} Si el usuario no existe en la base de datos.
   */
  async changeUserRole(id, userBody) {
    try {
      const userNewRole = await User.update(
        { role: userBody.role },
        { where: { id: id } }
      );
      if (userNewRole) {
        return "El Usuario ha cambiado de rol con éxito";
      } else {
        throw new Error(
          "Ocurrió un error al intentar actualizar el rol del usuario"
        );
      }
    } catch (error) {
      throw new Error("Error al intentar actualizar el rol del usuario");
    }
  }

  /**
   * Desactiva un usuario pero este permanece íntegro en la base de datos.
   * @param {number} id - El ID del usuario a desactivar.
   * @returns {string} Un mensaje de éxito o un error si falla.
   * @throws {Error} Si el usuario no existe en la base de datos.
   */
  async desactivateUser(id) {
    try {
      const desactivateUser = await User.update(
        {
          isActive: 0,
        },
        {
          where: { id: id },
        }
      );
      if (!desactivateUser) {
        throw new Error("Usuario no encontrado en la BD");
      }
      return "El usuario fue desactivado con éxito";
    } catch (error) {
      throw new Error("Error al intentar desactivar al usuario");
    }
  }

  /**
   * Activa un usuario que haya sido desactivado.
   * @param {number} id - El ID del usuario a activar.
   * @returns {string} Un mensaje de éxito o un error si falla.
   * @throws {Error} Si el usuario no existe en la base de datos.
   */
   async activateUser(id) {
    try {
      const activateUser = await User.update(
        {
          isActive: 1,
        },
        {
          where: { id: id },
        }
      );
      if (!activateUser) {
        throw new Error("Usuario no encontrado en la BD");
      }
      return "El usuario fue reactivado con éxito";
    } catch (error) {
      throw new Error("Error al intentar desactivar al usuario");
    }
  }

  /**
   * Elimina un usuario de la base de datos.
   * @param {number} id - El ID del usuario a eliminar.
   * @returns {string} Un mensaje de éxito o un error si falla.
   * @throws {Error} Si el usuario no existe en la base de datos.
   */
  async deleteUser(id) {
    try {
      const deletedUser = await User.destroy({ where: { id: id } });
      if (deletedUser) {
        const deleteProfile = await Profile.destroy({ where: { id: id } });
        if (!deleteProfile) {
          throw new Error("Usuario no encontrado en la BD");
        }
        return "Usuario eliminado con éxito";
      } else {
        throw new Error(
          "Ocurrió un error al intentar eliminar y borrar los datos del usuario"
        );
      }
    } catch (error) {
      throw new Error("Error al intentar eliminar el usuario");
    }
  }

  /**
   * Devuelve datos de las credenciales de un usuario si está autenticado y sino devuelve autenticación `false` y los datos nulos.
   * @param {Object} req - El objeto de solicitud de Express.
   * @returns {Object} Un objeto que contiene los datos de las credenciales del usuario y si no esta autenticado el objeto tiene datos nulos.
   *
   * @example
   * const authData = userService.getAuthData(req);
   * const data = {
   *     ...authData,
   *     messages: messageService.getMessages(),
   *     posts: posts,
   * };
   */
  getAuthData(req) {
    if (req && req.session.userId) {
      return {
        isAuthenticated: true,
        userId: req.session.userId,
        userRole: req.session.userRole,
        userActive: req.session.userActive,
      };
    } else {
      return {
        isAuthenticated: false,
        userId: null,
        userRole: null,
        userActive: null,
      };
    }
  }

  /**
   * Cierra la sesión de un usuario y elimina su información de autenticación.
   *
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   * @returns {boolean} `true` si la sesión se cierra con éxito.
   * @throws {Error} Si ocurre un error al intentar cerrar la sesión.
   *
   * @example
   * try {
   *   const result = await closeSession(req, res);
   *   if (result) {
   *     console.log("Sesión cerrada con éxito.");
   *   }
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
  async closeSession(req, res) {
    try {
      if (req.session) {
        delete req.session.isAuthenticated;
        delete req.session.userId;
        delete req.session.userRole;
        delete req.session.userActive;
        res.clearCookie("jwt");
        return true;
      } else {
        // La sesión no está configurada, no es necesario cerrarla
        return false;
      }
    } catch (error) {
      throw new Error("Error al cerrar la sesión: " + error.message);
    }
  }
}

/**
 * Instancia de la clase UserService.
 * @type {UserService}
 */
const userServiceInstance = new UserService();

// EXPORTA LA INSTANCIA DE LA CLASE SERVICIO DE USUARIO
module.exports = userServiceInstance;
