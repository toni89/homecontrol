var ip = require("ip"),
    server = ip.address(),
    port = 8000;


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
            "title" : "Homecontrol",
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
    },

    // db
    {
        "packagePath" : "./modules/db",
        "database" : "homecontrol"
    },

    // gpio
    {
        "packagePath" : "./modules/gpio"
    }
]