"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("inoutparameterslogs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            controllerName: {
                type: Sequelize.STRING,
                required: true,
            },
            routeName: {
                type: Sequelize.STRING,
                required: true,
            },
            inputParameters: {
                type: Sequelize.TEXT,
            },
            outputParameters: {
                type: Sequelize.TEXT,
            },
            requestFrom: {
                type: Sequelize.INTEGER,
                defaultValue: 1, //1: Web, 2: Android, 3: iOs
            },
            message: {
                type: Sequelize.TEXT,
            },
            hasError: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW(),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("inoutparameterslogs");
    },
};
