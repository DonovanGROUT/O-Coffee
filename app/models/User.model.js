import sequelize from "../database.js";
import { DataTypes, Model } from "sequelize";

export default class User extends Model { }

User.init(
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'member',
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);
