var server = "localhost",
    port = 8000,
    restport = 8001;


module.exports = [

    /* *********** Modules *********** */

    // template
    {
        "packagePath" : "./modules/template",
        "templateDirectory" : __dirname + "/www/templates",
        "default" : {
            "BASEDIR" : "http://" + server + ":" + port
        }
    },

    // meta
    {
        "packagePath" : "./modules/meta",
        "default" : {
            "title" : "MyPage",
            "description" : "Pagedescription",
            "keywords" : "Pagekeywords",
            "robots" : "index,follow"
        }
    },

    // pagehandler
    {
        "packagePath" : "./modules/pagehandler",
        "staticFiles" : __dirname + "/www/static"
    },

    // socket
    {
        "packagePath" : "./modules/server",
        "port" : port
    }
]