/* controllers/user.controller.js */

//REQUIRES
const dataService = require('../services/data.service');

//CLASE CONTROLADOR DE INVITADOS
class controllerGuests {

    //CONTROLLER VER INFORMACIÓN ADICIONAL
    async viewInfo(req, res) {
        const title = "INFO";
        let header = "INFORMACIÓN ADICIONAL";
        let message = "";
        const templateName = "info";
        
        try {
            users = await userService.getAllUsers();
            res.status(200).render('users', { users, header, title, templateName, message });
        } catch(error) {
            return res.status(400).render('users', { users, header, title, templateName, message });
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR DE INVITADOS
module.exports = new controllerGuests();