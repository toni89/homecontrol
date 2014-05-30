function CLASS_SWITCH_MULTILEVEL() {
    this.id = 'CLASS_SWITCH_MULTILEVEL';
    this.displayName = 'Level';
    this.render = 'deviceClassSwitchMultilevel';
    this.visibleActions = ['SetLevel'];

    this.SetLevel = '';
    this.GetLevel = '';

    this.properties = {
        level: 0
    };
}

module.exports = CLASS_SWITCH_MULTILEVEL;