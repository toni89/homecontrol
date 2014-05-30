define(
    [

    ],
    function() {
        //Ember.Handlebars.helper('renderDeviceClass', function(deviceClass, device, options) {
        Ember.Handlebars.helper('renderActionClass', function(deviceClass, options) {
            var success = null;


            // Very badass Hacks, don't know how it works but it works
            options.types[0] = "STRING";
            options.contexts[1] = deviceClass;

            try {
                success = Ember.Handlebars.helpers.render.call(this, deviceClass.renderAction, '', options);
            } catch(err) {
                console.log("renderActionDeviceClass-Helper: Can't find '" + deviceClass.renderAction + "' target");
            }
            return success;
        });
    });