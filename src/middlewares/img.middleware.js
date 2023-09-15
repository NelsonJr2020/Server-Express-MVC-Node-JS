/* middlewares/img.middleware.js */

//REQUIRES
const sharp = require('sharp');

//CLASE IMGMIDDLEWARE DE SEGURIDAD Y VALIDACION DE IMAGENES
class ImgMiddleware {

    //COMPROBACIÓN DE VALIDEZ DE IMAGEN DE USUARIO
    async chekImage(req, res, next) {
        const imageUrl = req.body.imageUrl;
        
        if(await this._validateImage(imageUrl)) {
            next();
        } else {
            res.status(400).json({ error: 'El enlace de la imagen no es válido.' });
        }
    }

    async _validateImage(url) {
        try {
            const metadata = await sharp(url).metadata();
            if (metadata.format === 'jpeg' || metadata.format === 'png' || metadata.format === 'gif') {
                return true; // Es una imagen válida
            }
            return false; // No es una imagen válida
        } catch (error) {
            return false; // Hubo un error al verificar la imagen
        }
    }
}

module.exports = new ImgMiddleware();