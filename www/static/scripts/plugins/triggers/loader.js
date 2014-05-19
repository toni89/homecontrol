define(
    [
        "./routes/TRIndexRoute",
        "./controller/TRIndexController",
        "./views/TRIndexView",

        "./routes/TRNewRoute",
        "./controller/TRNewController",
        "./views/TRNewView",

        // DeviceItem
        "./routes/TREditRoute",
        "./controller/TREditController",
        "./views/TREditView"
    ]
    , function(
        TriggersIndexRoute,
        TriggersIndexController,
        TriggersIndexView,

        TriggersNewRoute,
        TriggersNewController,
        TriggersNewView,

        TriggersEditRoute,
        TriggersEditController,
        TriggersEditView
        ) {

        App.Router.map(function() {
            this.resource("triggers", function() {
                this.route("new");
                this.route("edit", { path: 'edit/:trigger_id' });
                this.route("delete", { path: 'delete/:trigger_id' });
            });
        });

        return {
            TriggersIndexRoute: TriggersIndexRoute,
            TriggersIndexController: TriggersIndexController,
            TriggersIndexView: TriggersIndexView,

            TriggersNewRoute: TriggersNewRoute,
            TriggersNewController: TriggersNewController,
            TriggersNewView: TriggersNewView,

            TriggersEditRoute: TriggersEditRoute,
            TriggersEditController: TriggersEditController,
            TriggersEditView: TriggersEditView
        }
    });