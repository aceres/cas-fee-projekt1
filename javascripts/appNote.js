var noteProApplication = {

    function1: function($this) {

    },

    clearLocalStorage: function() {
        localStorage.clear();
    },

    createNote: function() {
        // TODO: Id should be incremented automatically
        var newNote = new Object();
        newNote = {
            id: 1,
            title: "Neuer Task",
            description: "Hier wird die genaue Beschreibung gemacht.",
            level: "4",
            dateDone: "12.12.2017",
            checked: true
        }
        // Retrieve the object from the local storage to add a new note (new object)
        var jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));
        console.log("jsonLocalStorage: ", jsonLocalStorage);
        jsonLocalStorage.appNote.push(newNote);
        // Update the storage
        localStorage.setItem("localDataNote", JSON.stringify(jsonLocalStorage));
    },

    changeStyle: function(value) {
        var bg = document.body;
        if (value === "greyBg") {
            bg.style.backgroundColor = "#EEEEEE";
            bg.style.color = "#000000";
        }
        else {
            bg.style.backgroundColor = "#000000";
            bg.style.color = "#FFFFFF";
        }

    }
};