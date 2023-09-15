/* models/post.model.js */

//REQUIRES
const { DataTypes } = require('sequelize');
const db = require('../database/database');

//MODELADO DE POST CON SEQUELIZE
const Post = db.sequelize.define(
    "Post",
    {
        guid: {
            type: DataTypes.UUID,
            defaultValue: db.sequelize.UUIDV4,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(60),
        },
        content: {
            type: DataTypes.TEXT,
        },
        img: {
            type: DataTypes.STRING(150),
        },
        userId: {
            type: DataTypes.INTEGER(4),
        },
        datePost: {
            type: DataTypes.DATE(),
        },
    }
);

//CHEQUEO DE EXISTENCIA DE LA TABLA POSTS Y POSIBLE CREACIÓN/SINCRONIZACIÓN
db.syncTable('Posts');

//EXPORTACIÓN DEL MODELO POST
module.exports = Post;