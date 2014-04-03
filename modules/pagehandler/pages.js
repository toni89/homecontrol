module.exports = {
    "main" : function(tpl, meta, req, res, next) {
        //tpl.parse("PAGE", "main.tpl");
        tpl.template("index.html");
    }
}
