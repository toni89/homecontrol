var assert = require("assert"),
    crypto = require("crypto"),
    moment = require("moment");


var io,
    mgs,
    timeFormat = "DD-MM-YYYY HH:mm:ss",
    lifetime = 0,
    userSchema,
    User,
    sessions = [],
    user = {
    "login" : function(name, password, callback) {
        User.findOne({ name: name}, function(error, data) {
            if(!data) {
                if(callback)
                    callback(new Error("user not found"), null);
            }else {
                if(data.password == password){
                    var session = createSession(name);

                    if(callback)
                        callback(null, session);
                } else {
                    if(callback)
                        callback(new Error("password is wrong"), null);
                }
            }
        });
    },
    "logout" : function(sessionid) {
        console.log(sessionid);

        var session = sessions.filter(function(s) {
            return s.sessionid == sessionid;
        });

        var index = sessions.indexOf(session);
        console.log("Index: " + index );
    },
    "getSession" : function() {

    },
    "checkTimeout" : function(name) {
        var diff = 0,
            now = moment().format(timeFormat);

        sessions.forEach(function(session) {
            if(session.name == name) {
                diff = moment(now, timeFormat).diff(moment(session.lastSeenAt, timeFormat), 'seconds');
                if(diff > lifetime)
                    user.logout(session.sessionid);
                else
                    session.lastSeenAt = now;
            }
        });
    },
    "add" : function(name, password) {

    },
    "remove" : function(name) {

    }
};

var createSession = function(name) {
    var sessionExists = sessions.filter(function(s) {
        return s.name == name;
    });

    if(sessionExists.length == 0) {
        var sessionid = crypto.createHash('md5').update(Math.random().toString() + name).digest("hex");

        var session = {
            sessionid: sessionid,
            name: name,
            lastSeenAt: moment().format(timeFormat)
        };

        sessions.push(session);

        return session;
    }

    return sessionExists[0];
};



module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");
    assert(options.defaultUser, "Option 'defaultUser' is required");
    assert(options.failureRoute, "Option 'failureRoute' is required");
    assert(options.lifetime, "Option 'lifetime' is required");

    io = imports.server.io;
    mgs = imports.db.mongoose;
    lifetime = options.lifetime;

    // Create Schema
    userSchema = new mgs.Schema({
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }, {collection: "users" });

    User  = mgs.model('User', userSchema);


    // Add defaultUser if not exists
    User.findOne({ name: options.defaultUser.name }, function(error, data) {
        if(!data) {
            var defaultUser = new User({
                name: options.defaultUser.name,
                password: options.defaultUser.password
            });
            defaultUser.save();
        }
    });

    // Connect to socket.io
    io.sockets.on('connection', function(socket) {

        socket.on('user login', function(data) {
            user.login(data.name, data.password, function(error, myuser) {
                var message = null;
                if(error)
                    message = error.message;
                socket.emit("user login", message, myuser);
            });
        });

        socket.on("user logout", function(data) {
            user.logout(data.sessionid, function(error) {
                var message = null;
                if(error)
                    message = error.message;
                socket.emit("user logout", message);
            });
        });

    });

    register(null, {
        "user" : user
    });
}