const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect('mongodb+srv://admin:0017@cluster0.hgmte.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true })
    .catch(error => console.log(error));

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('mongodb connection successfull!');
})

app.use(cors())
app.use(bodyParser.json());

app.listen(8080, function () {
    console.log("application listening on port 8080");
})