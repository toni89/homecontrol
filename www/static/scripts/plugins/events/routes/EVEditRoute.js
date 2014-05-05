define(
    [],
    function() {
        return Ember.Route.extend({

            model: function(params) {

                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/events/info', function(event) {
                        event = JSON.parse(event);
                        resolve({'event': event});
                    });
                    App.io.emit('main/events/info', params.event_id);
                }, 3000);
            },

            setupController: function(controller, model) {
                id = model.event._id;
                controller.set('event', model.event);
            },

            actions: {
                submit: function() {
                    var self = this;

                    var name = this.controller.get('event').event.name;
                    var description = this.controller.get('event').event.description;
                    var repeat_daily = this.controller.get('event').event.repeat_daily;

                    var start = this.controller.get('event').event.start;
                    var end = this.controller.get('event').event.end;


                        /*App.io.on('eventobject saved', function(socket) {
                         console.log('eventobject PING zurück ' + socket);
                         self.transitionToRoute('events.index');
                         });*/

                    App.io.emit('events/updateEvent', {
                        id: id,
                        name: name,
                        description: description,
                        repeat_daily: repeat_daily,
                        start: start,
                        end: end});
                }
            }
        });
    });