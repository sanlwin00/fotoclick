const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },            
            userId: {
                type: DataTypes.INTEGER
            },
            photoId: {
                type: DataTypes.INTEGER
            },
            content: {
                type: DataTypes.STRING
            },
            upvoteCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        }
    );
    // association :  a comment belongs to a user, a comment is linked to a photo, a comment has many reactions
    Comments.associate = (models) => {        
        Comments.belongsTo(models.user, {
            foreignKey: 'userId'
        });
        Comments.belongsTo(models.photo, {
            foreignKey: 'photoId'
        });
        Comments.hasMany(models.reaction);
    };
    return Comments;
}