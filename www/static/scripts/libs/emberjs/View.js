Ember.View.reopen({
    didInsertElement : function(){
        this._super();
        Ember.run.scheduleOnce('afterRender', this, this.afterRender);
    },
    afterRender : function(){

    }
});