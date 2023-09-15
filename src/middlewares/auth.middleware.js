/* middlewares/auth.middleware.js */

//REQUIRES
const jwt = require('jsonwebtoken');

//CLASE AUTHMIDDLEWARE DE SEGURIDAD Y ACCESO
class AuthMiddleware {

    #secretKey = process.env.JWT_SECRET || 'eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW5TdXBlclVzZXJOb25lU21hc2hUaGUuLi4';
    #apiKey = process.env.API_KEY || 'e7c5ee2c-0a90-459b-88f1-1bb215b020b4';
     
    //COMPROBACIÓN DE VALIDEZ DE SESIÓN DE USUARIO
    authenticateSession(req, res, next) {
      if(req.session.userId) {
        res.locals.isAuthenticated = true;
        next();
      } else {
        res.locals.isAuthenticated = false;
        req.session.message = "Se requiere iniciar sesión para ver su perfil";
        res.redirect('/');
      }
    }

    //COMPROBACIÓN DE VALIDEZ DE JSON WEB TOKEN DE USUARIO
    authenticateJWT = (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            try {
              const decoded = this._verifyToken(token);
              if(decoded) {
                req.user = decoded;
                next();
              } else {
                res.status(401).json({ message: "Acceso no autorizado" }).redirect('/');
              }
            } catch (error) {
              res.status(401).json({ message: "Token inválido o expirado" }).redirect('/');
            }
        } else {
          res.status(401).json({ message: "Acceso no autorizado" }).redirect('/');
        }
    }

    //COMPROBACIÓN DE VALIDEZ DE APIKEY DE USUARIO
    authenticateAPIKey = (req, res, next) => {
        const apiKey = req.headers["x-api-key"];
    
        if (apiKey === this.#apiKey) {
          next();
        } else {
          res.status(401).json({ message: "Acceso no autorizado" });
        }
    }

    //GENERACIÓN DE TOKEN JWT
    generateToken = (payload, time) => { // El token expira en el parámetro time
      return jwt.sign(payload, this.#secretKey, { expiresIn: time }); // Ejemplo '1h' (una hora)
    }

    //VERIFICACIÓN DE TOKEN JWT
    _verifyToken = (token) => {
      try {
        return jwt.verify(token, this.#secretKey);
      } catch (error) {
        throw new Error('Token inválido o expirado');
      }
    }

}
  
module.exports = new AuthMiddleware();