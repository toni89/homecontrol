App.reopen({
    JSONable: Ember.Mixin.create({
        getJSON: function() {
            var v, json = {};
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    v = this[key];
                    if (v === 'toString') {
                        continue;
                    }
                    if (Ember.typeOf(v) === 'function') {
                        continue;
                    }
                    if (App.JSONable.detect(v))
                        v = v.getJson();
                    json[key] = v;
                }
            }
            return json;
        }
    })
});