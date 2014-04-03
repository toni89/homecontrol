define(
    [],
    function() {
        return Ember.Route.extend({
            model: function() {
                return [
                    {name: "GPIO 18", gpio: 12},
                    {name: "GPIO 15", gpio: 10},
                    {name: "GPIO 14", gpio: 8}
                ];
            }
        });
    });