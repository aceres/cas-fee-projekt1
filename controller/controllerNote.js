const storage = require("../services/noteStorage.js");
let Note = require("../model/modelNote.js");

module.exports.showIndex = function(req, res) {

    storage.all(function (err, notes) {
        res.json(notes || {});
    });
};

module.exports.addNote = function(req, res) {

    let note = new Note(
        req.body.note.title,
        req.body.note.description,
        req.body.note.finishDate,
        req.body.note.createdDate,
        req.body.note.importance,
        false
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
        req.body.note.title,
        req.body.note.description,
        req.body.note.finishDate,
        req.body.note.createdDate,
        req.body.note.importance);
    note.id = req.body.note.id;
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