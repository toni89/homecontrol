function CLASS_SWITCH_BINARY() {
    this.id = 'CLASS_SWITCH_BINARY';
    this.displayName = 'Switch';
    this.render = 'deviceClassSwitchBinary';
    this.renderAction = 'actionClassBinary';
    this.visibleActions = ['SetOn', 'SetOff'];

    this.SetOn = '';
    this.SetOff = '';
    this.GetState = '';

}

module.exports = CLASS_SWITCH_BINARY;