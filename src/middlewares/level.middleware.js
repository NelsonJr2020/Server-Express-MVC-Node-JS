/* middlewares/level.middleware.js */

//CLASE LEVELMIDDLEWARE DE CONTROL DE ROLES Y ACCESOS
class LevelMiddleware {
    
    //VERIFICA EL NIVEL DEL USUARIO
    checkLevel(level) {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.level === level) {
                return next();
            } else {
                return res.status(403).json({ message: 'Acceso no autorizado' });
            }
        };
    }

    //VERIFICA SI EL USUARIO ES ADMINISTRADOR
    isAdmin() {
        return this.checkLevel('admin');
    }
}
  
module.exports = new LevelMiddleware();