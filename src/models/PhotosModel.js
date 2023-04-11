const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Photos = sequelize.define(
        "photo",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER
            },
            title: {
                type: DataTypes.STRING
            },
            slug: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            medialocation: {
                type: DataTypes.STRING
            }
        }
    );
    // association : a photo belongs to a user / a photo can have many comments
    Photos.associate = (models) => {
        Photos.belongsTo(models.user, {
            foreignKey: 'userId'
        });
        Photos.hasMany(models.comment);
    };
    return Photos;
}