function Event(){
    this.name = '';
    this.description = '';

    this.start = '';
    this.start_triggered = false;
    this.end = '';
    this.end_triggered = false;

    this.devices = [];
}

module.exports = Event;