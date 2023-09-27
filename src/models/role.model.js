/* models/role.model.js */

//REQUIRES
const { DataTypes } = require('sequelize');
const db = require('../database/db');

//MODELADO DE ROLES CON SEQUELIZE
const Role = db.sequelize.define(
    "Roles",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
    }
);

//CHEQUEO DE EXISTENCIA DE LA TABLA POSTS Y POSIBLE CREACIÓN/SINCRONIZACIÓN
Role.sync({ alter: true, });

//EXPORTACIÓN DEL MODELO ROLES
module.exports = Role;