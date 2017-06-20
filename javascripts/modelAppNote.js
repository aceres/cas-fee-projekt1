// Class
class Note {
    constructor(id, title, description, finishDate, createdDate, importance, finished) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.importance = importance;
        this.finished = finished;
    }
}

class NoteStorage extends Note {

    constructor(id, title, description, finishDate, createdDate, importance, finished) {
        super(id, title, description, finishDate, createdDate, importance, finished)
    }

    addNote(note) {

        let jsonLocalStorage = modelNoteProApplication.getDataLocalStorage();
        jsonLocalStorage.appNote.push(note);
        modelNoteProApplication.updateDataLocalStorage(jsonLocalStorage);
    }

    updateNote(note) {

        let jsonLocalStorage = modelNoteProApplication.getDataLocalStorage();
        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == note.id) {
                entry.title = note.title;
                entry.description = note.description;
                entry.importance = note.importance
                entry.finishDate = note.finishDate;
            }
        });
        modelNoteProApplication.updateDataLocalStorage(jsonLocalStorage);
    }

    deleteNote(note) {

        let jsonLocalStorage = modelNoteProApplication.getDataLocalStorage();
        for (let i=0; i < jsonLocalStorage.appNote.length; i++){
            if(jsonLocalStorage.appNote[i].id == note.id){
                jsonLocalStorage.appNote.splice(i,1);
            }
        }
        modelNoteProApplication.updateDataLocalStorage(jsonLocalStorage);
        router.navigateTo("index.html");
    }

    getDetailNote(id) {

        let jsonLocalStorage = modelNoteProApplication.getDataLocalStorage();

        if (id != 0) {

            let objNote = jsonLocalStorage.appNote.filter(function (entry) {
                return entry.id == id;
            });

            return objNote[0];
        }
    }

    checkNoteAsFinished(note) {

        let jsonLocalStorage = modelNoteProApplication.getDataLocalStorage();
        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == note.id && entry.finished == false) {
                entry.finished = true;
            } else if (entry.id == note.id && entry.finished == true) {
                entry.finished = false;
            }
        });

        modelNoteProApplication.updateDataLocalStorage(jsonLocalStorage);
        router.reload();
    }
}

// Revealing Module Pattern
let modelNoteProApplication = {};

if (typeof modelNoteProApplication === "undefined") {
    let modelNoteProApplication = {};
}

modelNoteProApplication = (function() {

    "use strict";

    let initializeSampleData = function() {

        const dataNote = {
            "appNote": [
                {
                    "id": 1,
                    "title": "UI testen",
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
                    "importance": 2,
                    "createdDate": 1489017600000,
                    "finishDate": 1492732800000,
                    "finished": true
                },
                {
                    "id": 2,
                    "title": "Hausaufgaben machen",
                    "description": "Hier wird die genaue Beschreibung gemacht.",
                    "importance": 5,
                    "createdDate": 1489017600000,
                    "finishDate": 1489017600000,
                    "finished": true
                },
                {
                    "id": 3,
                    "title": "Für die Prüfung lernen",
                    "description": "2. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
                    "importance": 1,
                    "createdDate": 1489017600000,
                    "finishDate": 1492732800000,
                    "finished": false
                },
                {
                    "id": 4,
                    "title": "Priorität 1: HTML umsetzen",
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
                    "importance": 3,
                    "createdDate": 1489017600000,
                    "finishDate": 1492732800000,
                    "finished": false
                },
                {
                    "id": 5,
                    "title": "Dozent fragen",
                    "description": "Da wird die ungenaue Beschreibung vorgestellt.",
                    "importance": 4,
                    "createdDate": 1489017600000,
                    "finishDate": 1495238400000,
                    "finished": true
                }
            ]
        };
        localStorage.setItem('localDataNote', JSON.stringify(dataNote));
        modelNoteProApplication.sessionKey("showCheckedNotesOnly", false, "set");
        return dataNote;
    }

    let updateDataLocalStorage = function(jsonLocalStorage) {

        localStorage.setItem('localDataNote', JSON.stringify(jsonLocalStorage));
    }

    let getMaxId = function() {

        let jsonLocalStorage = getDataLocalStorage();
        let maxId = jsonLocalStorage.appNote.reduce(function(prev, current) {
            if (+current.id > +prev.id) {
                return current;
            } else {
                return prev;
            }
        });
        return maxId.id+1
    }

    function saveNote(title, description, selectedDate, importance) {

        let id = getMaxId();
        let finishDate = new Date(selectedDate).valueOf();
        let createdDate = new Date().valueOf();

        let addNote = new NoteStorage(id, title, description, finishDate, createdDate, importance, false);
        addNote.addNote(addNote);
    }

    function getDetailNote() {

        let id = getId("id");
        let detailNote = new NoteStorage(id);
        return detailNote.getDetailNote(id);
    }

    function updateNote(id, title, description, importance, finishDate, createdDate, finish) {

        let updateNote = new NoteStorage(id, title, description, finishDate, createdDate, importance, finish)
        updateNote.updateNote(updateNote)
    }

    function deleteNote() {

        let id = getId("id");
        let deleteNote = new NoteStorage(id);
        deleteNote.deleteNote(deleteNote)
    }

    function checkNoteAsFinished(id) {

        let checkNoteAsFinished = new NoteStorage(id);
        checkNoteAsFinished.checkNoteAsFinished(checkNoteAsFinished);
    }

    function getId(id) {

        let query = window.location.search.substring(1);
        let vars = query.split("&");

        for (let i=0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == id) {
                return pair[1];
            }
        }
        return(false);
    }

    function clearDataLocalStorage() {

        localStorage.clear();
        router.navigateTo("index.html");
    }

    function getDataLocalStorage() {

        let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));
        return jsonLocalStorage;
    }

    function sessionKey(sessionId, flag, behaviour) {

        if (behaviour === "set") {
            window.sessionStorage[sessionId] = flag;
        } else {
            return window.sessionStorage[sessionId];
        }
    }

    return {
        initializeSampleData: initializeSampleData,
        updateDataLocalStorage: updateDataLocalStorage,
        clearDataLocalStorage: clearDataLocalStorage,
        getDataLocalStorage: getDataLocalStorage,
        saveNote: saveNote,
        getId: getId,
        getDetailNote: getDetailNote,
        updateNote: updateNote,
        deleteNote: deleteNote,
        checkNoteAsFinished: checkNoteAsFinished,
        sessionKey: sessionKey
    };
})();



