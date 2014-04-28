function CLASS_SWITCH_BINARY() {
    this.id = 'CLASS_SWITCH_BINARY';
    this.setOn = '';        // params: code
    this.setOff = '';       // params: code
    this.getStatus = '';    // params: code, returns: -1 -> noinfo
                                                    // 0 -> off
                                                    // 1 -> on
}

module.exports = CLASS_SWITCH_BINARY;