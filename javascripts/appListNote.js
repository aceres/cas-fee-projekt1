// Grab the template script
let templateScriptAllNote = $("#template-list-all-note").html();

// Compile the template
let templateAllNote = Handlebars.compile(templateScriptAllNote);
let allNotesCompiledHtml = null;

// LocalStorage
let localStorageDataNote = null;

(function($, window, document) {
    $(function () {

        const dataNote = {
            appNote: [
                {
                    id: 1,
                    title: "UI testen",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
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
                    description: "2. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
                    importance: 1,
                    createdDate: 1489017600000,
                    finishDate: 1492732800000,
                    finished: false
                },
                {
                    id: 4,
                    title: "Priorität 1: HTML umsetzen",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
                    importance: 3,
                    createdDate: 1489017600000,
                    finishDate: 1492732800000,
                    finished: false
                },
                {
                    id: 5,
                    title: "Dozent fragen",
                    description: "Da wird die ungenaue Beschreibung vorgestellt.",
                    importance: 4,
                    createdDate: 1489017600000,
                    finishDate: 1495238400000,
                    finished: true
                }
            ]
        };

        if (localStorage.getItem("localDataNote")) {

            // Get object from the localStorage
            localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
            // Pass our data to the template
            allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        } else {

            // Add object to the localStorage
            updateLocalStorage(dataNote);
            // Pass our data to the template
            allNotesCompiledHtml = templateAllNote(dataNote);
        }

        // Add the compiled html to the page
        // Display all notes
        $("ul#listAllNote").append(allNotesCompiledHtml);

        // Initialize for open / close detail row (description)
        toggleRow();

        // Button (Registration)
        btnSortByImportance.addEventListener("click", buttonClickListener);
        btnSortByCreatedDate.addEventListener("click", buttonClickListener);
        btnSortByFinishDate.addEventListener("click", buttonClickListener);
        btnSortByTitle.addEventListener("click", buttonClickListener);
        btnShowAllFinishedTasks.addEventListener("click", buttonClickListener);
    });
}(window.jQuery, window, document));

// Accordion (Description)
function toggleRow() {
    let charLimit = 120;

    function truncate(el) {

        let text = el.text();
        let countText = text.trim().length;
        if (countText < 120) {
            el.parent().parent().next().hide();
        } else {
            el.attr("data-original-text", text);
            el.text(text.substring(0, charLimit) + "...");
        }
    }

    $(".truncated").each(function () {
        truncate($(this));
    });

    function reveal(el) {
        el.text(el.attr("data-original-text"));
    }

    $("a.more").on("click", function (e) {
        e.preventDefault();
        if ($(this).text() === "More") {
            $(this).text("Less");
            reveal($(this).prev().find(".truncated"));
        } else {
            $(this).text("More");
            truncate($(this).prev().find(".truncated"));
        }
    });
}

let txtShowAllFinishedTasks = true;
function buttonClickListener(e) {

    if (localStorage.getItem("localDataNote")) {
        console.log("Local data exists!");
    } else {
        console.log("Local data not exists!");
    }

    switch (e.currentTarget.id) {

        case "btnSortByImportance":

            localStorageDataNote.appNote.sort(function (a, b) {
                return b.importance - a.importance
            });
            reRenderList(localStorageDataNote);
            break;
        case "btnSortByCreatedDate":

            localStorageDataNote.appNote.sort(function (a, b) {
                return a.createdDate - b.createdDate
            });
            reRenderList(localStorageDataNote);
            break;
        case "btnSortByFinishDate":

            localStorageDataNote.appNote.sort(function (a, b) {
                return a.finishDate - b.finishDate
            });
            reRenderList(localStorageDataNote);
            break;
        case "btnSortByTitle":

            localStorageDataNote.appNote.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
            reRenderList(localStorageDataNote);
            break;
        case "btnShowAllFinishedTasks":

            if (txtShowAllFinishedTasks === true) {

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
            break;
    }
}

// Re-render the list of notes
function reRenderList(localData) {

    updateLocalStorage(localData);
    $("ul#listAllNote").empty();
    let localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
    allNotesCompiledHtml = templateAllNote(localStorageDataNote);
    $("ul#listAllNote").append(allNotesCompiledHtml);
    toggleRow();
}

// Update the local storage
function updateLocalStorage(localStorageDataNote) {
    localStorage.setItem('localDataNote', JSON.stringify(localStorageDataNote));
}

// Handlebars
// Format the date
Handlebars.registerHelper('formatDate', function (date, format) {
    let momentData = moment(date);
    return momentData.format(format);
});

// Check whether checkbox should be marked as checked or not
Handlebars.registerHelper('checkIfChecked', function(currentValue) {
    return currentValue === true ? ' checked=&quot;checked&quot;' : '';
});

// Show all notes and hide unfinished notes
Handlebars.registerHelper('if', function(showFinishedNotesOnly, options) {
    if (!showFinishedNotesOnly) {
        return options.fn(this);
    }
});