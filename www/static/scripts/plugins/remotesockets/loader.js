// Moduleloader
define(
    // Define Routes, Controller, Views, etc.
    [
        "./model/RSSocketModel",

        // remotesockets/
        "./routes/RSIndexRoute",
        "./controller/RSIndexController",
        "./views/RSIndexView",

        // remotesockets/new
        "./routes/RSNewRoute",
        "./controller/RSNewController",
        "./views/RSNewView",

        // remotesockets/edit
        "./routes/RSEditRoute",
        "./controller/RSEditController",

        "./views/RSButtonView"
     ]
, function(
    RSSocketModel,

    RSIndexRoute,
    RSIndexController,
    RSIndexView,

    RSNewRoute,
    RSNewController,
    RSNewView,

    RSEditRoute,
    RSEditController,

    RSButtonView
    ) {

    // Add Route
    App.Router.map(function() {
        this.resource("remotesockets", function() {             // /#/remotesockets
            this.route("new");                                  // /#/remotesockets/new
            this.route("edit", { path: 'edit/:socket_id' });    // /#/remotesockets/edit/123456
        });
    });

    // Build Object Package an return it to App
    return {
        //Remotesocket: RSSocketModel,

        RemotesocketsIndexRoute: RSIndexRoute,
        RemotesocketsIndexController: RSIndexController,
        RemotesocketsIndexView: RSIndexView,

        RemotesocketsNewRoute: RSNewRoute,
        RemotesocketsNewController: RSNewController,
        RemotesocketsNewView: RSNewView,

        RemotesocketsEditRoute: RSEditRoute,
        RemotesocketsEditController: RSEditController,
        RemotesocketsEditView: RSNewView,

        RemotesocketsButtonView: RSButtonView
    }
});