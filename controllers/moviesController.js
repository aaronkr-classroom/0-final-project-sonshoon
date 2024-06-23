
const Movie = require("../models/Movie");

module.exports = {
  index: (req, res) => {
    Movie.find()
      .then(movies => {
        res.render("movies/index", { movies: movies });
      })
      .catch(error => {
        console.log(`Error fetching movies: ${error.message}`);
        res.redirect("/");
      });
  },
  new: (req, res) => {
    res.render("movies/new");
  },
  create: (req, res) => {
    let movieParams = {
      title: req.body.title,
      director: req.body.director,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre
    };
    Movie.create(movieParams)
      .then(movie => {
        res.redirect(`/movies/${movie._id}`);
      })
      .catch(error => {
        console.log(`Error saving movie: ${error.message}`);
        res.redirect("/movies/new");
      });
  },
  show: (req, res) => {
    let movieId = req.params.id;
    Movie.findById(movieId)
      .then(movie => {
        res.render("movies/show", { movie: movie });
      })
      .catch(error => {
        console.log(`Error fetching movie by ID: ${error.message}`);
        res.redirect("/movies");
      });
  },
  edit: (req, res) => {
    let movieId = req.params.id;
    Movie.findById(movieId)
      .then(movie => {
        res.render("movies/edit", { movie: movie });
      })
      .catch(error => {
        console.log(`Error fetching movie by ID: ${error.message}`);
        res.redirect("/movies");
      });
  },
  update: (req, res) => {
    let movieId = req.params.id;
    let movieParams = {
      title: req.body.title,
      director: req.body.director,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre
    };
    Movie.findByIdAndUpdate(movieId, { $set: movieParams })
      .then(movie => {
        res.redirect(`/movies/${movieId}`);
      })
      .catch(error => {
        console.log(`Error updating movie by ID: ${error.message}`);
        res.redirect("/movies");
      });
  },
  delete: (req, res) => {
    let movieId = req.params.id;
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch(error => {
        console.log(`Error deleting movie by ID: ${error.message}`);
        res.redirect("/movies");
      });
  }
};
