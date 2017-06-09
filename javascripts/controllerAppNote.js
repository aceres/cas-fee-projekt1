// IIFE - Immediately Invoked Function Expression
;
(function ($, window, document, undefined) {

    // The $ is now locally scoped

    "use strict";

    // Grab the template script
    let templateScriptAllNote = $("#template-list-all-note").html();

    // Compile the template
    let templateAllNote = Handlebars.compile(templateScriptAllNote);
    let allNotesCompiledHtml = null;

    // LocalStorage
    let localStorageDataNote = null;

    $(function () {
        // The DOM is ready!

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

        // if null is false
        if (localStorage.getItem("localDataNote")) {

            // Get object from the localStorage
            localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
            // Pass our data to the template
            allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        } else {
            // Add object to the localStorage
            updateLocalStorage(dataNote);
            localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
            // Pass our data to the template
            allNotesCompiledHtml = templateAllNote(localStorageDataNote);
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

    // Toggle row (for long descriptions)
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

        switch (e.currentTarget.id) {

            case "btnSortByImportance":

                localStorageDataNote.appNote.sort(function (a, b) {
                    return b.importance - a.importance
                });
                renderNotes(localStorageDataNote);
                break;

            case "btnSortByCreatedDate":

                localStorageDataNote.appNote.sort(function (a, b) {
                    return a.createdDate - b.createdDate
                });
                renderNotes(localStorageDataNote);
                break;

            case "btnSortByFinishDate":

                localStorageDataNote.appNote.sort(function (a, b) {
                    return a.finishDate - b.finishDate
                });
                renderNotes(localStorageDataNote);
                break;

            case "btnSortByTitle":

                localStorageDataNote.appNote.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                });
                renderNotes(localStorageDataNote);
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

    // Render notes
    function renderNotes(localData) {
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

    // Exposed API facilities
    //export default { buttonClickListener };
}(jQuery, window, document));

// Change the style of the Note Application
function changeStyle(value) {
    let bg = document.body;
    if (value === "greyBg") {
        bg.style.backgroundColor = "#EEEEEE";
        bg.style.color = "#000000";

        let tagBg = document.getElementsByClassName("changeBg");
        let len =  tagBg.length;

        for (let i=0; i < len; i++){
            tagBg[i].style.backgroundColor = "#FFFFFF";
        }
        document.getElementById("listAllNote").style.color = "#000000";
    } else {
        bg.style.backgroundColor = "#000000";
        bg.style.color = "#FFFFFF";

        let tagBg = document.getElementsByClassName("changeBg");
        let len =  tagBg.length;

        for (let i=0; i < len; i++){
            tagBg[i].style.backgroundColor = "#666666";
        }
        document.getElementById("listAllNote").style.color = "#000000";
    }
}