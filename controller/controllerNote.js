const storage = require("../services/noteStorage.js");

class Note {

    constructor(title, description, finishDate, createdDate, importance, finished) {

        this.id = void 0;
        this.title = title;
        this.description = description;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.importance = importance;
        this.finished = finished;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            finishDate: this.finishDate,
            createdDate: this.createdDate,
            importance: this.importance
        };
    }
}

module.exports.showIndex = function(req, res) {

    storage.all(function (err, notes) {
        res.json(notes || {});
    });
};

module.exports.addNote = function(req, res) {

    let note = new Note(
        req.body.title,
        req.body.description,
        req.body.finishDate,
        req.body.createdDate,
        req.body.importance,
        req.body.finished
    );
    storage.add(note);
    res.end();
};

module.exports.getNote = function(req, res) {

    storage.get(req.params.id, function(err, note) {
        res.json(note);
    });
};

module.exports.updateNote = function(req, res) {

    let note = new Note(
        req.body.title,
        req.body.description,
        req.body.finishDate,
        req.body.createdDate,
        req.body.importance);
    note.id = req.body.id;
    storage.update(note);
    res.end();
};

module.exports.checkNoteAsFinished = function(req, res) {

    storage.check(req.body.id, req.body.finished, function(err, note) {});
    res.end();
};

module.exports.deleteNote =  function (req) {

    storage.delete(req.params.id , function(err, note) {});
};