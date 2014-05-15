function CLASS_EXECUTABLE() {
    this.id = 'CLASS_EXECUTABLE';
    this.renderTarget = 'deviceClassExecutable';
    this.visibleActions = ['Start', 'Stop'];

    this.Start = '';
    this.Stop = '';
    this.GetState = '';
}

module.exports = CLASS_EXECUTABLE;