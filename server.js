const mongoose = require("mongoose");

const app = require('./app');

// const DB_HOST = "mongodb+srv://DB-user:oWvXBVogNTOAhdUz@cluster0.vokv7yv.mongodb.net/contacts-base?retryWrites=true&w=majority";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
    console.log("Database connection successful")
  }))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });