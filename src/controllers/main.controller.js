/* controllers/main.controller.js */

//CLASE CONTROLADOR DE MAIN INDEX
class controllerMain {

    index(req, res) {
        if(!req.session.userId) {
            res.locals.isAuthenticated = false;
        } else {
            return res.redirect('profile');
        }
        try {
            const title = "FORO ESTUDIANTIL";
            const header = "BIENVENID@, ESTE ES UN ESPACIO PENSADO PARA VOS...";
            const templateName = "index";
            const message = "";
            res.status(200).render('index', { title, header, templateName, message });
        } catch(error) {
            return res.status(400).render('index',{ message: "Hay un error con la AppWeb, sepa disculpar las molestias" });
        }
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE CONTROLADOR DE POSTS
module.exports = new controllerMain();