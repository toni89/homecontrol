define([],
    function() {
        return Ember.Controller.extend({

            names: [
                {name: 'temperature',
                 value: 'temperature'},
                {name: 'sunrise',
                value: 'sunrise'}]

            /*selectedTypeChanged: function(selectedType){
                this.send('setTypeTemplate', this.get('selectedType'));
            }.observes('selectedType'),
            selectedType:null*/
        });
    });