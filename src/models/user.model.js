/* models/user.model.js */

//REQUIRES
const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Role = require('./role.model');

//MODELADO DE USUARIO CON SEQUELIZE
const User = db.sequelize.define(
    "User",
    {
        firstName: {
            type: DataTypes.STRING(50),
        },
        lastName: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(80),
        },
        password: {
            type: DataTypes.STRING(200),
        },
        role: {
            type: DataTypes.INTEGER,
        },
        birthDate: {
            type: DataTypes.DATE(),
        },
        gender: {
            type: DataTypes.STRING(16),
            allowNull: true,
            defaultValue: 'Desconocido',
        },
        isActive: {
            type: DataTypes.TINYINT,
        },
    },
);

User.belongsTo(Role, {
    foreignKey: 'role',
    targetKey: 'id',
    as: 'userRole',
});

//CHEQUEO DE EXISTENCIA DE LA TABLA USUARIOS Y POSIBLE CREACIÓN/SINCRONIZACIÓN
db.syncTable('Users');

//EXPORTACIÓN DEL MODELO USER
module.exports = User;