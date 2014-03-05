var fs = require("fs"),
    path = require("path"),
    architect = require("architect");

// Load default configuration
config = architect.loadConfig(path.join(__dirname, "config.js"));

// Load plugin configuration
var pluginPath,
    plugins = fs.readdirSync("./plugins");

for(var i in plugins) {
    pluginPath =  path.join(__dirname, "plugins/" + plugins[i] + "/config.js");
    if (fs.existsSync(pluginPath)){
        config = config.concat(architect.loadConfig(pluginPath));
    }
}

// Load plugins and start application
architect.createApp(config, function(err, app) {
    if(err) throw(err);
    console.log("app ready");
});
