var events = require('events'),
    OpenZWave = require('openzwave');

var userEvent = new events.EventEmitter();

module.exports = {
    zwave: null,
    nodes: [],
    debug: false,

    init: function(device, options, callback) {
        var self = this;

        self.nodes = [];
        self.zwave = new OpenZWave(device, options);

        // Basic Events
        self.zwave.on('driver ready', function(homeid) {
            if(self.debug)
                console.log("zwave: driver ready -> homeid: 0x" + homeid.toString(16));
        });


        self.zwave.on('driver failed', function() {
            if(self.debug)
                console.log('zwave: failed to start driver');
            self.zwave.disconnect();
        });


        process.on('SIGINT', function() {
            self.zwave.disconnect();
            if(self.debug)
                console.log('zwave: connection closed');
        });

        // Node Events
        self.zwave.on('node added', function(nodeid) {
            self.nodes[nodeid] = {
                nodeid: '',
                manufacturer: '',
                manufacturerid: '',
                product: '',
                producttype: '',
                productid: '',
                type: '',
                name: '',
                loc: '',
                classes: {},
                ready: false
            };
            //self.zwave.setName(nodeid, 'LALA');
            userEvent.emit('node added', nodeid);
        });


        self.zwave.on('node ready', function(nodeid, nodeinfo) {
            //self.zwave.setLevel(nodeid, 0);

            self.nodes[nodeid]['nodeid'] = nodeid;
            self.nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
            self.nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
            self.nodes[nodeid]['product'] = nodeinfo.product;
            self.nodes[nodeid]['producttype'] = nodeinfo.producttype;
            self.nodes[nodeid]['productid'] = nodeinfo.productid;
            self.nodes[nodeid]['type'] = nodeinfo.type;
            self.nodes[nodeid]['name'] = nodeinfo.name;
            self.nodes[nodeid]['loc'] = nodeinfo.loc;
            self.nodes[nodeid]['ready'] = true;

            if(self.debug) {
                console.log('node%d: %s, %s', nodeid,
                    nodeinfo.manufacturer ? nodeinfo.manufacturer
                        : 'id=' + nodeinfo.manufacturerid,
                    nodeinfo.product ? nodeinfo.product
                        : 'product=' + nodeinfo.productid +
                        ', type=' + nodeinfo.producttype);
                console.log('node%d: name="%s", type="%s", location="%s"', nodeid,
                    nodeinfo.name,
                    nodeinfo.type,
                    nodeinfo.loc);
            }

            for (var comclass in self.nodes[nodeid]['classes']) {
                switch (comclass) {
                    case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                    case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                        self.zwave.enablePoll(nodeid, comclass);
                        break;
                }
                var values = self.nodes[nodeid]['classes'][comclass];

                if(self.debug) {
                    console.log('node%d: class %d', nodeid, comclass);
                    for (var idx in values)
                        console.log('node%d:   %s=%s', nodeid, values[idx]['label'], values[idx]['value']);
                }
            }

            userEvent.emit('node ready', nodeid, self.nodes[nodeid]);
        });


        self.zwave.on('value added', function(nodeid, comclass, value) {
            if (!self.nodes[nodeid]['classes'][comclass])
                self.nodes[nodeid]['classes'][comclass] = {};
            self.nodes[nodeid]['classes'][comclass][value.index] = value;

            userEvent.emit('value added', nodeid, comclass, value);
        });


        self.zwave.on('value changed', function(nodeid, comclass, value) {
            if (self.nodes[nodeid]['ready']) {
                if(self.debug) {
                    console.log('node%d: changed: %d:%s:%s->%s', nodeid, comclass,
                        value['label'],
                        self.nodes[nodeid]['classes'][comclass][value.index]['value'],
                        value['value']);
                }
            }
            self.nodes[nodeid]['classes'][comclass][value.index] = value;

            userEvent.emit('value changed', nodeid, comclass, value);
        });


        self.zwave.on('value removed', function(nodeid, comclass, index) {
            if (self.nodes[nodeid]['classes'][comclass] &&
                self.nodes[nodeid]['classes'][comclass][index])
                delete self.nodes[nodeid]['classes'][comclass][index];

            userEvent.emit('value removed', nodeid, comclass, index);
        });


        self.zwave.on('notification', function(nodeid, notif) {
            if(self.debug) {
                switch (notif) {
                    case 0:
                        console.log('node%d: message complete', nodeid);
                        break;
                    case 1:
                        console.log('node%d: timeout', nodeid);
                        break;
                    case 2:
                        console.log('node%d: nop', nodeid);
                        break;
                    case 3:
                        console.log('node%d: node awake', nodeid);
                        break;
                    case 4:
                        console.log('node%d: node sleep', nodeid);
                        break;
                    case 5:
                        console.log('node%d: node dead', nodeid);
                        break;
                    case 6:
                        console.log('node%d: node alive', nodeid);
                        break;
                }
            }

            userEvent.emit('notification', nodeid, notif);
        });


        self.zwave.on('scan complete', function() {
            userEvent.emit('scan complete');
        });


        if(callback)
            callback(null);
    },

    connect: function() {
        this.zwave.connect();
    },

    nodeAdded: function(callback) {
        var self = this;

        userEvent.on('node added', function(nodeid) {
            callback(nodeid, self.nodes[nodeid]);
        });
    },

    nodeReady: function(callback) {
        var self = this;

        userEvent.on('node ready', function(nodeid) {
            if(callback)
                callback(nodeid, self.nodes[nodeid]);
        });
    },

    valueAdded: function(callback) {
        var self = this;

        userEvent.on('value added', function(nodeid, comclass, value) {
            callback(nodeid, self.nodes[nodeid], comclass, value);
        });
    },

    valueChanged: function(callback) {
        var self = this;

        userEvent.on('value changed', function(nodeid, comclass, value) {
            callback(nodeid, self.nodes[nodeid], comclass, value);
        });
    },

    valueRemoved: function(callback)  {
        var self = this;

        userEvent.on('value removed', function(nodeid, comclass, value) {
            callback(nodeid, self.nodes[nodeid], comclass, value);
        });
    },

    notification: function(callback) {
        var self = this;

        userEvent.on('notification', function(nodeid, notification) {
            callback(nodeid, self.nodes[nodeid], notification);
        });
    },

    scanComplete: function(callback) {
        userEvent.on('scan complete', function() {
            callback();
        });
    },

    // Actions

    setName: function(nodeid, name) {
        // Limit: 16 chars
        this.zwave.setName(nodeid, name);
        if(this.debug)
            console.log('zwave: set nodes ' + nodeid + ' name to ' + name);
    },

    setLevel: function(nodeid, level) {
        if(level >= 0 && level <= 99)
            this.zwave.setLevel(nodeid, level);
    },

    setOn: function(nodeid) {
        this.zwave.switchOn(nodeid);
    },

    setOff: function(nodeid) {
        this.zwave.switchOff(nodeid);
    }

}