define(
    [
        "./routes/EVIndexRoute",
        "./controller/EVIndexController",
        "./views/EVIndexView",

        "./routes/EVNewRoute",
        "./controller/EVNewController",
        "./views/EVNewView",

        "./routes/EVEditRoute",
        "./controller/EVEditController",
        "./views/EVEditView"
    ]
    , function(
        EventsIndexRoute,
        EventsIndexController,
        EventsIndexView,

        EventsNewRoute,
        EventsNewController,
        EventsNewView,

        EventsEditRoute,
        EventsEditController,
        EventsEditView
        ) {

        App.Router.map(function() {
            this.resource("events", function() {
                this.route("new");
                this.route("edit", { path: 'edit/:event_id' });
            });
        });

        return {
            EventsIndexRoute: EventsIndexRoute,
            EventsIndexController: EventsIndexController,
            EventsIndexView: EventsIndexView,

            EventsNewRoute: EventsNewRoute,
            EventsNewController: EventsNewController,
            EventsNewView: EventsNewView,

            EventsEditRoute: EventsEditRoute,
            EventsEditController: EventsEditController,
            EventsEditView: EventsEditView
        }
    });