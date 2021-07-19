const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db'
});

(async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection to the database succesful!');
    }catch(error){
        console.error('Error connecting to the database: ', error);
    }
})();