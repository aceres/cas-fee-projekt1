const Datastore = require('nedb');
const db = new Datastore({ filename: './data/note.db', autoload: true });

class Note {

    constructor(title, description, finishDate, createdDate, importance, finished) {

        this.title = title;
        this.description = description;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.importance = importance;
        this.finished = finished;
    }
}

function publicAddNote(note) {

    note = new Note(note.title, note.description, note.finishDate, note.createdDate, note.importance, note.finished);
    db.insert(note, function(err, newDoc){});
}

function publicRemoveNote(id, callback) {

    db.remove({_id: id}, callback);
}

function publicUpdateNote(note, callback) {

    db.update({_id: note.id}, {$set: {title: note.title, description: note.description, finishDate: note.finishDate, createdDate: note.createdDate, importance: note.importance}}, {}, callback);
}

function publicCheckNote(id, finished, callback) {

    db.update({_id: id}, {$set: {finished: finished}}, {}, callback);
}

function publicGetNote(id, callback) {

    db.findOne({ _id: id}, function (err, doc) {
        callback(err, doc);
    });
}

function publicGetAllNote(callback) {

    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {
    add : publicAddNote,
    check: publicCheckNote,
    update: publicUpdateNote,
    delete : publicRemoveNote,
    get : publicGetNote,
    all : publicGetAllNote
};