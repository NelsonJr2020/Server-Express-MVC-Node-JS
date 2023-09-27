 
# PROTOTIPO DE UN FORO | SERVIDOR MVC SOBRE NODE.JS CON EXPRESS, SEQUELIZE, HELMET, DOTENV, EXPRESS-SESSION Y EJS

Este servidor es un prototipo de una webapp para un foro multiusuario aprovechando el basto desarrollo de bibliotecas para node js.
En la plataforma existen los roles de Administrador, Moderador y Usuario, y está la sección de publicaciones, dónde 
se puede ver, editar y eliminar las mismas siempre y cuando se posea autorización.
El proyecto está desarrollado con el patrón de arquitectura de software MVC (Model - View - Controller) y a su vez está desarrollado 
con el estilo de programación OOP (Object-Oriented Programming) donde se desarrollan clases y objetos para su posterior uso.
Para reducir un poco el código se optó por la exportación de las instancias de las clases en su mayoría.
El proyecto está firmemente arraigado sobre Sequelize y sobre los servicios desarrollados sobre los modelos de sequelize y que sirven a los controladores.


## Instalación

Para el proyecto se necesita tener node-js instalado, así como las siguientes dependencias cada una con la versión que figura en el archivo «package.json»: 
    ✔ [express](https://expressjs.com/es/starter/installing.html)
    ✔ [sequelize](https://sequelize.org)
    ✔ [helmet](https://helmetjs.github.io)
    ✔ [express-session](https://github.com/expressjs/session)
    ✔ [ejs](https://ejs.co)
    ✔ [body-parser](https://www.npmjs.com/package/body-parser)
    ✔ [cookie-parser](https://www.npmjs.com/package/cookie-parser)
    ✔ [dotenv](https://www.npmjs.com/package/dotenv)
    ✔ [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
    ✔ [bcryptjs](https://www.npmjs.com/package/bcryptjs)
    ✔ [uuid](https://www.npmjs.com/package/uuid)

Para el entorno de desarrollo se utiliza el [nodemon](https://www.npmjs.com/package/nodemon) y [morgan](https://github.com/expressjs/morgan)
    
Una vez instaladas las dependencias debe ingresar a la consola de comandos y desde allí dirigirse al directorio donde se encuentra descomprimido el proyecto. 
Antes que nada debe verificar si tiene una base de datos mysql y debe configurar las variables en un archivo .env en el directorio raiz junto a app.js

```dotenv
PORT = 3000
DB_NAME = server-express
DB_USER = root
DB_PASS =
DB_HOST = 127.0.0.1
DIALECT = mysql
SECRET = 50_caracteres_hexa_para_el_secreto
API_KEY = clave_encriptada_generada_y_secreta
JWT_SECRET = mi_secreto_secreto_super_secreto
```

Luego debe verificar que el archivo json en src/configs/config.json esté de la siguiente manera:
```json
{
  "hasDbCreated": false,
  "otherConfig": "valorPredeterminado"
}
```
Asegurese que posea un usuario con privilegios de administrador para la DB y de que exista un db con el nombre, en mi caso,
server-express.

Una vez realizados estos pasos, va en la ruta correcta; ahora debe ejecutar en la consola:
```bash
$ npm run dev
```
y con esto da inicio a la app por primera vez. Si todo salió bien y no tiene errores. 

Ahora con la base de datos creada y con los usuarios cargados desde el arhivo de configuración, podrá utilizar los siguientes usuarios para el test.

/* USUARIOS CON PRIVILEGIOS PARA EL USO DE LA APP */

    ► email = "administrador@example.com"
    ► password = "12345678"

    ► email = "moderador@example.com"
    ► password = "12345678"
    
