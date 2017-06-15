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
    });

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
            ],
            "styleSkin": {
                "name": "bgGrey"
            }
        };
        localStorage.setItem('localDataNote', JSON.stringify(dataNote));
        return dataNote;
    }

    // Update local storage
    let updateDataLocalStorage = function(jsonLocalStorage) {

        localStorage.setItem('localDataNote', JSON.stringify(jsonLocalStorage));
    }

    // Generate new ID for creating new note
    let maxId = function() {

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

    // M: Create
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

        let jsonLocalStorage = dataLocalStorage();
        jsonLocalStorage.appNote.push(newNote);

        updateDataLocalStorage(jsonLocalStorage);
    }

    // M: Get detail note
    function loadDetailNote() {

        let id = modelNoteProApplication.getId("id");
        let jsonLocalStorage = dataLocalStorage();

        if (id != 0) {

            let objNote = jsonLocalStorage.appNote.filter(function (entry) {
                return entry.id == id;
            });

            return objNote[0];
        }
    }

    // M: Update
    function updateNote(id, title, description, finishDate, importance) {

        console.log("id: ", id);
        console.log("title: ", title);
        console.log("description: ", description);
        console.log("finishDate:  ", finishDate);
        console.log("importance:  ", importance);

        let jsonLocalStorage = dataLocalStorage();
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

    // M: Delete
    function deleteNote() {

        let id = modelNoteProApplication.getId("id");

        let jsonLocalStorage = dataLocalStorage();
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

        let jsonLocalStorage = dataLocalStorage();
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

    // Clear Local Storage
    function clearDataLocalStorage() {

        localStorage.clear();
        router.navigateTo("index.html");
    }

    // Not public function
    function dataLocalStorage() {

        let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));
        return jsonLocalStorage;
    }

    // Public
    return {
        initializeSampleData: initializeSampleData,
        updateDataLocalStorage: updateDataLocalStorage,
        clearDataLocalStorage: clearDataLocalStorage,
        maxId: maxId,
        saveNote: saveNote,
        loadDetailNote: loadDetailNote,
        updateNote: updateNote,
        deleteNote: deleteNote,
        checkNoteAsFinished: checkNoteAsFinished,
        getId: getId
    };
})();



