function Device() {
    this.name = '';
    this.description = '';
    this.type = '';
    this.status = '';
    this.statusEnabled = false;
    this.typeData = null;
    this.classes = [];
}

Device.prototype.addDeviceClass = function(deviceClass) {
    this.classes.push(deviceClass);
};


module.exports = Device;
