define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            title: 'New Device',
            selectedType: null,

            actions: {
                'submit' : function() {

                }
            },

            selectedTypeChanged: function() {
                this.setTypeTemplate(this.get('selectedType'));
            }.observes('selectedType'),

            setTypeTemplate: function(selection) {
                if(selection) {
                    // render view to outlet
                } else {
                    // render Nothing1
                }
            },

            getCreatableTypes: function() {
                var types = this.get('types'),
                    createableTypes = [];


                types.forEach(function(item) {
                    if(!item.autoDetect)
                        createableTypes.push(item);
                });

                return createableTypes;
            }.property('types')


        });
    });