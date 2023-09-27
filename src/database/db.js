/* database/database.js */

//REQUIRES
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

//Ruta al archivo de configuración .env 
dotenv.config({ path: "./.env" });

//CLASE DATABASE
class DB {
    
    //Declaración e Inicialización de propiedades «privadas» con valores obtenidos del archivo .env 
    #dbName = process.env.DB_NAME;
    #dbUser = process.env.DB_USER;
    #dbPass = process.env.DB_PASSWORD;
    #dbHost = process.env.DB_HOST;
    #dialect = process.env.DIALECT;

    constructor() {
      //MODELO SINGLETON DE UNA SOLA INSTANCIA
      if(DB.instance) {
        return DB.instance;
      }

      //Se instancia sequelize por única vez dentro del constructor de la clase DB
      this.sequelize = new Sequelize(this.#dbName, this.#dbUser, this.#dbPass, { 
          host: this.#dbHost,
          dialect: this.#dialect,
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
      });

      DB.instance = this;
      
      this.initConnection();
    }

    async initConnection() {
      try {
        await this.sequelize.authenticate();
        console.log("La conexión con la BD se ha establecido");
      } catch(error) {
          console.log("No se ha establecido la conexión con la BD", error);
      }
    }
}

//EXPORTACIÓN DE LA UNICA INSTANCIA DE CLASE DB EN TODA LA APP
module.exports = new DB();
