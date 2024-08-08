const mongoose = require("mongoose");
const { UrlDb } = require("../env");

mongoose.connect(UrlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

module.exports = connection;
