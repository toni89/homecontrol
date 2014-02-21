var assert = require("assert");

module.exports = function(options, imports, register) {
    //assert(options.port, "Option 'port' is required");
    console.log("Gpio Test Plugin ");

    var gpio = {};

    register(null, {
        "gpio" : gpio
    });
}