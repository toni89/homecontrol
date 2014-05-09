function Event(){
    this.name = '';
    this.description = '';

    this.start = '';
    this.end = '';

    this.repeat_daily = false;
    this.active = false;

    this.devices = [];
}

module.exports = Event;