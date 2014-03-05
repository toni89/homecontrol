module.exports = {
    "main" : function(tpl, meta, req, res, next) {
        tpl.parse("PAGE", "main.tpl");
        tpl.template("index.tpl");
    },
    "login" : function(tpl, meta, req, res, next) {
        meta.title("Login");
        tpl.template("login.tpl");
    },
    "settings" : function(tpl, meta, req, res, next) {
        meta.title("Settings");
        tpl.parse("PAGE", "settings.tpl");
        tpl.template("index.tpl");
    },
    "gpio" : function(tpl, meta, req, res, next) {
        meta.title("GPIO");
        tpl.parse("PAGE", "gpio.tpl");
        tpl.template("index.tpl");
    }
}
