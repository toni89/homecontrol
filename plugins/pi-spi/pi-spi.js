var assert = require("assert");
SPI = require('pi-spi');

// options - enthält die in der config.js festgelegten Variablen
// imports - enthält alle in der package.json mit 'consumes' referenzierten Module
// register - Mithilfe register kann das komplette Modul oder nur Teilfunktionen verfügbar gemacht werden
module.exports = function(options, imports, register) {


    var spi = SPI.initialize("/dev/spidev0.0"),
        test = Buffer("Hello, World!");

    // reads and writes simultaneously
    spi.transfer(test, test.length, function (e,d) {
        if (e) console.error(e);
        else console.log("Got \""+d.toString()+"\" back.");

        if (test.toString() === d.toString()) {
            console.log(msg);
        } else {
            // NOTE: this will likely happen unless MISO is jumpered to MOSI
            console.warn(msg);
            process.exit(-2);
        }
    });

    // Modul freigeben
    register(null, {
        "spi" : spi
    });

}


