var server = "localhost",
    http_port = 8000,
    rest_port = 8001;


module.exports = [

    /* *********** Modules *********** */

    // template
    {
        "packagePath" : "./modules/template",
        "templateDirectory" : __dirname + "/www/templates",
        "default" : {
            "BASEDIR" : "http://" + server + ":" + http_port
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

    // resthandler
    {
        "packagePath" : "./modules/resthandler"
    },

    // server
    {
        "packagePath" : "./modules/server",
        "http" : {
            server: server,
            port: http_port
        },
        "rest" : {
            server: server,
            port: rest_port
        }
    },

    // db
    {
        "packagePath" : "./modules/db",
        "database" : "homecontrol"
    },

    // devices
    {
        "packagePath" : "./modules/devices"
    },

    //gpio
    /*{
        "packagePath" : "./modules/gpio"
    },*/

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