var noteProApplication = {

    function1: function($this) {

    },

    clearLocalStorage: function() {
        localStorage.clear();
    },

    createNote: function() {
        // TODO: Id should be incremented automatically / eventually I have to remove the property id (we don't need it)
        var newNote = new Object();
        newNote = {
            id: 1,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            level: $("input:radio[name=importance]:checked").val(),
            dateDone: document.getElementById("date").value,
            checked: false
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

            var tagBg = document.getElementsByClassName("changeBg");
            var len =  tagBg.length;

            for (var i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#FFFFFF";
            }
            document.getElementById("listAllNote").style.color = "#000000";
            document.getElementById("listCheckedNote").style.color = "#000000";
        } else {
            bg.style.backgroundColor = "#000000";
            bg.style.color = "#FFFFFF";

            var tagBg = document.getElementsByClassName("changeBg");
            var len =  tagBg.length;

            for (var i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#666666";
            }
            document.getElementById("listAllNote").style.color = "#000000";
            document.getElementById("listCheckedNote").style.color = "#000000";
        }

    }
};