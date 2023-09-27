/* main -> app.js */

//REQUIRES GLOBALES
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./src/database/db');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mainRoutes = require('./src/routes/main.routes')
const userRoutes = require('./src/routes/user.routes');
const postRoutes = require('./src/routes/post.routes');
const InitConfig = require('./src/configs/init.config');

//INICIALIZACIÓN SERVER
const app = express();
const PORT = process.env.PORT || 4000;
const SECRET = process.env.SECRET;

//INICIALIZACIÓN DB
db.initConnection();

//AUTOMATIZACIÓN DE CONFIGURACIÓN INICIAL DE BASE DE DATOS Y CARGA DE DATOS DE PRUEBA
const configPath = './src/configs/config.json';
const dataTestPath = './src/configs/datatest/datatest.json';
const initConfig = new InitConfig(configPath, dataTestPath);
initConfig.updateHasDbCreate();

//CONFIGURACIÓN DE MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(helmet());
app.use(
    session({
        secret: SECRET, //Clave secreta de cifrado de cookies desde .env
        resave: false, //Impedir sobreescritura de sesiones
        saveUninitialized: false, //Impedir sesiones vacías
        cookie: { maxAge: 3600000, }, //3.600.000 milisegundos equivalen a una hora
    }),
);
app.use(cookieParser());
app.use((req, res, next) => {
    
    const images = "https://img.freepik.com/ https://pngimg.com/ https://static.vecteezy.com/ https://global-uploads.webflow.com/ https://images.unsplash.com/";
    const fontsApi = "https://fonts.googleapis.com";
    const fontsStatic = "https://fonts.gstatic.com";
    const authorize = `default-src 'self' ${fontsApi};font-src 'self' ${fontsStatic};img-src 'self' ${images} data:;`;
    res.setHeader(
        'Content-Security-Policy', 
        authorize
    );
    next();
});

//CONFIGURACIÓN DE RUTAS Y ENRUTAMIENTO
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mainRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(express.static(path.join(__dirname,'public'))); //CARPETA PÚBLICA CON RUTAS ESTÁTICAS

//CONFIGURACIÓN DE VISTAS Y MOTOR DE PLANTILLAS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

//INICIAR SERVER
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});