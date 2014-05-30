define(
    [

    ],
    function() {
        //Ember.Handlebars.helper('renderDeviceClass', function(deviceClass, device, options) {
        Ember.Handlebars.helper('renderDeviceClass', function(device, deviceClass, options) {
            var success = null;


            // Very badass Hacks, don't know how it works but it works
            options.types[0] = "STRING";
            var context = new Ember.Object();
            context.set('device', device);
            context.set('deviceClass', deviceClass);

            options.contexts[1] = context;

            try {
                success = Ember.Handlebars.helpers.render.call(this, deviceClass.render, '', options);
            } catch(err) {
                console.log("renderDeviceClass-Helper: Can't find '" + deviceClass.render + "' target");
            }
            return success;
        });
    });