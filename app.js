const db = require('./db');
const { Movie } = db.models;

/*const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db'
});*/

//Movie model
/*class Movie extends Sequelize.Model {}
Movie.init({
    title : Sequelize.STRING
}, { sequelize }); //same as { sequelize : sequelize }*/

(async () => {
    //Sync 'Movies' table
    await db.sequelize.sync({ force: true });

    try{
        //await sequelize.authenticate();
        //console.log('Connection to the database succesful!');
        const movieInstances = await Promise.all([
            Movie.create({
                title: '',
                runtime: -81,
                releaseDate: '1495-11-22',
                isAvailableOnVHS: true,
            }),
            Movie.create({
                title: 'The Incredibles',
                runtime: 115,
                releaseDate: '2004-04-14',
                isAvailableOnVHS: true,
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
        if(error.name === 'SequelizeValidationError'){
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        }else{
            throw error;
        }
    }
})();