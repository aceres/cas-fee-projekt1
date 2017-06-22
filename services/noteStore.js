const Datastore = require('nedb');
const db = new Datastore({ filename: './data/note.db', autoload: true });

function publicAddOrder(pizzaName, orderedBy, callback)
{
    let order = new Order(pizzaName, orderedBy);
    db.insert(order, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, doc) {
        publicGet(id,callback);
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
    callback( err, doc);
});
}

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddOrder, delete : publicRemove, get : publicGet, all : publicAll};