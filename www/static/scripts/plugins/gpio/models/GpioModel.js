define([],
function() {

console.log(DS);

    var attr = DS.attr;


    return DS.Model.extend({
        name: attr(),
        gpio: attr()
    });

});
