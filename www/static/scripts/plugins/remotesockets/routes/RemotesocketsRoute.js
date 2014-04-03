define(
    [],
    function() {
        return Ember.Route.extend({
            model: function() {
                return [
                    {name: "Kaffeemaschine", group: "generated", code: "001"},
                    {name: "Waschmaschine", group: "generated", code: "010"},
                    {name: "Wassersprengler", group: "generated", code: "011"}
                ];
            }
        });
    });