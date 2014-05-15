define(
    [
        "hbs!plugins/devices/templates/DSNewTemplate"
    ],
    function(DSNewTemplate) {
        return Ember.View.extend({
            defaultTemplate: DSNewTemplate,
            classNames: ['row', 'maincontent'],

            didInsertElement: function() {

                // Checkboxes
                $(".icheck-blue").iCheck({
                    checkboxClass: 'icheckbox_flat-blue',
                    radioClass: 'iradio_flat-blue'
                });
            }
        });
    });

