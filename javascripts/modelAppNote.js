let modelNoteProApplication = {};

// We need to do a check before we create the namespace
if (typeof modelNoteProApplication === "undefined") {
    let modelNoteProApplication = {};
}

/* Revealing Module Pattern */
modelNoteProApplication = (function() {

    "use strict";

    $(function () {
        // The DOM is ready!
        // Here is model from MVC only / no needed to have contact with DOM directly
    });

    // Get local storage
    let fetchDataLocalStorage = function() {

        let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));
        return jsonLocalStorage;
    }

    // Update local storage
    let updateDataLocalStorage = function(jsonLocalStorage) {

        localStorage.setItem('localDataNote', JSON.stringify(jsonLocalStorage));
    }

    // Set new ID for creating new note
    let maxId = function() {

        let jsonLocalStorage = modelNoteProApplication.fetchDataLocalStorage();

        // TODO: Refactor
        let maxId = jsonLocalStorage.appNote.reduce(function(prev, current) {
            if (+current.id > +prev.id) {
                return current;
            } else {
                return prev;
            }
        });
        return maxId.id+1
    }

    // Create Note
    function saveNote(title, description, selectedDate, importance) {

        let id = modelNoteProApplication.maxId();
        let defineAsDate = new Date(selectedDate);
        let formatDate = defineAsDate.valueOf();
        let newDate = new Date();

        let newNote = {
            id: id,
            title: title,
            description: description,
            importance: importance,
            createdDate: newDate.valueOf(),
            finishDate: formatDate,
            finished: false
        }

        let jsonLocalStorage = modelNoteProApplication.fetchDataLocalStorage();
        jsonLocalStorage.appNote.push(newNote);

        updateDataLocalStorage(jsonLocalStorage);
    }

    // Get detail note
    function loadDetailNote() {

        let id = modelNoteProApplication.getId("id");

        if (id != 0) {

            let jsonLocalStorage = modelNoteProApplication.fetchDataLocalStorage();

            let objNote = jsonLocalStorage.appNote.filter(function (entry) {
                return entry.id == id;
            });

            // TODO: Refactor
            return objNote[0];
        }
    }

    // Update Note
    function updateNote(id, title, description, finishDate, importance) {

        let jsonLocalStorage = modelNoteProApplication.fetchDataLocalStorage();

        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == id) {
                entry.title = title;
                entry.description = description;
                entry.finishDate = finishDate;
                entry.importance = importance
            }
        });

        updateDataLocalStorage(jsonLocalStorage);
    }

    // Delete Note
    function deleteNote() {

        let id = modelNoteProApplication.getId("id");
        let jsonLocalStorage = modelNoteProApplication.fetchDataLocalStorage();

        for (let i=0; i < jsonLocalStorage.appNote.length; i++){
            if(jsonLocalStorage.appNote[i].id == id){
                jsonLocalStorage.appNote.splice(i,1);
            }
        }

        updateDataLocalStorage(jsonLocalStorage);
        router.navigateTo("index.html");
    }

    // Mark Note as finished only
    function checkNoteAsFinished(id) {

        let jsonLocalStorage = modelNoteProApplication.fetchDataLocalStorage();

        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == id && entry.finished == false) {
                entry.finished = true;
            } else if (entry.id == id && entry.finished == true) {
                entry.finished = false;
            }
        });

        updateDataLocalStorage(jsonLocalStorage);
        router.reload();
    }

    // Get Id from the URL
    function getId(nodeId) {

        let query = window.location.search.substring(1);
        let vars = query.split("&");

        for (let i=0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == nodeId) {
                return pair[1];
            }
        }

        return(false);
    }

    return {
        fetchDataLocalStorage: fetchDataLocalStorage,
        updateDataLocalStorage: updateDataLocalStorage,
        maxId: maxId,
        saveNote: saveNote,
        loadDetailNote: loadDetailNote,
        updateNote: updateNote,
        deleteNote: deleteNote,
        checkNoteAsFinished: checkNoteAsFinished,
        getId: getId
    };

    // Exposed API facilities
    //export default { createNote, updateNote };
})();



