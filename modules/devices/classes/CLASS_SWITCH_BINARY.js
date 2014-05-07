function CLASS_SWITCH_BINARY() {
    this.id = 'CLASS_SWITCH_BINARY';
    this.renderTarget = 'deviceClassSwitchBinary';

    this.setOn = '';
    this.setOff = '';
    this.getState = '';

    this.properties = {
        state: false
    };
}

module.exports = CLASS_SWITCH_BINARY;