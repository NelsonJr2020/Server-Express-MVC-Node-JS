/* models/role.model.js */

//REQUIRES
const { DataTypes } = require('sequelize');
const db = require('../database/database');

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

//FUNCIÓN DE CREACIÓN DE DATOS DE ROLES SI NO EXISTEN EN LA TABLA
const createInitialRoles = async () => {
    try {
        const existingRoles = await Role.findAll();
        if (existingRoles.length === 0) {
            await Role.bulkCreate([
                { id: 1, name: 'Administrador' },
                { id: 2, name: 'Moderador' },
                { id: 3, name: 'Usuario' },
            ]);
            console.log('Roles iniciales creados con éxito.');
        } else {
            console.log('Los roles ya existen en la base de datos.');
        }
    } catch (error) {
        console.error('Error al crear roles iniciales:', error);
    }
};

//CHEQUEO LOS DATOS DE LA TABLA Y SI ESTA VACÍA LA COMPLETO CON LOS DATOS
createInitialRoles();

//CHEQUEO DE EXISTENCIA DE LA TABLA POSTS Y POSIBLE CREACIÓN/SINCRONIZACIÓN
db.syncTable('Roles');

//EXPORTACIÓN DEL MODELO ROLES
module.exports = Role;