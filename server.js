var path = require("path"),
    architect = require("architect"),
    config = architect.loadConfig(path.join(__dirname, "config.js"));
//look = require('look').start();

architect.createApp(config, function(err, app) {
    if(err) throw(err);
    console.log("app ready");
});