const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const app = express();

const expressGraphQL = require("express-graphql");
const Emblem = require("../models/Emblem");
const Abode = require('../models/Abode');
const God = require('../models/God');
const schema = require("./schema/schema");
 
if (!db) {
    throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
    // The configuration object we pass into connect()
    // prevents an error being thrown by the latest release of MongoDB's driver
    .connect(db, {useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// We use body-parser in order to be able to parse
// incoming requests in middleware before they are handled
app.use(bodyParser.json());

app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true
    })
);

module.exports = app;