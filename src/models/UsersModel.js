const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
//const Comment = require('../models/CommentsModel');
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },            
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING,
                select: false
            },
            username: {
                type: DataTypes.STRING
            }            
        }
    );    
    // association :  1 user -> many comments / 1 user -> many photos
    Users.associate = (models) => {
        Users.hasMany(models.comment);
        Users.hasMany(models.photo);
    };
    return Users;
}