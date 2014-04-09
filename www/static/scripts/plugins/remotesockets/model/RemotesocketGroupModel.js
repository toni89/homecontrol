define(
    [],
    function() {
        var attr = DS.attr;

        App.reopen({
            RemotesocketGroup: DS.Model.extend({
                name: attr(),
                sockets: DS.hasMany('Remotesocket')
            })
        });
    });

