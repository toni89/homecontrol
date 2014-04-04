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

    //sqldb
    /*{
        "packagePath" : "./modules/mysql"
    },*/

    //gpio
    {
        "packagePath" : "./modules/gpio"
    },

    // user
    {
        "packagePath" : "./modules/user",
        "defaultUser" : {
            "name" : "admin",
            "password" : "admin"
        },
        "failureRoute" : "/login",
        "lifetime" : "600"  // Logouts after 10 minutes
    }
]