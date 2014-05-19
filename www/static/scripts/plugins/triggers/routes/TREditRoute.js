define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function() {
                var self = this;
            },

            model: function(params) {
                triggerid = params.trigger_id;

                var r1 = new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/trigger/info', function(trigger) {
                        trigger = JSON.parse(trigger);
                        resolve({'trigger': trigger});
                    });
                    App.io.emit('main/trigger/info', triggerid);
                }, 3000);

                return new Ember.RSVP.all([r1]).then(function(response){
                    trigger = response[0].trigger;
                });
            },

            setupController: function(controller) {
                id = trigger._id;
                controller.set('trigger', trigger);
            },

            actions: {
                /*
                setTypeTemplate: function(selection){
                    if(selection.configRoute != ''){
                        this.render(selection.value, {into: 'events.edit', outlet: 'eventconfig'});
                    }
                },*/

                submit: function() {
                    var self = this;

                    var name = this.controller.get('trigger').trigger.name;
                    var description = this.controller.get('trigger').trigger.description;

                    /*
                    App.io.emit('events/updateEvent', {
                        id: id,
                        name: name,
                        description: description,
                        repeat_daily: repeat_daily,
                        start: start,
                        end: end});*/
                    }
            }
        });
    });