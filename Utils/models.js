/**
 * Created by tech4Gt on 6/23/17.
 */
const Sequelize = require('sequelize');


const sequelize = new Sequelize("tech4GT", "postgres", "", {
    host: "localhost",
    dialect: 'postgres',
    port: 5432,

    pool: {
        min: 0,
        max: 5,
        idle: 1000
    },

});

sequelize.sync();

module.exports = {

    User : sequelize.define('user',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING
        }

    })
}