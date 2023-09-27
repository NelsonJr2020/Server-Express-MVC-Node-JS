/* models/profile.model.js */

const User = require('./user.model');

//REQUIRES
const { DataTypes } = require('sequelize');
const db = require('../database/db');

//MODELADO DE ROLES CON SEQUELIZE
const Profile = db.sequelize.define(
    "Profiles",
    {
        profileId: {
            type: DataTypes.INTEGER,
        },
        color: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        }
    }
);

Profile.belongsTo(User, {
    foreignKey: 'profileId',
    targetKey: 'id',
    as: 'userId',
});

Profile.sync({ alter: true, });

//EXPORTACIÓN DEL MODELO PERFILES
module.exports = Profile;