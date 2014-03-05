module.exports = {
    "main" : function(tpl, meta, req, res, next) {
        tpl.parse("PAGE", "main.tpl");
        tpl.template("index.tpl");
    },
    "settings" : function(tpl, meta, req, res, next) {
        meta.title("Settings");
        tpl.parse("PAGE", "settings.tpl");
        tpl.template("index.tpl");
    }
}
