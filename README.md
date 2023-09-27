 
# PROTOTIPO DE UN FORO | SERVIDOR MVC SOBRE NODE.JS CON EXPRESS, SEQUELIZE, HELMET, DOTENV, EXPRESS-SESSION Y EJS

Este servidor es un prototipo de una webapp para un foro multiusuario aprovechando el basto desarrollo de bibliotecas para node js.
Cuenta con una plataforma de usuarios con roles de Administrador, Moderador y Usuario; tiene una sección de publicaciones para el foro, en ella se pueden ver,
editar y eliminar los posteos en función del nivel de autorización. Lo mismo un administrador puede ver, editar y eliminar a un usuario, un moderador puede ver
y editar a un usuario pero no eliminarlo, un usuario solo puede modificar su perfil.
El proyecto está desarrollado con el patrón de arquitectura de software MVC (Model - View - Controller) y a su vez está desarrollado 
con el estilo de programación OOP (Object-Oriented Programming) donde se desarrollan clases y objetos para su posterior uso.
Para reducir un poco el código se optó por la exportación de las instancias de las clases en su mayoría.
Este proyecto se basa en la potencia de Express Sequelize y Ejs y su fuerte son los servicios desarrollados para servir a los controladores.


## Instalación

Para el proyecto se necesita tener node-js instalado, así como las siguientes dependencias cada una con la versión del archivo «package.json»: 
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
y con esto da inicio a la app por primera vez. 

Si todo salió bien y no tiene errores y ahora con la base de datos ya creada y con los usuarios cargados desde el arhivo de configuración json, podrá utilizar los siguientes usuarios para el test.
Para poder utilizar la app debe ingresar a cualquier navegador y escribir:
```
http://localhost:3000
```
![image](https://github.com/NelsonJr2020/Server-Express-MVC-Node-JS/assets/62829278/a3364418-7ee3-462f-b982-0f2458145385)

Una vez en la página principal, para el test puede utilizar los siguientes usuarios con privilegios de administrador, moderador y usuario común

![image](https://github.com/NelsonJr2020/Server-Express-MVC-Node-JS/assets/62829278/90b345e9-bc4a-45e3-a72f-787597ebd2f0)


    ► email = "administrador@example.com"
    ► password = "12345678"

    ► email = "moderador@example.com"
    ► password = "12345678"
    
    ► email = "melissa.fleming@example.com"
    ► password = "12345678"
