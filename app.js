const db = require('./db');
const movie = require('./db/models/movie');
//const person = require('./db/models/person');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

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

        const movieById = await Movie.findByPk(3);
        console.log(movieById.toJSON());

        const movieByRuntime = await Movie.findOne({ where: {runtime: 115}});
        console.log(movieByRuntime.toJSON());

        const personByLastName = await Person.findOne({where: {lastName: 'Hanks'}});
        console.log(personByLastName.toJSON());

        const personById = await Person.findByPk(1);
        console.log(personById.toJSON());

        const movies = await Movie.findAll({
            attributes: ['id', 'title'], //return only id and title
            where: {
                isAvailableOnVHS: true,
            },
        });
        console.log( movies.map(movie => movie.toJSON()) );

        const people = await Person.findAll({
            where: {
                lastName: 'Hanks'
            }
        });
        //Select * FROM People where lastName = 'Hanks';
        console.log( people.map(person => person.toJSON()) );

        const moviesWHERE = await Movie.findAll({
            where: {
                runtime: 81,
                isAvailableOnVHS: true
            }
        });
        //Select * fromm movies where runtime = 92 and isAvailableOnVHS = true;
        console.log( moviesWHERE.map(movie => movie.toJSON()) );

        const moviesATTR = await Movie.findAll({
            attributes: ['id', 'title', 'releaseDate'], //return only id and title and releaseDate
            where: {
                //isAvailableOnVHS: true,
                releaseDate: {
                    [Op.gte]: '1985-01-01', // greater than or equal to the date
                },
                runtime: {
                    [Op.gt]: 70, //greater than 95
                },
                title: {
                    [Op.startsWith]: 'toy',
                },
                runtime: {
                    [Op.between]: [75, 115],
                },
            },
            order: [['releaseDate', 'ASC']], //IDs in descending order
        });
        console.log(moviesATTR.map(movie => movie.toJSON()) );

        
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