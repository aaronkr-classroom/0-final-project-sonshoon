const mongoose = require("mongoose");
const Movie = require("../models/Movie");

mongoose.connect( "mongodb+srv://ut-node:TIzqsIk4hXJdnHPT@ut-node.a39enzf.mongodb.net/?retryWrites=true&w=majority&appName=ut-node",{
    useNewUrlParser: true, useUnifiedTopology: true });

const seedMovies = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    releaseDate: new Date("2010-07-16"),
    genre: "Science Fiction"
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseDate: new Date("1972-03-24"),
    genre: "Crime"
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    releaseDate: new Date("1994-10-14"),
    genre: "Crime"
  }
];

Movie.insertMany(seedMovies)
  .then(() => {
    console.log("Seed data inserted");
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`Error inserting seed data: ${error.message}`);
    mongoose.connection.close();
  });
