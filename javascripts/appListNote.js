// TODO: Do we need the $(document).ready()?
$(function () {
    // Grab the template script
    var templateScriptAllNote = $("#template-list-all-note").html();
    var templateScriptCheckedNote = $("#template-list-checked-note").html();

    // Compile the template
    var templateAllNote = Handlebars.compile(templateScriptAllNote);
    var templateCheckedNote = Handlebars.compile(templateScriptCheckedNote);

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
                level: "2",
                dateDone: saveDate1,
                checked: true
            },
            {
                id: 2,
                title: "Hausaufgaben machen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "2",
                dateDone: 1489017600000,
                checked: true
            },
            {
                id: 3,
                title: "Für die Prüfung lernen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "2",
                dateDone: 1492732800000,
                checked: false
            },
            {
                id: 4,
                title: "Priorität 1: HTML umsetzen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "4",
                dateDone: 1492732800000,
                checked: true
            },
            {
                id: 5,
                title: "Dozent fragen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "4",
                dateDone: 1495238400000,
                checked: true
            }
        ]
    };

    var localStorageDataNote = null;
    var allNotesCompiledHtml = null;
    var checkedNotesCompiledHtml = null;

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
            return a.level - b.level
        });

        console.log("After sorted: ", localStorageDataNote);
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
    }
}

/* Format the date */
Handlebars.registerHelper('formatDate', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

