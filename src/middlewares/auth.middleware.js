/* middlewares/auth.middleware.js */

//REQUIRES
const jwt = require("jsonwebtoken");
const messageService = require("../services/message.service");

//CLASE AUTHMIDDLEWARE DE SEGURIDAD Y ACCESO UTILIZANDO JWT
class AuthMiddleware {
  #secretKey = process.env.JWT_SECRET;
  #apiKey = process.env.API_KEY;

  //COMPROBACIÓN DE VALIDEZ DE SESIÓN DE USUARIO
  authenticateSession(req, res, next) {
    if (req.session.userId) {
      res.locals.isAuthenticated = true;
      next();
    } else {
      res.locals.isAuthenticated = false;
      req.session.message = "Inicie sesión para acceder al sitio";
      res.redirect("/");
    }
  }

  //COMPROBACIÓN DE VALIDEZ DE JSON WEB TOKEN DE USUARIO
  authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    const error = [];
    if (token) {
      try {
        const decoded = this._verifyToken(token);
        if (decoded) {
          req.user = decoded;
          return next();
        } else {
          messageService.addMessage("Acceso no autorizado", "error");
          res.status(401).redirect("/");
        }
      } catch (error) {
        messageService.addMessage("Su token es inválido", "error");
        res.status(401).redirect("/");
      }
    } else {
      res.locals.isAuthenticated = false;
      res.status(401).redirect("/");
    }
  };

  /* COMPROBACIÓN DE VALIDEZ DE APIKEY DE USUARIO 
     ESTA SECCIÓN ESTÁ PENSADA PARA EXTENDER ALGUNA
     FUNCIONALIDAD EXTRA CON OTRA APP...
  authenticateAPIKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (apiKey === this.#apiKey) {
      return next();
    } else {
      messageService.addMessage("Acceso no autorizado", "error");
      error.status = 401;
      return next(error);
    }
  };
*/

  //GENERACIÓN DE TOKEN JWT
  generateToken = (payload, time) => {
    // El token expira en el parámetro time
    try {
      return jwt.sign(payload, this.#secretKey, { expiresIn: time }); // Ejemplo '1h' (una hora)
    } catch (error) {
      throw new Error("Error al generar el token");
    }
  };

  //VERIFICACIÓN DE TOKEN JWT
  _verifyToken = (token) => {
    try {
      return jwt.verify(token, this.#secretKey);
    } catch (error) {
      throw new Error("Su token no es válido");
    }
  };
}

//EXPORTA LA INSTANCIA DE LA CLASE MIDDLEWARE DE AUTENTICACIONES
module.exports = new AuthMiddleware();
