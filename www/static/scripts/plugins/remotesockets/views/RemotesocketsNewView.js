define(
[
    "hbs!plugins/remotesockets/templates/RemotesocketsNewTemplate",
    "jquery.icheck"
],
function(RemotesocketsNewTemplate) {

    return Ember.View.extend({
        defaultTemplate: RemotesocketsNewTemplate,

        didInsertElement: function() {

            // Checkboxes
            $(".icheck-blue").iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue'
            });
        }
    });
});

