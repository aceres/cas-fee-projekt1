// Grab the template script
var templateScriptAllNote = $("#template-list-all-note").html();

// Compile the template
var templateAllNote = Handlebars.compile(templateScriptAllNote);

var localStorageDataNote = null;
var allNotesCompiledHtml = null;

$(function () {

    // Initialize data object (sample data)
    // TODO: Data - it is an example - remote it later
    var date1 = new Date("12.03.2012");
    var saveDate1 = date1.valueOf();
    console.log("saveDate1: ", saveDate1);

    var dataNote = {
        appNote: [
            {
                id: 1,
                title: "UI testen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                importance: 2,
                createdDate: 1489017600000,
                finishDate: saveDate1,
                finished: true
            },
            {
                id: 2,
                title: "Hausaufgaben machen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                importance: 5,
                createdDate: 1489017600000,
                finishDate: 1489017600000,
                finished: true
            },
            {
                id: 3,
                title: "Für die Prüfung lernen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                importance: 1,
                createdDate: 1489017600000,
                finishDate: 1492732800000,
                finished: false
            },
            {
                id: 4,
                title: "Priorität 1: HTML umsetzen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                importance: 3,
                createdDate: 1489017600000,
                finishDate: 1492732800000,
                finished: false
            },
            {
                id: 5,
                title: "Dozent fragen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                importance: 4,
                createdDate: 1489017600000,
                finishDate: 1495238400000,
                finished: true
            }
        ]
    };


    if (localStorage.getItem("localDataNote")) {
        // Get object from the localStorage
        console.log("Found!");
        localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
        //window.location.reload();
        // Pass our data to the template
        allNotesCompiledHtml = templateAllNote(localStorageDataNote);
    } else {
        // Add object to the localStorage
        console.log("Not found!");
        localStorage.setItem("localDataNote", JSON.stringify(dataNote));
        // Pass our data to the template
        allNotesCompiledHtml = templateAllNote(dataNote);
    }

    // Add the compiled html to the page
    // Display all notes
    $("ul#listAllNote").append(allNotesCompiledHtml);
});



/* Sort by importance */
document.getElementById("btnSortByImportance").addEventListener("click", function() {
    if (localStorage.getItem("localDataNote")) {
        // Get object from the localStorage
        console.log("Found!");
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));

        console.log("Before sorted: ", localStorageDataNote);

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.importance - b.importance
        });

        console.log("After sorted: ", localStorageDataNote);
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        $("ul#listAllNote").empty();
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
        allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        $("ul#listAllNote").append(allNotesCompiledHtml);
    }
});

/* Sort by created date */
document.getElementById("btnSortByCreatedDate").addEventListener("click", function() {
    if (localStorage.getItem("localDataNote")) {
        // Get object from the localStorage
        console.log("Found!");
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));

        console.log("Before sorted: ", localStorageDataNote);

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.createdDate - b.createdDate
        });

        console.log("After sorted: ", localStorageDataNote);
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        $("ul#listAllNote").empty();
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
        allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        $("ul#listAllNote").append(allNotesCompiledHtml);
    }
});

/* Sort by finish date */
document.getElementById("btnSortByFinishDate").addEventListener("click", function() {
    if (localStorage.getItem("localDataNote")) {
        // Get object from the localStorage
        console.log("Found!");
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));

        console.log("Before sorted: ", localStorageDataNote);

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.finishDate - b.finishDate
        });

        console.log("After sorted: ", localStorageDataNote);
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        $("ul#listAllNote").empty();
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
        allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        $("ul#listAllNote").append(allNotesCompiledHtml);
    }
});

var btnShowAllFinishedTasks = true;
/* Show finished tasks only */
document.getElementById("btnShowAllFinishedTasks").addEventListener("click", function() {

    if(btnShowAllFinishedTasks === true) {
        $("li.active").removeClass("active").addClass("hidden");

        $("li:not('.hidden'):even").css("background-color", "#fff");
        $("li:not('.hidden'):odd").css("background-color", "#eee");
        $("button#btnShowAllFinishedTasks").text("Show all notes");
        btnShowAllFinishedTasks = false;
    } else {

        $("li.hidden").removeClass("hidden").addClass("active");

        $("li:even").css("background-color", "#fff");
        $("li:odd").css("background-color", "#eee");
        $("button#btnShowAllFinishedTasks").text("Show finished notes only");
        btnShowAllFinishedTasks = true;
    }
});

/* Sort by title */
document.getElementById("btnSortByTitle").addEventListener("click", function() {
    if (localStorage.getItem("localDataNote")) {
        // Get object from the localStorage
        console.log("Found!");
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
        console.log("typeof: ", typeof localStorageDataNote);

        console.log("Before sorted: ", localStorageDataNote);

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
        console.log("After sorted: ", localStorageDataNote);
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        $("ul#listAllNote").empty();
        var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
        allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        $("ul#listAllNote").append(allNotesCompiledHtml);
    }
});

/* Create Note */
document.getElementById("btnCreateNote").addEventListener("click", function() {
    window.location.href='createNote.html';
});

/* List */
document.getElementById("btnList").addEventListener("click", function() {
    window.location.href='index.html';
});

/* Clear Local Storage */
document.getElementById("btnClearLocalStorage").addEventListener("click", function() {
    noteProApplication.clearLocalStorage();
});

/* Handlebars */

/* Format the date */
Handlebars.registerHelper('formatDate', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

/* Check whether checkbox should be marked as checked or not */
Handlebars.registerHelper('checkifchecked', function(currentValue) {
    return currentValue === true ? ' checked=&quot;checked&quot;' : '';
});

Handlebars.registerHelper('if', function(showFinishedNotesOnly, options) {
    if(!showFinishedNotesOnly) {
        return options.fn(this);
    }
});

// TODO: Not working well
// Handlebars.registerHelper("stripes", function(array, even, odd, options) {
//     if (array && array.length > 0) {
//         var buffer = "";
//         for (var i = 0, j = array.length; i < j; i++) {
//             var item = array[i];
//
//             // we'll just put the appropriate stripe class name onto the item for now
//             item.stripeClass = (i % 2 == 0 ? even : odd);
//
//             // show the inside of the block
//             buffer += options.fn(item);
//         }
//
//         // return the finished buffer
//         return buffer;
//     }
//     else {
//         return options.elseFn();
//     }
// });

