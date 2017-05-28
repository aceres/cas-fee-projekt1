var noteProApplication = {

    // Clear the local storage
    clearLocalStorage: function() {
        localStorage.clear();
    },

    // Create Note
    createNote: function() {

        var title = document.getElementById("title").value;
        var description = document.getElementById("description").value;
        //var date = document.getElementById("date").value;
        console.log(document.getElementById("date").value);
        var selectedDate = document.getElementById("date").value;
        var defineAsDate = new Date(selectedDate);
        var formatDate = defineAsDate.valueOf();
        console.log("defineAsDate: ", defineAsDate);

        if (title !== "" || description != "" || date != "") {

            // TODO: Id should be incremented automatically / eventually I have to remove the property id (we don't need it)
            var newNote = new Object();
            newNote = {
                id: 1,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                level: $("input:radio[name=importance]:checked").val(),
                dateDone: formatDate,
                checked: false
            }
            // Retrieve the object from the local storage to add a new note (new object)
            var jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));
            console.log("jsonLocalStorage: ", jsonLocalStorage);
            jsonLocalStorage.appNote.push(newNote);
            // Update the storage
            localStorage.setItem("localDataNote", JSON.stringify(jsonLocalStorage));
        } else {
            // TODO: Refactoring - no id here!
            document.getElementById("validation").innerHTML = "Please fill in all fields!";
        }
    },

    // Get detail note
    detailNote: function() {

        var id = noteProApplication.getQueryVariable("id");
        console.log("id: ", id);
        var jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));

        // Find date with the fetched id
        /*$.map(jsonLocalStorage, function(obj) {
            console.log("obj: ", obj);
            if (obj.id == id)
                //console.log("obj: ", obj);
                return obj;
        });*/
        console.log("jsonLocalStorage: ", jsonLocalStorage);

        var objNote = jsonLocalStorage.appNote.filter(function(entry) {
            return entry.id == id;
        })
        console.log("objNote: ", objNote);

        document.getElementById("title").value = objNote[0].title;
        document.getElementById("description").value = objNote[0].description;
        // TODO: Remove it later!
        console.log("date: ", objNote[0].dateDone);
        document.getElementById("date").value = moment(objNote[0].dateDone).format("YYYY-MM-DD");
        // TODO: Radio Button (Importance)!

    },

    // Update Note
    updateNote: function() {

        var id = noteProApplication.getQueryVariable("id");
        var jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));

        jsonLocalStorage.appNote.forEach(function(entry) {
            if (entry.id == id) {
                entry.description = document.getElementById("title").value;
                entry.description = document.getElementById("description").value;
                var selectedDate = document.getElementById("date").value;
                var defineAsDate = new Date(selectedDate);
                var formatDate = defineAsDate.valueOf();
                // TODO: Radio Button (Importance)

            }
        });
        // TODO: Update it in the localStorage
        localStorage.setItem('localDataNote', JSON.stringify(jsonLocalStorage));

        console.log("jsonLocalStorage: after update", jsonLocalStorage);

    },

    // Get Id from the URL
    getQueryVariable: function(variable) {

        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return(false);
    },

    // Change the style of the Note Application
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