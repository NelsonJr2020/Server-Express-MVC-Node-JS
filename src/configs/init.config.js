// Requiere la conexión a base de datos
const db = require("../database/db");

// Requiere el modelo de usuario
const User = require("../models/user.model");

// Requiere el modelo de roles
const Role = require("../models/role.model");

// Requiere el modelo de perfil
const Profile = require("../models/profile.model");

// Requiere el modelo de post
const Post = require("../models/post.model");

// Requiere la herramienta de lectura y escritura de archivos
const fs = require("fs");

class InitConfig {
  constructor(configPath, dataTestPath) {
    this.configPath = configPath;
    this.dataTestPath = dataTestPath;
  }

  async updateHasDbCreate() {
    try {
      const data = await this.readFileAsync(this.configPath, "utf8");
      const config = JSON.parse(data);

      if (config.hasDbCreated === false) {
        await this.createTestDatabase();
        config.hasDbCreated = true;

        const updatedConfig = JSON.stringify(config, null, 2);
        await this.writeFileAsync(this.configPath, updatedConfig, "utf8");

        console.log(
          "Arhivo de configuración inicial JSON actualizado con éxito"
        );
      }
    } catch (error) {
      console.log(
        "Error al actualizar el archivo JSON de configuración inicial. ",
        error
      );
    }
  }

  readFileAsync(path, encoding) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, encoding, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  writeFileAsync(path, data, encoding) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, encoding, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  async createTestDatabase() {
    try {
      const testData = await this.readFileAsync(this.dataTestPath, "utf8");
      const data = JSON.parse(testData);

      // hace un drop general y sincroniza los modelos con la base de datos y creando las tablas y estructuras en la db
      await db.sequelize.sync({ force: true });

      // Crea registros de prueba utilizando los datos del archivo JSON
      try {
        const roleCreated = await Role.bulkCreate(data.roles);
        console.log(
          `Se crearon ${roleCreated.length} registros en la tabla Roles.`
        );
      } catch (error) {
        console.error("Error al crear registros en la tabla Roles:", error);
      }

      try {
        const userCreated = await User.bulkCreate(data.users);
        console.log(
          `Se crearon ${userCreated.length} registros en la tabla User.`
        );
      } catch (error) {
        console.error("Error al crear registros en la tabla User:", error);
      }

      try {
        const profileCreated = await Profile.bulkCreate(data.profile);
        console.log(
          `Se crearon ${profileCreated.length} registros en la tabla Profile.`
        );
      } catch (error) {
        console.error("Error al crear registros en la tabla Profile:", error);
      }

      try {
        const postCreated = await Post.bulkCreate(data.posts);
        console.log(
          `Se crearon ${postCreated.length} registros en la tabla Post.`
        );
      } catch (error) {
        console.error("Error al crear registros en la tabla Post:", error);
      }

      console.log("Base de datos de prueba creada con datos falsos.");
    } catch (error) {
      console.error("Error al crear la base de datos de prueba:", error);
    }
  }
}

module.exports = InitConfig;
