module.exports = {
    "main" : function(tpl, meta, req, res, next) {
        tpl.parse("PAGE", "main.tpl");
        tpl.template("index.tpl");
    },
    "tarif" : function(tpl, meta, req, res, next) {
        meta.title("tarife");
        tpl.parse("PAGE", "tarif.tpl");
        tpl.template("index.tpl");
    }
}
