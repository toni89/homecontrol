var assert = require("assert"),
    own = require("Openweather-Node");


var io,
    mgs,
    weather = {
        test : ''
    };




module.exports = function(options, imports, register) {

    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");

    io = imports.server.io;
    mgs = imports.db.mongoose;


    register(null, {
        "weather" : weather
    });
};