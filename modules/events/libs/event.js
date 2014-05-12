function Event(){
    //Name
    this.name = '';
    //Beschreibung
    this.description = '';

    //Startstring & Ende
    this.start = '';
    this.end = '';

    //Trigger Kategorie
    this.trigger = '';

    //Täglich wiederholen
    this.repeat_daily = false;
    this.active = false;
    this.devices = [];
}

module.exports = Event;