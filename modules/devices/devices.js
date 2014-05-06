var assert = require("assert"),
    Device = require("./libs/Device.js"),
    DeviceType = require("./libs/DeviceType.js"),
    events = require('events'),
    deviceClasses = require('require-all')(__dirname + '/classes');

var io,
    mgs,
    deviceSchema,
    deviceModel,
    push = new events.EventEmitter(),
    devices = {

        deviceTypes: [],
        event: new events.EventEmitter(),


        init: function() {
            var self = this;

            // Socket-Events to Frontend
            io.sockets.on('connection', function(socket) {

                // Push Events
                push.on('devicelist updated', function() {
                    self._sendDeviceList();
                });

                // Event Handlers for Frontend
                socket.on('main/devices/list', function() {
                    self._sendDeviceList();
                });

                socket.on('main/devices/listbyids', function(ids) {

                    console.log('===');
                    console.log(ids);
                    console.log('===');

                    self._listByIds(ids);
                });

                socket.on('main/devices/delete', function(deviceid) {
                    self.deleteDeviceById(deviceid);
                });

                socket.on('main/devices/listtypes', function() {
                    self.getDeviceTypes(function(err, items) {
                        console.log(items);
                        if(!err) {
                            io.sockets.emit('main/devices/listtypes', JSON.stringify(items));
                        }
                    });
                });
            });
        },

        _listByIds : function(ids){

            ids = JSON.parse(ids);

            for(var itemkey in ids){
                var deviceid = ids[itemkey];

                console.log(deviceid);

                this.findById(deviceid, function(err, item) {

                    console.log('===');
                    console.log(item);
                    console.log('===');

                });

            }
        },

        _sendDeviceList: function() {
            this.getAll(function(err, items) {
                if(!err) {
                    io.sockets.emit('main/devices/list', JSON.stringify(items));
                }
            });
        },

        addAndSave: function(device, callback) {

            if(device.type != '' && device.typeData != null) {

                var newDevice = new deviceModel({ device: device });
                var error = new Error('Cant save device');

                newDevice.save(function(err, item) {
                    if(err){
                        console.log(error);
                        if(callback) callback(error);
                    }
                    else {
                        push.emit('devicelist updated');
                        if(callback) callback(null, item);
                    }

                });
            }
        },

        deleteDeviceById: function(deviceid, callback) {
            this.findById(deviceid, function(err, item) {
                if(err) {
                    if(callback) callback(err);
                }
                else if(item) {
                    item.remove(function() {
                        push.emit('devicelist updated');
                        if(callback) callback(null);
                    });
                }
            })
        },

        findById: function(deviceid, callback) {
            deviceModel.findOne({ _id : deviceid }, function(err, item) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                } else if(callback)
                    callback(null, item);

            });
        },

        findByType: function(type, callback) {


        },

        findOne: function(params, callback) {
            deviceModel.findOne(params, function(err, item) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                } else if(callback)
                    callback(null, item);
            });
        },

        findAll: function(params, callback) {
            deviceModel.find(params, function(err, items) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                } else if(callback)
                    callback(null, items);
            });
        },

        update: function(deviceid, device) {

        },

        getAll : function(callback) {
            deviceModel.find(function(err, items) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                }
                else if (callback)
                    callback(null, items);
            });
        },

        createDevice : function(options) {
            var newDevice = new Device();
            if(options)
                newDevice.extend(options);
            return newDevice;
        },

        createDeviceType : function(options) {
            var newType = new DeviceType();
            if(options)
                newType.extend(options);
            return newType;
        },

        setStatus: function(deviceid, status, callback) {
            this.findById(deviceid, function(err, item) {
                if(err )
                    if(callback) callback(new Error('Cant find deviceid'));
                else if(item) {
                    item.status = status;
                    item.save(function(err, item) {
                        if(err)
                            if(callback) callback(new Error('Cant update device'));
                        else if(callback)
                            callback(null);
                    });
                }
            });
        },

        setInactive: function(deviceid, callback) {
            this.setStatus(deviceid, 'inactive', function(err) {
                if(err)
                    if(callback) return callback(err);
                else if(callback) return callback(null);
            });
        },

        setActive: function(deviceid, callback) {
            this.setStatus(deviceid, 'active', function(err) {
                if(err)
                    if(callback) return callback(err);
                else if(callback) return callback(null);
            });
        },

        addDeviceType: function(type, callback) {
            var found = false;

            this.deviceTypes.forEach(function(item) {
                if(item.name == type.name){
                    found = true;
                    if(callback)
                        callback(new Error('DeviceType already exists'));
                }

            });

            if(!found) {
                this.deviceTypes.push(type);
                if(callback)
                    callback(null);
            }

        },

        getDeviceTypes: function(callback) {
            if(callback) callback(null, this.deviceTypes);
        },

        getDeviceClass: function(className) {
            return new deviceClasses[className];
        },

        configDeviceClass: function(className, options) {
            var deviceClass = this.getDeviceClass(className);

            if(deviceClass && options) {
                return deviceClass.extend(options);
            }
        },

        hasDeviceClass: function(deviceId, className, callback) {
            this.findById(deviceId, function(err, item) {
                if(item) {
                    if(item.device.classes.length > 0) {
                        var found = item.device.classes.filter(function(el) {
                            return el.id == className;
                        });

                        if(found.length > 0){
                            if(callback)
                                return callback(true);
                        }
                    }
                }
                if(callback)
                    return callback(false);

            })
        }

}


module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");

    io = imports.server.io;
    mgs = imports.db.mongoose;

    deviceSchema = new mgs.Schema({
        device: 'Mixed'
    });

    deviceModel = mgs.model('Device', deviceSchema, 'devices');

    devices.init();

    register(null, {
        "devices" : devices
    });
}