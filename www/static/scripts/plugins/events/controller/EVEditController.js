define([],
    function() {
        return Ember.Controller.extend({

            defaultConfig: {
                name: '',
                description: '',
                repeat_daily: false,
                start: '',
                end: '',
                devices: []
            },
            names: [
                {name: 'Time',
                value: 'timeconfig'},
                {name: 'Weather',
                value: 'weatherconfig'}],

            conditions: [
                {name: 'Temperatur',
                value: 'temperatur'},
                {name: 'Luftdruck',
                value: 'luftdruck'},
                {name: 'Sturmwarnung',
                value: 'Sturmwarnung'},
                {name: 'Sonnenaufgang',
                value: 'sonnenaufgang'},
                {name: 'Sonnenuntergang',
                value: 'sonnenuntergang'}
            ],

            selectedTypeChanged: function(selectedType){
                this.send('setTypeTemplate', this.get('selectedType'));
            }.observes('selectedType'),
            selectedType:null
        });
    });