function CLASS_EXECUTABLE() {
    this.id = 'CLASS_EXECUTABLE';
    this.displayName = 'Execute';
    this.render = 'deviceClassExecutable';
    this.visibleActions = ['Start', 'Stop'];

    this.Start = '';
    this.Stop = '';
    this.GetState = '';
}

module.exports = CLASS_EXECUTABLE;