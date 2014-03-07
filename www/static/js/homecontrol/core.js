(function(app){
    app.socket = io.connect('http://localhost');


}(this.Homecontrol = this.Homecontrol || {}));


(function(app){

    var session = null,
        socket = Homecontrol.socket;

    socket.on("user login", function(error, data) {
        if(data)
            session = data;

        console.log(session);

        if(app.loginCallback)
            app.loginCallback(error, data);
    });

    socket.on("user logout", function(error, data) {
        session = null;

        console.log(session);

        if(app.logoutCallback)
            app.logoutCallback(error, data);
    });


    app.login = function(name, password, callback) {
        if(callback)
            app.loginCallback = callback;
        socket.emit("user login", { name: name, password: password});
    };

    app.logout = function(callback) {
        if(callback)
            app.logoutCallback = callback;

        console.log(session);

        socket.emit("user logout", { sessionid: session });
    };

}(this.Usermanager = this.Usermanager || {}));