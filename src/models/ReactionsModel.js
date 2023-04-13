const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Reactions = sequelize.define(
        "reaction",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },            
            userId: {
                type: DataTypes.INTEGER
            },
            commentId: {
                type: DataTypes.INTEGER
            },            
            reaction: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        }
    );
    // association :  a reaction belongs to a user, a reaction is linked to a comment
    Reactions.associate = (models) => {
        Reactions.belongsTo(models.user, {
            foreignKey: 'userId'
        });
        Reactions.belongsTo(models.comment, {
            foreignKey: 'commentId'
        });
    };
    return Reactions;
}