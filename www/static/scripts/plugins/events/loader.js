define(
    [
        "./routes/EVIndexRoute",
        "./controller/EVIndexController",
        "./views/EVIndexView",

        "./routes/EVNewRoute",
        "./controller/EVNewController",
        "./views/EVNewView"
    ]
    , function(
        EventsIndexRoute,
        EventsIndexController,
        EventsIndexView
        ) {

        App.Router.map(function() {
            this.resource("events", function() {
                this.route("new");
            });
        });

        return {
            EventsIndexRoute: EventsIndexRoute,
            EventsIndexController: EventsIndexController,
            EventsIndexView: EventsIndexView
        }
    });