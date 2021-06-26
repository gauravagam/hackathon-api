const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
process.env.NODE_CONFIG_DIR = `${__dirname}/environments/`;
const config = require("config");
const MONGODB_URI = config.get('app.MONGODB_URI');
const PORT = config.get('app.MONGODB_URI');
const logger = require('./src/utils/logger');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});

const db = mongoose.connection;

db.on("error", (err) => {
  logger.error(err);
});

db.once("open", () => {
  require('./src/route')(app);
  logger.info(`Server started on port ${PORT}`);
});
