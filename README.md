 
# PROTOTIPO DE UN FORO | SERVIDOR MVC SOBRE NODE.JS CON EXPRESS, SEQUELIZE, HELMET, DOTENV, EXPRESS-SESSION Y EJS
![JavaScript](https://img.shields.io/badge/JavaScript-code-ivory?logo=JavaScript&logoColor=gold)
![CSS](https://img.shields.io/badge/css-code-ivory?logo=CSS3&logoColor=blue)
![EJS](https://img.shields.io/badge/ejs-code-ivory?logo=HTML5&logoColor=orangered)
[![License: LGPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Tabla de Contenidos
--------
* [Introducción](README.md#introducción)
* [Descripción](README.md#descripción)
* [Requisitos](README.md#requisitos)
    * [Ide](README.md#ide)
    * [Entorno](README.md#entorno) 
* [Instalación, Configuración y puesta en Marcha](README.md#instalación-configuración-y.puesta-en-marcha)
    * [Instalación](README.md#instalación)
    * [Configuración](README.md#configuración)
        * [Base de datos](README.md#base-de-datos)
            * [Configuración automatizada](README.md#configuración-automatizada)
            * [Configuración manual](README.md#configuración-manual)
    * [Puesta en marcha](README.md#puesta-en-marcha)
* [Estructura del proyecto](README.md#estructura-del-proyecto)
* [Licencia, uso y atribuciones](README.md#licencia-uso-y-atribuciones)

## INTRODUCCIÓN
Este proyecto fue pensado como un prototipo de una webapp diseñada como un foro para estudiantes, con la posibilidad de interactuar a través de publicaciones, el prototipo puede ser mejorado, agregandole nuevas funcionalidades como la de comentar, la de enviar mensajes. El proyecto es escalable y de fácil mantenimiento.

## DESCRIPCIÓN

El foro cuenta con una plataforma de usuarios con roles de Administrador, Moderador y Usuario; tiene una sección de publicaciones para el foro, en ella se pueden ver,
editar y eliminar los posteos en función del nivel de autorización. Lo mismo un administrador puede ver, editar y eliminar a un usuario, un moderador puede ver
y editar a un usuario pero no eliminarlo, un usuario solo puede modificar su perfil.
El proyecto está desarrollado con el patrón de arquitectura de software MVC (Model - View - Controller) y a su vez está desarrollado 
con el estilo de programación OOP (Object-Oriented Programming) donde se desarrollan clases y objetos para su posterior uso.
Para reducir un poco el código se optó por la exportación de las instancias de las clases en su mayoría.
Este proyecto se basa en la potencia de Express Sequelize y Ejs y su fuerte son los servicios desarrollados para servir a los controladores. 
\
\
![MisProyectos](https://badgen.net/badge/NelsonJr2020/GitHubProjects/) 
![ArgentinaPrograma](https://badgen.net/badge/ArgentinaPrograma/4.0/) 
![Compatible](https://img.shields.io/badge/windows_7-compatible-orange?logo=windows.svg)
![Mantenido](https://img.shields.io/badge/Maintenido%3F-si-green.svg) 

## REQUISITOS
Es fundamental contar con un sistema operativo compatible con node.js
### IDE
- **IDE** para el desarrollo del proyecto. Se recomienda utilizar el IDE Visual Studio Code en su versión mínima 1.70.3
\
\
[![VSCode](https://img.shields.io/badge/Visual%20Studio%20Code_─_1.70.3-0078D7.svg?logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com)
### ENTORNO
- **Entorno de ejecución** para correr el proyecto. Se requiere instalar node-js en la versión mínima indicada, así como las dependencias indicadas en [package.json](package.json) 
\
\
[![NodeJs](https://img.shields.io/badge/Node.js_─_12.18.4-43853D?logo=node.js&logoColor=white)](https://nodejs.org/es)

   ✔ [![express](https://img.shields.io/badge/express-js_─_4.18.2-E5E5E9?logo=express&logoColor=eee)](https://expressjs.com/es/starter/installing.html) \
   ✔ [![express-session](https://img.shields.io/badge/express-session_─_1.17.3-E5E5E9?logo=express&logoColor=eee)](https://expressjs.com/es/starter/installing.html) \
   ✔ [![sequelize](https://img.shields.io/badge/sequelize-orm_─_6.32.1-E5E5E9?logo=sequelize&logoColor=white)](https://sequelize.org) \
   ✔ [![mysql2](https://img.shields.io/badge/npm-mysql2_─_2.3.3-E5E5E9?logo=npm&logoColor=white)](https://www.npmjs.com/package/mysql2) \
   ✔ [![jsonwebtoken](https://img.shields.io/badge/npm-jasonwebtoken_─_9.0.2-E5E5E9?logo=npm&logoColor=white)](https://github.com/auth0/node-jsonwebtoken) \
   ✔ [![helmet](https://img.shields.io/badge/npm-helmet_─_7.0.0-E5E5E9?logo=npm&logoColor=white)](https://helmetjs.github.io) \
   ✔ [![ejs](https://img.shields.io/badge/npm-ejs_─_3.1.9-E5E5E9?logo=npm&logoColor=white)](https://ejs.co) \
   ✔ [![body-parser](https://img.shields.io/badge/npm-body_parser_─_1.20.2-E5E5E9?logo=npm&logoColor=white)](https://www.npmjs.com/package/body-parser) \
   ✔ [![cookie-parser](https://img.shields.io/badge/npm-cookie_parser_─_1.4.6-E5E5E9?logo=npm&logoColor=white)](https://www.npmjs.com/package/cookie-parser) \
   ✔ [![dotenv](https://img.shields.io/badge/npm-dotenv_─_16.3.1-E5E5E9?logo=npm&logoColor=white)](https://www.npmjs.com/package/dotenv) \
   ✔ [![bcryptjs](https://img.shields.io/badge/npm-bcryptjs_─_2.4.3-E5E5E9?logo=npm&logoColor=white)](https://www.npmjs.com/package/bcryptjs) \
   ✔ [![uuid](https://img.shields.io/badge/npm-uuid_─_9.0.1-E5E5E9?logo=npm&logoColor=white)](https://www.npmjs.com/package/uuid)

Para el entorno de desarrollo se utiliza el [nodemon](https://www.npmjs.com/package/nodemon) y [morgan](https://github.com/expressjs/morgan)
    
Una vez instaladas las dependencias debe ingresar a la consola de comandos y desde allí dirigirse al directorio donde se encuentra descomprimido el proyecto.

***
## INSTALACIÓN, CONFIGURACIÓN Y PUESTA EN MARCHA
### INSTALACIÓN
Para la instalación debe tener presente las versiones del IDE, del entrono, y su compatibilidad con el sistema operativo.
### CONFIGURACIÓN
La configuración principal se encuentra en el archivo .env, allí deberá escoger un puerto (3000 por defecto) para el server, los datos de usuario de la base de datos, en este caso se utilizó MySQL como dialecto de base de datos. Para el entorno de producción las claves SECRET, API_KEY y JWT_SECRET son fundamentales para la seguridad, por lo tanto, es muy recomendable generarlas en un entorno local aislado, no almacenarlas en lugares públicos y mantener copias privadas y encriptadas de las mismas.  
- Configuración por defecto del archivo .env
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
##### BASE DE DATOS
- Asegúrate de tener un motor de MySQL instalado en tu sistema (se recomienda las herramientas gratuitas de XAMPP, MYSQL Worbench, etc).
- Crea una base de datos en MySQL con el nombre que especificaste en tu archivo .env (por defecto, "server-express").

###### *Configuración automatizada*
Esta configuración está pensada tanto para iniciar la webapp y testearla rápidamente, como para crear configuraciones iniciales personalizadas y/o cargar rápidamente desde archivos json un listado de usuarios predeterminados en función de sus necesidades.
- Configuración inicial para test de la app con datos generados aleatoriamente, para ello debe verificar que el archivo json en *src/configs/config.json* la línea hasDbCreated esté en **false**.
```json
{
  "hasDbCreated": false,
  "otherConfig": "valorPredeterminado"
}
```
- Listado de usuarios fakes para el test en *src/configs/datatest/datatest.json*
- Asegurese que posea un usuario con privilegios (de preferencia root) de administrador para la DB y utilice sus credenciales en el archivo **.env**.
- Es sumamente recomendable que en un entorno de desarrollo utilice un usuario mysql root sin contraseña, de la manera que fue diseñado el proyecto.
###### *Configuración manual*
- En el caso de arrancar con el sistema en blanco y no querer utilizar la automatización, debe generar primeramente la estructura de la db con el código SQL proporcionado y luego debe crear al menos un usuario desde consola mysql o cualquier editor de mysql preferido.
```SQL
CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `guid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(60) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `img` varchar(150) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `userId` int(4) DEFAULT NULL,
  `datePost` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `profileId` int(11) DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `userName` varchar(16) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `email` varchar(80) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `password` varchar(200) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `gender` varchar(16) COLLATE utf8mb4_spanish2_ci DEFAULT 'Desconocido',
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profileId` (`profileId`);
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`);
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`profileId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `profiles_ibfk_2` FOREIGN KEY (`profileId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `profiles_ibfk_3` FOREIGN KEY (`profileId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `profiles_ibfk_4` FOREIGN KEY (`profileId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;
```
- Para crear el usuario si o si debe generar
   - Email: test@example.com
   - Contraseña encriptada (generada por bcryptjs)
   - Nombre (firstName) y Apellido (lastName)
   - Rol (numérico) (1 → administrador | 2 → moderador | 3 → usuario) 
   - Estado isActive = 1
- Para generar una contraseña encriptada y provisoria manualmente puede correr este código que utiliza bcryptjs (ya instalado en los pasos anteriores) de esa manera podrá acceder al sistema.
  ```javascript
  const bcrypt = require('bcrypt');

  const plaintextPassword = '12345678'; // Tu contraseña en texto plano

  // Genera una sal aleatoria y encripta la contraseña
  bcrypt.hash(plaintextPassword, 10, (err, hash) => {
    if (err) {
      console.error('Error al encriptar la contraseña:', err);
    } else {
      console.log('Contraseña encriptada:', hash);
      // El valor `hash` es la contraseña encriptada que puedes almacenar en tu base de datos.
    }
  });
  ```
- Una vez con todos los datos listos puede utilizar el siguiente código SQL sin olvidar reemplazar el campo password por la contraseña encriptada obtenida en el paso anterior.
```SQL
INSERT INTO `users` (`id`, `firstName`, `lastName`, `userName`, `email`, `password`, `phone`, `role`, `birthDate`, `gender`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Nombre', 'Apellido', 'apododeusuario', 'admin@example.com', 'contraseñaencriptada', 997, 1, '1977-05-03 00:00:00', 'Desconocido', 1, '2023-09-27 01:44:16', '2023-09-27 01:44:16');
```
- Por último no debe olvidarse que para hacer el login al sistema deberá utilizar la contraseña en "texto plano", ya que la encriptada solo funciona del lado servidor.
***
### PUESTA EN MARCHA
Una vez realizados los pasos previos,\
  1 - Debe navegar en la consola bash y ubicarse en la raiz del proyecto\
  2 - Una vez ubicado en el directorio del proyecto, debe ejecutar el siguiente comando:
```bash
$ npm run dev
```
*... con esto daría inicio a la app por primera vez ...*

**☺**
Si todo salió bien y no tiene errores en pantalla y ha utilizado la opción automatizada para el test podrá utilizar los siguientes usuarios.
Para poder utilizar la app debe ingresar a cualquier navegador y escribir:
```
http://localhost:3000
```
Entonces debería ver esto en pantalla 
             **↓↓↓**
![image](https://github.com/NelsonJr2020/Server-Express-MVC-Node-JS/assets/62829278/a3364418-7ee3-462f-b982-0f2458145385)

Una vez en la página principal, para el test puede utilizar los siguientes usuarios con privilegios de administrador, moderador y usuario común

![image](https://github.com/NelsonJr2020/Server-Express-MVC-Node-JS/assets/62829278/90b345e9-bc4a-45e3-a72f-787597ebd2f0)


    ► email = "administrador@example.com"
    ► password = "12345678"

    ► email = "moderador@example.com"
    ► password = "12345678"
    
    ► email = "melissa.fleming@example.com"
    ► password = "12345678"
***
## ESTRUCTURA DEL PROYECTO
Directorios y archivos importantes:

![image](https://github.com/NelsonJr2020/Server-Express-MVC-Node-JS/assets/62829278/297d0314-685d-4976-8973-c50f6b5cd614)

- public/: Archivos estáticos como CSS, imágenes y JavaScript.
- src/: Contiene el código fuente de la aplicación.
  - configs/: Archivos de configuración inicial y de vistas.
  - controllers/: Controladores de Express.
  - database/: Configuracion de la base de datos
  - middlewares/: Middleware para proteger las rutas con autenticación de sesión y de jwt
  - models/: Modelos de Sequelize.
  - routes/: Rutas de Express.
  - services/: Servicios como user.service, post.service y view.service
  - utils/: Factory para crear las vistas y sus configuraciones
  - views/: Plantillas EJS.
  
## LICENCIA, USO Y ATRIBUCIONES
Este proyecto se encuentra bajo la [Licencia GPL v3](LICENSE).
Por favor, asegúrate de revisar los términos de la licencia antes de utilizar este software en tu proyecto. 
Puedes encontrar el texto completo de la licencia en el archivo [LICENSE](LICENSE).
Leer acerca de [GPL v3](https://es.wikipedia.org/wiki/GNU_General_Public_License)
