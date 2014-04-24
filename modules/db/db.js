var assert = require("assert"),
    mongoose = require("mongoose");

module.exports = function(options, imports, register) {
    assert(options.database, "Option 'database' is required");

    var server = "mongodb://localhost/" + options.database

    mongoose.connect(server);

    mongoose.connection.on('connected', function() {
        console.log("mongoose: Connected to '" + server + "'");
    });

    mongoose.connection.on('disconnected', function() {
        console.log("mongoose: Disconnected from Database");
    });

    mongoose.connection.on('error', function(error) {
        console.log("mongoose: error occurred ->'" + error);
    });

    process.on('SIGINT', function() {
        mongoose.connection.close();
    });

    register(null, {
        "db" : {
            "mongoose" : mongoose
        }
    });
}