function Event(){
    //Name
    this.name = '';
    //Beschreibung
    this.description = '';

    //Startstring & Ende
    this.start_time = hhmm;
    this.start_date = '';

    this.end_time = hhmm;
    this.end_date = '';

    //Trigger Kategorie
    this.trigger = '';

    //Täglich wiederholen
    this.repeat_daily = false;
    this.devices = [];
    this.triggers = [];

    this.active = false;
}

module.exports = Event;