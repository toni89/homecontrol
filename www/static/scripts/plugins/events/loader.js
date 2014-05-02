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
        "./views/EVEventView"
    ]
    , function(
        EventsIndexRoute,
        EventsIndexController,
        EventsIndexView,

        EventsNewRoute,
        EventsNewController,
        EventsNewView,

        EVEventController,
        EVEventView
        ) {

        App.Router.map(function() {
            this.resource("events", function() {
                this.route("new");
                //this.route('event');
                this.resource('event', { path:':id' });
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
            EventView: EVEventView
        }
    });