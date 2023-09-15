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

    async syncTable(tableName) {
      const tableExists = await this.sequelize.getQueryInterface().describeTable(tableName);
      if (tableExists) {
          try {
              await this.sync();
              console.log('Base de datos sincronizada');
          } catch(error) {
              console.error('Error al sincronizar la base de datos:', error);
          }
      } else {
            console.log(`La tabla ${tableName} ya existe en la base de datos. No se realizó la sincronización`);
      }
    }

    async sync() {
        try {
            await this.sequelize.sync({ alter: true, });
        } catch(error) {
            console.error('Error al sincronizar la base de datos:', error);
        }
    }
}
//EXPORTACIÓN DE UNA INSTANCIA DE LA CLASE DB
module.exports = new DB();