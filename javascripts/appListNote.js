// TODO: Do we need the $(document).ready()?
$(function () {
    // Grab the template script
    var templateScriptAllNote = $("#template-list-all-note").html();
    var templateScriptCheckedNote = $("#template-list-checked-note").html();

    // Compile the template
    var templateAllNote = Handlebars.compile(templateScriptAllNote);
    var templateCheckedNote = Handlebars.compile(templateScriptCheckedNote);

    // Initialize data object
    var dataNote = {
        appNote: [
            {
                id: 1,
                title: "UI testen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "2",
                dateDone: "12.12.2017",
                checked: true
            },
            {
                id: 2,
                title: "Hausaufgaben machen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "2",
                dateDone: "12.10.2017",
                checked: true
            },
            {
                id: 3,
                title: "Für die Prüfung lernen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "2",
                dateDone: "12.07.2017",
                checked: false
            },
            {
                id: 4,
                title: "Priorität 1: HTML umsetzen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "4",
                dateDone: "06.04.2017",
                checked: true
            },
            {
                id: 5,
                title: "Dozent fragen",
                description: "Hier wird die genaue Beschreibung gemacht.",
                level: "4",
                dateDone: "08.03.2017",
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