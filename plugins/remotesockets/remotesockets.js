var assert = require("assert");

var io,
    devices,
    deviceType,
    mgs,
    socketSchema,
    mgsSocket;


var getSocketList = function(callback) {
    mgsSocket.find(function(err, socketList) {
        if(err) console.log(err);
        callback(socketList);
    });
};

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.devices, "Package 'devices' is required");
    assert(imports.db, "Package 'db' is required");

    io = imports.server.io;
    devices = imports.devices;
    mgs = imports.db.mongoose;

    // Mongoose Schemata
    socketSchema = new mgs.Schema({
        name: { type: String, required: true, unique: true },
        code: String
    }, {collection: "remotesockets_socket" });

    mgsSocket = mgs.model('Socket', socketSchema);


    deviceType = devices.createDeviceType({
        name: 'remotesocket',
        displayName: 'Remotesockets'
    });

    devices.addDeviceType(deviceType);

    io.sockets.on('connection', function(socket) {

        socket.on('p/remotesockets/list', function() {
            getSocketList(function(socketList) {
                socket.emit('p/remotesockets/list', JSON.stringify(socketList));
            });
        });


        // Socket Actions
        socket.on('p/remotesockets/socket/trigger', function(socketId) {
            console.log('  > Remotesocket mit der ID ' + socketId + ' wurde getriggert');
        });

        socket.on('p/remotesockets/socket/info', function(socketId) {
            mgsSocket.findOne({ _id: socketId }, function(err, socketData){
                if(err) console.log(err);
                else
                    socket.emit('p/remotesockets/socket/info', JSON.stringify(socketData));
            });
        });

        socket.on('p/remotesockets/socket/create', function(rsocket) {
            var newSocket = new mgsSocket({ name: rsocket.name, code: rsocket.code });


            newSocket.save(function(err) {
                if(err) throw err;
                else {
                    var device = devices.createDevice({
                        name: '',
                        description: '433Mhz Socket',
                        type: deviceType,
                        typeData: {
                            name: rsocket.name,
                            code: rsocket.code
                        }
                    });

                    devices.addAndSave(device);

                    getSocketList(function(socketList) {
                        io.sockets.emit('p/remotesockets/list', JSON.stringify(socketList));
                    });
                }
            });
        })

        socket.on('p/remotesockets/socket/delete', function(socketId) {
            console.log(socketId);

            mgsSocket.findByIdAndRemove(socketId, function(error, deletedItem) {
                if(error) console.log(error);
                else
                    getSocketList(function(socketList) {
                        io.sockets.emit('p/remotesockets/list', JSON.stringify(socketList));
                    });
            });
        });

    });

    register();
}