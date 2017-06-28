const Datastore = require('nedb');
const db = new Datastore({
    filename: './data/note.db',
    autoload: true
});

function publicAddNote(note) {

    db.insert(note, function(err, newDoc){});
}

function publicRemoveNote(id, callback) {

    db.remove({_id: id}, callback);
}

function publicUpdateNote(note) {

    db.update({_id: note.id}, {$set: note.toJSON()}, function(err, numReplaced, newDoc){});
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