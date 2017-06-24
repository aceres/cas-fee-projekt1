const storage = require("../services/noteStorage.js");

module.exports.showIndex = function(req, res) {

    storage.all(function (err, notes) {
        res.json(notes || {});
    });
};

module.exports.addNote = function(req, res) {

    let note = {
        title: req.body.title,
        description: req.body.description,
        finishDate: req.body.finishDate,
        createdDate: req.body.createdDate,
        importance: req.body.importance,
        finished: req.body.finished
    };
    storage.add(note);
    res.end();
};

module.exports.getNote = function(req, res) {

    storage.get(req.params.id, function(err, note) {
        res.json(note);
    });
};

module.exports.updateNote = function(req, res) {

    let note = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        finishDate: req.body.finishDate,
        createdDate: req.body.createdDate,
        importance: req.body.importance
    };
    storage.update(note);
    res.end();
};

module.exports.checkNoteAsFinished = function(req, res) {

    storage.check(req.body.id, req.body.finished, function(err, note) {});
    res.end();
};

module.exports.deleteNote =  function (req, res) {

    storage.delete(req.params.id , function(err, note) {});
};