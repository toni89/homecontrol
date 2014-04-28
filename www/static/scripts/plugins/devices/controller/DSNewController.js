define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            title: 'New Device',
            defaultConfig: {
                name: ''
            },
            selectedType: null,

            selectedTypeChanged: function() {
                this.send('setTypeTemplate', this.get('selectedType'));
            }.observes('selectedType'),

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