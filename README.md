 
# PROTOTIPO DE UN FORO | SERVIDOR MVC SOBRE NODE.JS CON EXPRESS, SEQUELIZE, HELMET, DOTENV, EXPRESS-SESSION Y EJS

Este servidor es un prototipo de una webapp para un foro multiusuario aprovechando el basto desarrollo de bibliotecas para node js.
Cuenta con una plataforma de usuarios con roles de Administrador, Moderador y Usuario; tiene una sección de publicaciones para el foro, en ella se pueden ver,
editar y eliminar los posteos en función del nivel de autorización. Lo mismo un administrador puede ver, editar y eliminar a un usuario, un moderador puede ver
y editar a un usuario pero no eliminarlo, un usuario solo puede modificar su perfil.
El proyecto está desarrollado con el patrón de arquitectura de software MVC (Model - View - Controller) y a su vez está desarrollado 
con el estilo de programación OOP (Object-Oriented Programming) donde se desarrollan clases y objetos para su posterior uso.
Para reducir un poco el código se optó por la exportación de las instancias de las clases en su mayoría.
Este proyecto se basa en la potencia de Express Sequelize y Ejs y su fuerte son los servicios desarrollados para servir a los controladores.


## INSTALACIÓN, CONFIGURACIÓN Y PUESTA EN MARCHA

### NODE JS | DEPENDENCIAS
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

### BASE DE DATOS
Configuración de la Base de Datos
✔ [mysql2](https://www.npmjs.com/package/mysql2)
- Asegúrate de tener un motor de MySQL instalado en tu sistema (se recomienda las herramientas gratuitas de XAMPP, MYSQL Worbench, etc).
- Crea una base de datos en MySQL con el nombre que especificaste en tu archivo .env (por defecto, "server-express").
- Configuración recomendada para el archivo .env
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
*[ Configuración automatizada inicial de la db ]*

- Configuración inicial para test de la app con datos generados aleatoriamente, para ello debe verificar que el archivo json en *src/configs/config.json* la línea hasDbCreated esté en **false**.
```json
{
  "hasDbCreated": false,
  "otherConfig": "valorPredeterminado"
}
```
- Asegurese que posea un usuario con privilegios (de preferencia root) de administrador para la DB y utilice sus credenciales en el archivo **.env**.

*[ Configuración manual inicial de la db ]*
- En el caso de arrancar con el sistema en blanco y no querer utilizar la automatización, debe generar primeramente la estructura con el código SQL y luego debe crear al menos un usuario desde consola mysql o cualquier editor de mysql.
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
- Para crear el usuario si o si debe almacenar un email test@example.com, una contraseña encriptada, un nombre y apellido, un rol numérico (1 → administrador, 2 → moderador, 3 → usuario) y el estado isActive = 1.
- Para generar la contraseña puede correr este código que utiliza bcryptjs (ya instalado en los pasos anteriores) para generar una contraseña provisoria de acceso al sistema.
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
- Entonces desde la consola de mysql o desde una aplicación correr el siguiente código sin olvidar que si o si deber reemplazar el campo password por la contraseña encriptada obtenida en el paso anterior
```SQL
INSERT INTO `users` (`id`, `firstName`, `lastName`, `userName`, `email`, `password`, `phone`, `role`, `birthDate`, `gender`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Nombre', 'Apellido', 'apododeusuario', 'admin@example.com', 'contraseñaencriptada', 997, 1, '1977-05-03 00:00:00', 'Desconocido', 1, '2023-09-27 01:44:16', '2023-09-27 01:44:16');
```
- Por último no debe olvidarse que para hacer login deberá utilizar la contraseña en "texto plano", ya que la encriptada solo funciona del lado servidor.
- 
### PUESTA EN MARCHA
Una vez realizados los pasos previos,
 1- Debe navegar desde la consola hasta la raiz de donde tiene el proyecto descomprimido 
 2- Debe ejecutar en la consola el siguiente comando: 
```bash
$ npm run dev
```
... con esto da inicio a la app por primera vez
**☺**
Si todo salió bien y no tiene errores en pantalla y ha utilizado la opción automatizada para el test podrá utilizar los siguientes usuarios.
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
    
### ESTRUCTURA DEL PROYECTO
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
  


### LICENCIA
Este proyecto se encuentra bajo la [Licencia GPL v3](LICENSE).
Por favor, asegúrate de revisar los términos de la licencia antes de utilizar este software en tu proyecto. 
Puedes encontrar el texto completo de la licencia en el archivo [LICENSE](LICENSE).
