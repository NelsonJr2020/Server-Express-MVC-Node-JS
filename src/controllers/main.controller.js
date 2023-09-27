/* controllers/main.controller.js */

//REQUIRES
const viewService = require('../services/view.service');
const messageService = require('../services/message.service');

//CLASE CONTROLADOR DE MAIN INDEX
class controllerMain {
  
    index(req, res) {
        if(!req.session.userId) {
            res.locals.isAuthenticated = false;
        } else {
            return res.redirect('profile');
        }
        try {
            const data = { isAuthenticated: false, messages: messageService.getMessages() };
            res.status(200).send(viewService.viewRender('index', data));
        } catch(error) {
            messageService.addMessage(`Hubo un error con la AppWeb, sepa disculpar las molestias! ${error}`, `error`);
            return res.status(400).redirect('/');
        }
    }

    info(req, res) {
        let isAuthenticated;
        isAuthenticated = isAuthenticated || false;
        try {
            messageService.addMessage("Te esperamos, registrate con el botón naranja!", "warning");
            const data = { isAuthenticated: isAuthenticated, messages: messageService.getMessages() };
            res.status(200).send(viewService.viewRender('info', data));
        } catch(error) {
            messageService.addMessage("Este es un mensaje de error!", "error");
            const data = { isAuthenticated: isAuthenticated, messages: messageService.getMessages() };
            res.status(200).send(viewService.viewRender('info', data));
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR PRINCIPAL
module.exports = new controllerMain();