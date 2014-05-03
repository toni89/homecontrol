define([],
    function() {
        return Ember.Controller.extend({
            title: "Edit Socket",

            actions: {
                submit: function() {

                    /*var newSocket = {
                        name: this.get('name'),
                        code: this.get('code')
                    };


                    App.io.emit("p/remotesockets/socket/create", newSocket);
                    this.transitionTo('remotesockets.index'); */
                }
            }
        });
    });