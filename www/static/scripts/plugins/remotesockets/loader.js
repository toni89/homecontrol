// Moduleloader
define(
    // Define Routes, Controller, Views, etc.
    ["./routes/RemotesocketsRoute",
     "./controller/RemotesocketsController",
     "./views/RemotesocketsView"]
, function(RemotesocketsRoute, RemotesocketsController, RemotesocketsView) {
    // Build Object Package an return it to App
    return {
        RemotesocketsRoute: RemotesocketsRoute,
        RemotesocketsController: RemotesocketsController,
        RemotesocketsView: RemotesocketsView
    }
});