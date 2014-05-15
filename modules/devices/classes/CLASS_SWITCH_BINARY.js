function CLASS_SWITCH_BINARY() {
    this.id = 'CLASS_SWITCH_BINARY';
    this.renderTarget = 'deviceClassSwitchBinary';
    this.visibleActions = ['SetOn', 'SetOff'];

    this.SetOn = '';
    this.SetOff = '';
    this.GetState = '';

    this.properties = {
        state: false
    };
}

module.exports = CLASS_SWITCH_BINARY;