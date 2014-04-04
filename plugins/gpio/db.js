var PinStore = require("./PinStore.js");

var instance = null;

function connect(callback) {
    if (instance === null) {
        instance = new PinStore();
    }
    setImmediate(callback, null);
}

function disconnect(callback) {

}

function getInstance() {
    return instance;
}

exports.connect = connect;
exports.disconnect = disconnect;
exports.getInstance = getInstance;