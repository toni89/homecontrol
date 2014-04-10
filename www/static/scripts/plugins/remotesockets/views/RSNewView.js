define(
[
    "hbs!plugins/remotesockets/templates/RSNewTemplate",
    "jquery.icheck"
],
function(RSNewTemplate) {

    return Ember.View.extend({
        defaultTemplate: RSNewTemplate,

        didInsertElement: function() {

            // Checkboxes
            $(".icheck-blue").iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue'
            });
        }
    });
});

