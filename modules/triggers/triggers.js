/*var assert = require("assert"),
    Device = require("./libs/Device.js"),
    DeviceType = require("./libs/DeviceType.js"),
    events = require('events'),
    deviceClasses = require('require-all')(__dirname + '/classes');
*/

var assert = require("assert"),
    events = require('events');

var io,
    mgs,
    triggerSchema,
    push = new events.EventEmitter(),
    triggers = {

        triggerTypes: [],
        event: new events.EventEmitter(),


        init: function() {
            var self = this;

            push.on('triggerlist updated', function() {
                self.sendTriggerList();
            });

            // Socket-Events to Frontend
            io.sockets.on('connection', function(socket) {

                // Event Handlers for Frontend
                socket.on('main/triggers/list', function() {
                    self.sendTriggerList();
                });

                socket.on('main/triggers/delete', function(triggerid) {
                    self.deleteTriggerById(triggerid);
                });

                socket.on('main/trigger/info', function(id) {
                    self.triggerInfo(id);
                });

                /*
                socket.on('main/devices/listbyids', function(ids) {
                    self._listByIds(ids);
                });



                socket.on('main/devices/listtypes', function() {
                    self.getDeviceTypes(function(err, items) {
                        console.log(items);
                        if(!err) {
                            io.sockets.emit('main/devices/listtypes', JSON.stringify(items));
                        }
                    });
                });
                */
            });
        },

        triggerInfo : function(id){
            this.findById(id, function(err, trigger){
                io.sockets.emit('main/trigger/info', JSON.stringify(trigger));
            });
        },

        sendTriggerList: function() {
            this.getAll(function(err, items) {
                if(!err) {
                    io.sockets.emit('main/triggers/list', JSON.stringify(items));
                    io.sockets.emit('main/triggers/list/update', JSON.stringify(items));
                }
            });
        },

        getAll : function(callback) {
            triggerModel.find(function(err, items) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                }
                else if (callback)
                    callback(null, items);
            });
        },

        addAndSave: function(trigger, callback) {
            var newTrigger = new triggerModel({ trigger: trigger });
            var error = new Error('Cant save trigger');

            newTrigger.save(function(err, item) {
                if(err){
                    console.log(error);
                    if(callback) callback(error);
                }
                else {
                    //push.emit('devicelist updated');
                    if(callback) callback(null, item);
                }
            });
        },

        findAll: function(params, callback) {
            triggerModel.find(params, function(err, items) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                } else if(callback)
                    callback(null, items);
            });
        },

        deleteTriggerById: function(triggerid, callback) {
            this.findById(triggerid, function(err, item) {
                if(err) {
                    if(callback) callback(err);
                }
                else if(item) {
                    item.remove(function() {
                        console.log('JOOOOP');
                        push.emit('triggerlist updated');
                        if(callback) callback(null);
                    });
                }
            })
        },

        findById: function(triggerid, callback) {
            triggerModel.findOne({ _id : triggerid }, function(err, item) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                } else if(callback)
                    callback(null, item);
            });
        }

        /*
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

        findByIdArray: function(id_array, callback) {
            this.find({
            }, function(err, docs){
                console.log
            });


            for(var itemkey in id_array){
                var key = id_array[itemkey];

                this.findOne(key, function(err, item){
                    //console.log(item[0]._id);
                    console.log('=========');
                    array.push(item);
                    callback();
                },function(callback){
                    console.log('=========');
                    console.log(array);
                    console.log('=========');
                });
            }
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
        */
}

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");

    io = imports.server.io;
    mgs = imports.db.mongoose;

    triggerSchema = new mgs.Schema({
        trigger: 'Mixed'
    });

    triggerModel = mgs.model('Trigger', triggerSchema, 'triggers');
    triggers.init();

    register(null, {
        "triggers" : triggers
    });
}