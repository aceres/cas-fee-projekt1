// Grab the template script
var templateScriptAllNote = $("#template-list-all-note").html();

// Compile the template
var templateAllNote = Handlebars.compile(templateScriptAllNote);

var localStorageDataNote = null;
var allNotesCompiledHtml = null;

$(function () {

    var dataNote = {
        appNote: [
            {
                id: 1,
                title: "UI testen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                importance: 2,
                createdDate: 1489017600000,
                finishDate: 1492732800000,
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


var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));

const btnSortByImportance = document.getElementById("btnSortByImportance");
const btnSortByCreatedDate = document.getElementById("btnSortByCreatedDate");
const btnSortByFinishDate = document.getElementById("btnSortByFinishDate");
const btnSortByTitle = document.getElementById("btnSortByTitle");
const btnShowAllFinishedTasks = document.getElementById("btnShowAllFinishedTasks");
const btnCreateNote = document.getElementById("btnCreateNote");
const btnList = document.getElementById("btnList");
const btnClearLocalStorage = document.getElementById("btnClearLocalStorage");

/* Sort by importance */
btnSortByImportance.addEventListener("click", function() {

    if (localStorage.getItem("localDataNote")) {

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.importance - b.importance
        });
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        reRenderList(localStorageDataNote);
    }
});

/* Sort by created date */
btnSortByCreatedDate.addEventListener("click", function() {

    if (localStorage.getItem("localDataNote")) {

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.createdDate - b.createdDate
        });
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        reRenderList(localStorageDataNote);
    }
});

/* Sort by finish date */
btnSortByFinishDate.addEventListener("click", function() {

    if (localStorage.getItem("localDataNote")) {

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.finishDate - b.finishDate
        });
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        reRenderList(localStorageDataNote);
    }
});

/* Sort by title */
btnSortByTitle.addEventListener("click", function() {

    if (localStorage.getItem("localDataNote")) {

        localStorageDataNote.appNote.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
        localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));

        reRenderList(localStorageDataNote);
    }
});

/* Show finished tasks only */
var txtShowAllFinishedTasks = true;

btnShowAllFinishedTasks.addEventListener("click", function() {

    if(txtShowAllFinishedTasks === true) {

        $("li.active").removeClass("active").addClass("hidden");
        $("li:not('.hidden'):even").css("background-color", "#fff");
        $("li:not('.hidden'):odd").css("background-color", "#eee");
        $("button#btnShowAllFinishedTasks").text("Show all notes");
        txtShowAllFinishedTasks = false;
    } else {

        $("li.hidden").removeClass("hidden").addClass("active");
        $("li:even").css("background-color", "#fff");
        $("li:odd").css("background-color", "#eee");
        $("button#btnShowAllFinishedTasks").text("Show finished notes only");
        txtShowAllFinishedTasks = true;
    }
});

/* Re-render the list of notes */
function reRenderList(localStorageDataNote) {
    $("ul#listAllNote").empty();
    var localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
    allNotesCompiledHtml = templateAllNote(localStorageDataNote);
    $("ul#listAllNote").append(allNotesCompiledHtml);
}

/* Create Note */
btnCreateNote.addEventListener("click", function() {
    window.location.href='createNote.html';
});

/* List */
btnList.addEventListener("click", function() {
    window.location.href='index.html';
});

/* Clear Local Storage */
btnClearLocalStorage.addEventListener("click", function() {
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

/* Show all notes and hide unfinished notes */
Handlebars.registerHelper('if', function(showFinishedNotesOnly, options) {
    if(!showFinishedNotesOnly) {
        return options.fn(this);
    }
});