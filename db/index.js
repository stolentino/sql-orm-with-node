const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db',
    //logging: false,
    //global options
    define: {
        timestamps: false,
        freezeTableName: true,
    }
});

const db = {
    sequelize,
    Sequelize,
    models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);
//import new model
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;