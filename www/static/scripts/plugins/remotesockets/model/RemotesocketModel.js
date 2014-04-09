define(
[],
function() {
    var attr = DS.attr;

    App.reopen({
        Remotesocket: DS.Model.extend({
            name: attr(),
            code: attr(),
            bootstate: attr('String', { defaultValue: 'none' })
        })
    });
});

