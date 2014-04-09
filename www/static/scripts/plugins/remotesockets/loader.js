// Moduleloader
define(
    // Define Routes, Controller, Views, etc.
    [
     "./model/RemotesocketModel",

     // remotesockets/
     "./routes/RemotesocketsRoute",
     "./controller/RemotesocketsController",
     "./views/RemotesocketsView",

     // remotesockets/new
     "./routes/RemotesocketsNewRoute",
     "./controller/RemotesocketsNewController",
     "./views/RemotesocketsNewView"]
, function(
    RemotesocketModel,

    RemotesocketsRoute,
    RemotesocketsController,
    RemotesocketsView,

    RemotesocketsNewRoute,
    RemotesocketsNewController,
    RemotesocketsNewView) {

    // Add Route
    App.Router.map(function() {
        this.resource("remotesockets", function() {         // /#/remotesockets
            this.route("new");                              // /#/remotesockets/new
        });
    });

    // Build Object Package an return it to App
    return {
        //Remotesocket: RemotesocketModel,

        RemotesocketsRoute: RemotesocketsRoute,
        RemotesocketsController: RemotesocketsController,
        RemotesocketsIndexView: RemotesocketsView,

        RemotesocketsNewRoute: RemotesocketsNewRoute,
        RemotesocketsNewController: RemotesocketsNewController,
        RemotesocketsNewView: RemotesocketsNewView
    }
});