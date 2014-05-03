define(
    [
        "./routes/EVIndexRoute",
        "./controller/EVIndexController",
        "./views/EVIndexView",

        "./routes/EVNewRoute",
        "./controller/EVNewController",
        "./views/EVNewView",

        // DeviceItem
        "./controller/EVEventConroller",
        "./views/EVEventView",

        "./controller/EVEditController"
    ]
    , function(
        EventsIndexRoute,
        EventsIndexController,
        EventsIndexView,

        EventsNewRoute,
        EventsNewController,
        EventsNewView,

        EVEventController,
        EVEventView,

        EVEventEditRoute
        ) {

        App.Router.map(function() {
            this.resource("events", function() {
                this.route("new");
                this.resource('event', { path: 'edit/:socket_id' });
            });
        });

        return {
            EventsIndexRoute: EventsIndexRoute,
            EventsIndexController: EventsIndexController,
            EventsIndexView: EventsIndexView,

            EventsNewRoute: EventsNewRoute,
            EventsNewController: EventsNewController,
            EventsNewView: EventsNewView,

            EventController: EVEventController,
            EventView: EVEventView,

            EventEditRoute: EVEventEditRoute
        }
    });