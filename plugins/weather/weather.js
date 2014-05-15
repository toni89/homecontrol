var assert = require("assert"),
    own = require("Openweather-Node");

var io,
    local,
    mgs,
    evh,
    weather = {

        worker: null,

        events: [],
        terms: [],
        eventType: null,

        weatherData: {temperature: 20},

        routes : {
            'registerEvent' : 'p/weather/registerEvent',
            'removeEvent' : 'p/weather/removeEvent'
        },

        config: {
            culture: 'de',
            location: 'Augsburg',
            pollingIntervall: 600000 // TODO: 15 minutes
        },


        init: function() {
            var self = this;

            // Configure OpenWeatherMap-Module
            own.setCulture(this.config.culture);

            // Register Module to eventhandler
            this.eventType = {
                id: 'weather',
                displayName: 'OpenWeatherMap.org Event',
                configRoute: 'owmEventConfig',
                registerEvent: this.routes.registerEvent,
                removeEvent: this.routes.removeEvent
            };

            evh.addEventType(this.eventType);

            // Create and Start Worker Process
            this.worker = setInterval(this.checkTerms.bind(this), this.config.pollingIntervall);

            local.on(self.routes.registerEvent, function(event) {
                self.registerEvent(event);
            });

            local.on(self.routes.removeEvent, function(event) {
                self.removeEvent(event);
            });

        },

        checkTerms: function() {
            var self = this;

            // Get Weather data
            this.getWeather(function(err, wData) {
                if(err)
                    console.log('weather: Cant get weatherdata');
                else {
                    wData.values.temperatureInDegree = wData.getDegreeTemp();
                    self.weatherData = wData;

                    self.events.forEach(function(event) {

                        event.event.terms.forEach(function(term) {
                            if(term.targetType == 'weather') {
                                if(self.checkTerm(term)) {
                                    local.emit(evh.routes.raiseTerm, event._id, term);
                                }
                            }
                        });

                    });
                }
            });
        },

        raiseTerm: function() {

        },

        checkTerm: function(term) {
            var data = this.weatherData.values;

            var cWeather = {
                temperature: data.temperatureInDegree.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            };


            if(cWeather.temperature > term.parameters.temperature)
                return true;

            return false;

        },



        getWeather: function(callback) {
            own.now(this.config.location, function(err, data) {
                if(err)
                    callback(err, null);
                else
                    callback(null, data);
            });
        },

        registerEvent: function(event) {
            var exists = this.events.filter(function(el) {
                return el._id == event._id;
            });

            if(exists.length == 0)
                this.events.push(event);

        },

        removeEvent: function(event) {
            this.events = this.events.filter(function(el) {
                return el._id != event._id;
            });
        }
    };



module.exports = function(options, imports, register) {

    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");
    assert(imports.eventhandler, "Package 'eventhandler' is required");

    io = imports.server.io;
    local = imports.server.local;
    mgs = imports.db.mongoose;
    evh = imports.eventhandler;

    weather.init();

    register(null, {
        "weather" : weather
    });
};