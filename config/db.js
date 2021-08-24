require('dotenv').config();
const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;

const DB = process.env.DATABASE;

const connectDB = () => {
  mongoose
    .connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connected to database'))
    .catch(err => log(chalk.blue.bgBlue(err)));
};

module.exports = connectDB;
