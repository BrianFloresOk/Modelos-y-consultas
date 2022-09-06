const {Movie} = require('../database/models');
const { Op } = require("sequelize")


module.exports = {
    list: (req, res) => {
        Movie.findAll()
            .then((movies) => res.render('moviesList', {movies}))
            .catch(errors => res.send(errors))
    },

    new: (req, res) => {
        Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
        })
            .then(movies => res.render('newestMovies', {movies}))
            .catch(errors => res.send(errors))
        },

    recomended: (req, res) => {
        Movie.findAll({
            order: [
                ['rating', 'DESC']
            ],
            limit: 5,
            where:{
                rating: {[Op.gte]:8}
            }

        })
            .then(movies => res.render('recommendedMovies', {movies}))
            .catch(errors => res.send(errors))
    },

    detail: (req, res) => {
        Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDetail', {movie}))
    }

}
