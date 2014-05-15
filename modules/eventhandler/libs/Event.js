function Event() {
    this.name = '';
    this.active = true;
    this.actions = [];
    this.terms = [];
}

Event.prototype.addAction = function(action) {
    this.actions.push(action);
};

Event.prototype.addTerm = function(term) {
    this.terms.push(term);
};

module.exports = Event;