var noteProApplication = {

    loadFunctionsForCreate: function() {

        /* TODO: Avoid the duplicate here */
        /* Ask the teacher about it */
        /* List */
        document.getElementById("btnList").addEventListener("click", function() {
            window.location.href='index.html';
        });
    },

    loadFunctionsForEdit: function() {

        /* TODO: Avoid the duplicate here */
        /* Ask the teacher about it */
        /* Create Note */
        document.getElementById("btnCreateNote").addEventListener("click", function() {
            window.location.href='createNote.html';
        });
        /* List */
        document.getElementById("btnList").addEventListener("click", function() {
            window.location.href='index.html';
        });
    },

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
        var newDate = new Date();

        if (title !== "" || description != "" || date != "") {

            // TODO: Id should be incremented automatically / eventually I have to remove the property id (we don't need it)
            var newNote = new Object();
            newNote = {
                id: 1,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                importance: $("input:radio[name=importance]:checked").val(),
                createdDate: newDate.valueOf(),
                finishDate: formatDate,
                finished: false
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
        // TODO: Remove it later! (console)
        console.log("date: ", objNote[0].finishDate);
        document.getElementById("date").value = moment(objNote[0].finishDate).format("YYYY-MM-DD");
        // TODO: Radio Button (Importance)!
        //$("input:radio[name=importance]:checked").val() = objNote[0].importance;
        console.log("objNote[0].importance: ", objNote[0].importance);
        //$('input[name="importance"]:checked').value = objNote[0].importance;
        //document.getElementsByName('importance').checked.value = objNote[0].importance;
        //$("input[name='importance'][value="+objNote[0].importance+"]:checked");
        document.formEditNote.importance.value = objNote[0].importance;

        /*var radios = document.getElementsByName('importance');

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].value == objNote[0].importance) {
                console.log("radios[i].value", radios[i].value);
                $('input[name="importance"]:checked').prop( "checked", true );
                break;
            }
        }*/

    },

    // Update Note
    updateNote: function() {

        var id = noteProApplication.getQueryVariable("id");
        var jsonLocalStorage = JSON.parse(localStorage.getItem("localDataNote"));

        var selectedDate = document.getElementById("date").value;
        var defineAsDate = new Date(selectedDate);
        var formatDate = defineAsDate.valueOf();

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

        // TODO: Updated data in the edit page
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


