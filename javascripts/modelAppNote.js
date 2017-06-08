let noteProApplication = {};

// We need to do a check before we create the namespace
if (typeof noteProApplication === "undefined") {
    let noteProApplication = {};
}

/* Revealing Module Pattern */
noteProApplication = (function() {

    "use strict";

    // Initialize and register buttons
    const btnCreateNote = document.getElementById("btnCreateNote");
    const btnBackToList = document.getElementById("btnBackToList");
    const btnClearLocalStorage = document.getElementById("btnClearLocalStorage");

    /* Create Note */
    if (btnCreateNote) {
        btnCreateNote.addEventListener("click", function () {
            router.route("detailNote.html?id=0");
        });
    }

    /* List */
    if (btnBackToList) {
        btnBackToList.addEventListener("click", function () {
            router.route("index.html");
        });
    }

    /* Clear Local Storage */
    if (btnClearLocalStorage) {
        btnClearLocalStorage.addEventListener("click", function () {
            localStorage.clear();
            window.location.reload("index.html");
        });
    }

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

        let jsonLocalStorage = noteProApplication.fetchDataLocalStorage();

        // TODO: Define what reduce does!
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
    let createNote = function() {

        let id = noteProApplication.maxId();
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let selectedDate = document.getElementById("date").value;
        let defineAsDate = new Date(selectedDate);
        let formatDate = defineAsDate.valueOf();
        let newDate = new Date();

        // TODO: Valid Date
        if (title !== "" && description != "" && defineAsDate != "") {

            let newNote = {
                id: id,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                importance: $("input:radio[name=importance]:checked").val(),
                createdDate: newDate.valueOf(),
                finishDate: formatDate,
                finished: false
            }
            // Retrieve the object from the local storage to add a new note (new object)
            let jsonLocalStorage = noteProApplication.fetchDataLocalStorage();
            jsonLocalStorage.appNote.push(newNote);
            // Update the storage
            updateDataLocalStorage(jsonLocalStorage);
        } else {
            document.getElementById("validation").innerHTML = "Please fill in all fields!";
        }
    }

    // Get detail note
    let detailNote = function() {

        let id = noteProApplication.getQueryVariable("id");

        if (id != 0) {

            $(".formCreateNote").hide();
            $(".formEditeNote").show();

            let jsonLocalStorage = noteProApplication.fetchDataLocalStorage();

            let objNote = jsonLocalStorage.appNote.filter(function (entry) {
                return entry.id == id;
            });

            document.getElementById("title").value = objNote[0].title;
            document.getElementById("description").value = objNote[0].description;
            document.getElementById("date").value = moment(objNote[0].finishDate).format("YYYY-MM-DD");
            $("input[name='importance'][value='"+objNote[0].importance+"']").attr("checked", true);
        } else {
            $(".formCreateNote").show();
            $(".formEditNote").hide();
        }
    }

    // Update Note
    let updateNote = function() {

        let id = noteProApplication.getQueryVariable("id");
        let jsonLocalStorage = noteProApplication.fetchDataLocalStorage();

        let selectedDate = document.getElementById("date").value;
        let defineAsDate = new Date(selectedDate);
        let formatDate = defineAsDate.valueOf();

        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == id) {
                entry.title = document.getElementById("title").value;
                entry.description = document.getElementById("description").value;
                entry.finishDate = formatDate;
                entry.importance = $("input:radio[name=importance]:checked").val()
            }
        });
        // Update it in the localStorage too
        updateDataLocalStorage(jsonLocalStorage);
    }

    // Mark Note as checked (finished)
    let checkNoteAsFinished = function(id) {

        let jsonLocalStorage = noteProApplication.fetchDataLocalStorage();

        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == id && entry.finished == false) {
                entry.finished = true;
            } else if (entry.id == id && entry.finished == true) {
                entry.finished = false;
            }
        });

        // Update it in the localStorage too
        updateDataLocalStorage(jsonLocalStorage);
        window.location.reload();
    }

    // Get Id from the URL
    let getQueryVariable = function(variable) {

        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return(false);
    }

    // Change the style of the Note Application
    let changeStyle = function(value) {
        let bg = document.body;
        if (value === "greyBg") {
            bg.style.backgroundColor = "#EEEEEE";
            bg.style.color = "#000000";

            let tagBg = document.getElementsByClassName("changeBg");
            let len =  tagBg.length;

            for (let i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#FFFFFF";
            }
            document.getElementById("listAllNote").style.color = "#000000";
        } else {
            bg.style.backgroundColor = "#000000";
            bg.style.color = "#FFFFFF";

            let tagBg = document.getElementsByClassName("changeBg");
            let len =  tagBg.length;

            for (let i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#666666";
            }
            document.getElementById("listAllNote").style.color = "#000000";
        }
    }

    return {
        fetchDataLocalStorage: fetchDataLocalStorage,
        updateDataLocalStorage: updateDataLocalStorage,
        maxId: maxId,
        createNote: createNote,
        detailNote: detailNote,
        updateNote: updateNote,
        checkNoteAsFinished: checkNoteAsFinished,
        getQueryVariable: getQueryVariable,
        changeStyle: changeStyle
    };

    // Exposed API facilities
    //export default { createNote, updateNote };
})();




