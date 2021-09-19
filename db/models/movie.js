const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        //Set custom primary key column
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "title"',
                },
            },
        },
        runtime: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "runtime"',
                },
                min: {
                    args: 1,
                    msg: 'Please provide a value greater than "0" for "runtime"',
                },
            },
         },
        releaseDate: { 
            type: Sequelize.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "realeaseDate"',
                },
                isAfter: {
                    args: '1895-12-27',
                    msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
                },
            },
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false, //set default value to false
         },
    }, 
    // Model options
    { 
        paranoid: true, //enalbe soft deletes
        timestamps: false,//disable timestamps
        freezeTableName: true,//disable plural table names
        modelName: 'movie',//set model name to 'movie'; table name will be 'movies'
        tableName: 'my_movies_table',//table name change
        sequelize 
    });

    return Movie;
};
