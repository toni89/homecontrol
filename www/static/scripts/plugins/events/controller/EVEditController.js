define([],
    function() {
        return Ember.Controller.extend({

            defaultConfig: {
                name: '',
                description: '',
                repeat_daily: false,
                start_time: '',
                start_date: '',
                devices: [],

                repeat_time: '',

                temperatureBool : false,
                specialDateBool : false,
                sunBool: false,
                repeatDateBool: false,

                temperature: '',
                min: ''
            },

            names: [
                {name: 'Time',
                value: 'timeconfig'},
                {name: 'Other',
                value: 'weatherconfig'}],

            timetriggers: [
                {name: 'daily',
                value: 'daily'},
                {name: 'weekly',
                value: 'weekly'},
                {name: 'weekend',
                value: 'weekend'}
            ],

            sun: [
                {name: 'sunset',
                value: 'sunset'},
                {name: 'sunrise',
                value: 'sunrise'}
            ],

            plusminus: [
                {name: '+',
                value: '+'},
                {name: '-',
                value: '-'}
            ],

            conditions: [
                {name: '<',
                 value: '<'},
                {name: '=',
                 value: '='},
                {name: '>',
                value: '>'}
            ],

            selectedTypeChanged: function(selectedType){
                this.send('setTypeTemplate', this.get('selectedType'));
            }.observes('selectedType'),
            selectedType:null
        });
    });