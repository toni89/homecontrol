function Event(){
    //Name
    this.name = '';
    //Beschreibung
    this.description = '';

    //Startstring & Ende
    this.start_time = '';
    this.end_time = '';
    this.start_date = '';
    this.end_date = '';

    //Trigger Kategorie
    this.trigger = '';

    //Täglich wiederholen
    this.repeat_daily = false;
    this.active = false;
    this.devices = [];
    this.triggers = [];
}

module.exports = Event;