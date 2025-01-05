import sequelize from "../database.js";
import { DataTypes, Model } from "sequelize";

export default class Coffee extends Model { }

Coffee.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        origine: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prix_au_kilo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        caracteristique_principale: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        disponible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        userId: { // Clé étrangère pour la relation avec User
            type: DataTypes.INTEGER,
            references: {
                model: 'users', // Nom de la table des utilisateurs
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: "coffee",
    }
);
