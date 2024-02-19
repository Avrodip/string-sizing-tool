"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class inoutparameterslog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    inoutparameterslog.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            controllerName: {
                type: DataTypes.STRING,
                required: true,
            },
            routeName: {
                type: DataTypes.STRING,
                required: true,
            },
            inputParameters: {
                type: DataTypes.TEXT,
            },
            outputParameters: {
                type: DataTypes.TEXT,
            },
            requestFrom: {
                type: DataTypes.INTEGER,
                defaultValue: 1, //1: Web, 2: Android, 3: iOs
            },
            message: {
                type: DataTypes.TEXT,
            },
            hasError: {
                type: DataTypes.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW(),
            },
        },
        {
            sequelize,
            modelName: "inoutparameterslog",
        }
    );
    return inoutparameterslog;
};
