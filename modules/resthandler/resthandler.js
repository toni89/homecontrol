var assert = require("assert"),
    restify = require("restify");

module.exports = function(options, imports, register) {
    assert(options.port, "Option 'port' is required");


    var server = restify.createServer({
        "name" : "homecontrol"
    });


    // Middleware
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.CORS());


    server.listen(options.port , "127.0.0.1", function(){
        console.log('%s listening at %s ', server.name , server.url);
    });

    register(null, {
        "resthandler" : server
    });
}