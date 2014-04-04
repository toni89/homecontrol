var i = 0;

function PinStore() {
    this.pins = {};
}

PinStore.prototype.add = function (pin, callback) {
    pin._id = i++;
    pin.State = true;

    this.pins[pin._id] = pin;
    setImmediate(callback, null);
};

PinStore.prototype.update = function (pin, callback) {
    this.pins[pin._id] = pin;
    setImmediate(callback, null);
};

PinStore.prototype.findById = function(id, callback) {
    if(this.pins[id]!=undefined)
        setImmediate(callback, null, this.pins[id]);
    else
        setImmediate(callback, null, null);
};

PinStore.prototype.findAll = function(callback) {
    var tempItems = [];
    var key;

    for (key in this.pins) {
        if (this.pins.hasOwnProperty(key))
            tempItems.push(this.pins[key]);
    }
    setImmediate(callback, null, tempItems);
};

module.exports = PinStore;