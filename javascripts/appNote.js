let noteProApplication = {};

// We need to do a check before we create the namespace
if (typeof noteProApplication === "undefined") {
    let noteProApplication = {};
}

/* Revealing Module Pattern */
noteProApplication = (function() {

    // Clear the local storage
    let clearLocalStorage = function() {
        localStorage.clear();
    }
    
    // Set new ID for creating new note
    let maxId = function() {

        let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));

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

            console.log("filled");

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
            let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));
            jsonLocalStorage.appNote.push(newNote);
            // Update the storage
            localStorage.setItem("localDataNote", JSON.stringify(jsonLocalStorage));
        } else {
            document.getElementById("validation").innerHTML = "Please fill in all fields!";
        }
    }

    // Get detail note
    let detailNote = function() {

        /*var url = 'example.com/page.html?134',
            hash = url.split('?')[1];

        if (hash) {
            alert(hash)
        } else {
            // do something else
        }*/

        let id = noteProApplication.getQueryVariable("id");

        if (id != 0) {

            $(".formCreateNote").hide();
            $(".formEditeNote").show();

            console.log("id: ", id);
            let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));

            let objNote = jsonLocalStorage.appNote.filter(function (entry) {
                return entry.id == id;
            });
            console.log("objNote: ", objNote);

            document.getElementById("title").value = objNote[0].title;
            document.getElementById("description").value = objNote[0].description;
            document.getElementById("date").value = moment(objNote[0].finishDate).format("YYYY-MM-DD");
            //document.formNote.importance.value = objNote[0].importance;
            $("input[name='importance'][value='"+objNote[0].importance+"']").attr("checked", true);

        } else {

            $(".formCreateNote").show();
            $(".formEditNote").hide();
        }
    }

    // Update Note
    let updateNote = function() {

        let id = noteProApplication.getQueryVariable("id");
        let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));

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
        localStorage.setItem('localDataNote', JSON.stringify(jsonLocalStorage));
    }

    // Mark Note as checked (finished)
    let checkedNoteAsFinished = function(id) {

        console.log("id: ", id);

        let jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));

        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == id && entry.finished == false) {
                entry.finished = true;
            } else if (entry.id == id && entry.finished == true) {
                entry.finished = false;
            }
        });

        // Update it in the localStorage too
        localStorage.setItem('localDataNote', JSON.stringify(jsonLocalStorage));

        // TODO: Refresh the page
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
            document.getElementById("listCheckedNote").style.color = "#000000";
        } else {
            bg.style.backgroundColor = "#000000";
            bg.style.color = "#FFFFFF";

            let tagBg = document.getElementsByClassName("changeBg");
            let len =  tagBg.length;

            for (let i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#666666";
            }
            document.getElementById("listAllNote").style.color = "#000000";
            document.getElementById("listCheckedNote").style.color = "#000000";
        }

    }

    return {
        clearLocalStorage: clearLocalStorage,
        maxId: maxId,
        createNote: createNote,
        detailNote: detailNote,
        updateNote: updateNote,
        checkedNoteAsFinished: checkedNoteAsFinished,
        getQueryVariable: getQueryVariable,
        changeStyle: changeStyle
    };
})();


