const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db'
});

//Movie model
class Movie extends Sequelize.Model {}
Movie.init({
    title : Sequelize.STRING
}, { sequelize }); //same as { sequelize : sequelize }

(async () => {
    //Sync 'Movies' table
    await sequelize.sync({ force: true });

    try{
        //await sequelize.authenticate();
        //console.log('Connection to the database succesful!');
        const movieInstances = await Promise.all([
            Movie.create({
                title: 'Toy Story'
            }),
            Movie.create({
                title: 'The Incredibles'
            }),
        ]);
        const moviesJSON = movieInstances.map(movie => movie.toJSON());
        console.log(moviesJSON);
        
        /*await Movie.create({
            title: 'Toy Story'
        });*/
        //console.log(movie.toJSON());

        //New Entry
        /*await Movie.create({
            title: 'The Incredibles'
        });*/
        //console.log(movie2.toJSON());

    }catch(error){
        console.error('Error connecting to the database: ', error);
    }
})();