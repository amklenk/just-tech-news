//require
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create user model
class User extends Model{}

//define table columsn and config
User.init(
{
    //define an id column
    id: {
        //use the special Sequelize DataTypes object, and what type of data
        type: DataTypes.INTEGER,
        //NOT NULL
        allowNull: false,
        //primary key
        primaryKey: true,
        //auto increment
        autoIncrement: true
    },
    //define username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //define an email column
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        //no duplicates
        unique: true,
        //data validators
        validate:{
            isEmail: true
        }
    },
    //define password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //password must be at least four characters long
            len: [4]
        }
    }
},
{
    //table config
    hooks: {
        //set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData){
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },

        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    //pass in imported sequelize connection
    sequelize,
    //don't automatically create timestamp fields
    timestamps: false,
    //don't pluralize name of database table
    freezeTableName: true,
    //use understcores instead of camel case
    underscored: true,
    //make it so our model name stays lowercase in the database
    modelName: 'user'
}
);

//export
module.exports = User;