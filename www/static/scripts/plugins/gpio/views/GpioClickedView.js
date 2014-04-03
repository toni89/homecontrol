define(
    [],
    function() {
        return Ember.View.extend({
            tagName: 'span',

            click: function() {
                alert("Hallo Welt");
            }
        });
    });

