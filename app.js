const db = require('./db');
//const person = require('./db/models/person');
const { Movie, Person } = db.models;

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
        const newInstances = await Promise.all([
            Movie.create({
                title: 'Toy Story',
                runtime: 81,
                releaseDate: '1995-11-22',
                isAvailableOnVHS: true,
            }),
            Movie.create({
                title: 'The Incredibles',
                runtime: 115,
                releaseDate: '2004-04-14',
                isAvailableOnVHS: true,
            }),

            Person.create({
                firstName: 'Tom',
                lastName: 'Hanks',
            }),
            //console.log(person.toJSON);

            Movie.build({
                title: 'Toy Story 3',
                runtime: 103,
                releaseDate: '2010-06-18',
                isAvailableOnVHS: false,
            }).save()
        ]);
        const moviesJSON = newInstances.map(movie => movie.toJSON());
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