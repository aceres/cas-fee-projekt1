// Grab the template script
var templateScriptAllNote = $("#template-list-all-note").html();
var templateScriptCheckedNote = $("#template-list-checked-note").html();

// Compile the template
var templateAllNote = Handlebars.compile(templateScriptAllNote);
var templateCheckedNote = Handlebars.compile(templateScriptCheckedNote);

var localStorageDataNote = null;
var allNotesCompiledHtml = null;
var checkedNotesCompiledHtml = null;

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
        checkedNotesCompiledHtml = templateCheckedNote(localStorageDataNote);
    } else {
        // Add object to the localStorage
        console.log("Not found!");
        localStorage.setItem("localDataNote", JSON.stringify(dataNote));
        // Pass our data to the template
        allNotesCompiledHtml = templateAllNote(dataNote);
        checkedNotesCompiledHtml = templateCheckedNote(dataNote);
    }

    // Add the compiled html to the page
    // Display all notes
    $("ul#listAllNote").append(allNotesCompiledHtml);
    // Display checked notes only
    $("ul#listCheckedNote").append(checkedNotesCompiledHtml);
});

/* Sort by importance */
function sortByImportance() {
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
}

/* Sort by created date */
function sortByCreatedDate() {
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
}

/* Sort by finish date */
function sortByFinishDate() {
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
}

/* Sort by title */
function sortByTitle() {
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
}

/* Format the date */
Handlebars.registerHelper('formatDate', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

/* Check whether checkbox should be marked as checked or not */
Handlebars.registerHelper('checkifchecked', function(currentValue) {
    return currentValue === true ? ' checked=&quot;checked&quot;' : '';
});

