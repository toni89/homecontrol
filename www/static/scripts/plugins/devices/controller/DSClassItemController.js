define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            deviceActions: [],
            deviceProperties: [],

            init: function() {
                var self = this,
                    myActions = this.get('model').visibleActions,
                    model = this.get('model'),
                    deviceId = this.parentController.get('model')._id;

                myActions.forEach(function(item) {
                    self.deviceActions.push({
                        id: 'Actions[' + deviceId + ']['+ model.id + '][' + item +']',
                        name: item,
                        checked: false
                    })
                });

                console.log(myActions);
            },

            actions: {
                collect : function() {
                    var actions = this.get('Actions');
                    console.log(this.deviceActions[0].get('checked'));
                }
            },


            getProperties: function() {
                var classProps = [],
                    properties = this.get('model').properties;

                if(properties) {
                    for (var property in properties) {
                        if (properties.hasOwnProperty(property)) {
                            classProps.push(property);
                        }
                    }
                }
                return classProps;
            }.property()
        });
    });

