App.reopen({
    RadioButton : Ember.Component.extend({
        tagName : "input",
        type : "radio",
        attributeBindings : [ "name", "type", "value", "class", "checked:checked" ],
        click : function() {
            this.set("selection", this.$().val());
        },
        checked : function() {
            return this.get("value") === this.get("selection");
        }.property('selection')
    })
});
Ember.Handlebars.helper('radio-button', App.RadioButton);