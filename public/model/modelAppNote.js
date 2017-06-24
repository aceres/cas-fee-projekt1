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

class NoteStorage {

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
let modelNoteProApplication = (function() {

    "use strict";

    const storage = new NoteStorage();

    sessionKey("showCheckedNotesOnly", false, "set");

    function updateDataLocalStorage(jsonLocalStorage) {

        localStorage.setItem('localDataNote', JSON.stringify(jsonLocalStorage));
    }

    function addNote(title, description, selectedDate, importance) {

        let finishDate = new Date(selectedDate).valueOf();
        let createdDate = new Date().valueOf();

        let addNote = new Note(id, title, description, finishDate, createdDate, importance, false);
        storage.addNote(addNote);
    }

    function getDetailNote() {

        let id = getId("id");
        return storage.getDetailNote(id);
    }

    function updateNote(id, title, description, importance, finishDate, createdDate, finish) {

        let updateNote = new Note(id, title, description, finishDate, createdDate, importance, finish)
        storage.updateNote(updateNote)
    }

    function deleteNote() {

        let id = getId("id");
        let deleteNote = new Note(id);
        storage.deleteNote(deleteNote)
    }

    function checkNoteAsFinished(id) {

        let checkNoteAsFinished = new Note(id);
        console.log("model checkNoteAsFinishe" , checkNoteAsFinished);
        storage.checkNoteAsFinished(checkNoteAsFinished);
    }

    function sessionKey(sessionId, flag, behaviour) {

        if (behaviour === "set") {
            window.sessionStorage[sessionId] = flag;
        } else {
            return window.sessionStorage[sessionId];
        }
    }

    // TODO: Noch einfacher
    // function sessionKey(sessionId, flag) {
    //
    //     if (flag) {
    //         window.sessionStorage[sessionId] = flag;
    //     } else {
    //         return window.sessionStorage[sessionId];
    //     }
    // }

    return {
        updateDataLocalStorage,
        addNote,
        getDetailNote,
        updateNote,
        deleteNote,
        checkNoteAsFinished,
        sessionKey
    };
})();



