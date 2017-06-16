// IIFE - Immediately Invoked Function Expression
;
(function ($, window, document, undefined) {

    // The $ is now locally scoped
    "use strict";

    // Grab the template script
    let allNotesCompiledHtml = null;

    // Handlebars will be loaded!
    let templateScriptAllNote = $("#template-list-all-note").html();

    // Compile the template
    let templateAllNote = Handlebars.compile(templateScriptAllNote);

    // Get data from local storage
    let localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));

    $(function () {

        // The DOM is ready!

        // Initialize data, if local storage is empty
        if (!localStorageDataNote) {
            localStorageDataNote = modelNoteProApplication.initializeSampleData();
        }

        // if null is false
        if (localStorageDataNote) {
            // Pass our data to the template
            allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        }

        // Add the compiled html to the page
        // Display all notes
        $("#listAllNote").append(allNotesCompiledHtml);

        // Load / Initialize style
        style.loadStyle();

        // Initialize for open / close detail row (description)
        toggleRow();

        // Check note as finished
        $('#listAllNote').on('change', 'input[type=checkbox]', function() {
            modelNoteProApplication.checkNoteAsFinished(this.value)
        });

        const button = document.getElementsByClassName("button");
        const select = document.getElementsByClassName("select");

        let sortFunctions = {
            "sortByImportance" : (a,b) => b.importance - a.importance,
            "sortByCreatedDate" : (a,b) => a.createdDate - b.createdDate,
            "sortByFinishDate" : (a,b) => a.finishDate - b.finishDate
        }

        for (let x = 0; x < select.length; x++) {
            select[x].addEventListener("change", function (event) {
                switch (event.currentTarget.id) {

                    case "selectStyle":

                        style.applyStyle(event);
                        break;
                }
            });
        }

        for (let i = 0; i < button.length; i++) {

            button[i].addEventListener("click", function (event) {

                switch (event.currentTarget.id) {

                    case "createNote":

                        createNote();
                        break;

                    case "list":

                        router.navigateTo("index.html");
                        break;

                    case "clearLocalStorage":

                        modelNoteProApplication.clearDataLocalStorage();
                        break;

                    case "sortByImportance":

                        localStorageDataNote.appNote.sort(function (a, b) {
                            return sortFunctions.sortByImportance(a, b);
                        });
                        render();
                        checkIfFinishedTaskOnly();
                        break;

                    case "sortByCreatedDate":

                        localStorageDataNote.appNote.sort(function (a, b) {
                            return sortFunctions.sortByCreatedDate(a, b);
                        });
                        render();
                        checkIfFinishedTaskOnly();
                        break;

                    case "sortByFinishDate":

                        localStorageDataNote.appNote.sort(function (a, b) {
                            return sortFunctions.sortByFinishDate(a, b);
                        });
                        render();
                        checkIfFinishedTaskOnly();
                        break;

                    case "sortByTitle":

                        localStorageDataNote.appNote.sort(function (a, b) {
                            return a.title.localeCompare(b.title);
                        });
                        render();
                        checkIfFinishedTaskOnly();
                        break;

                    case "showAllFinishedTasks":
                        switchShowAllFinishedTasks();
                        checkIfFinishedTaskOnly();
                        break;
                }
            });
        }
    });

    // Switcher: All notes / Checked notes only
    function switchShowAllFinishedTasks() {
        if ($("#showAllFinishedTasks").attr("data-checked") === "false") {
            $("#showAllFinishedTasks").attr("data-checked", "true");
        } else {
            $("#showAllFinishedTasks").attr("data-checked", "false");
        }
    }

    // Initialize
    function checkIfFinishedTaskOnly() {

        if ($("#showAllFinishedTasks").attr("data-checked") === "true") {

            $("tr.active").removeClass("active").addClass("hidden");
            $("tr:not('.hidden'):even").css("background-color", "#fff");
            $("tr:not('.hidden'):odd").css("background-color", "#eee");
            $("#showAllFinishedTasks").text("Show all notes");
            $("span.rowAllLength").hide();
            let newCountRow = $("#listAllNote").children(":not(.hidden, .headerTitle, .footerRowLength)").length;
            $("span.rowCheckedLength").text(newCountRow);
            $("span.rowCheckedLength").show();
        } else {

            $("tr.hidden").removeClass("hidden").addClass("active");
            $("tr:even").css("background-color", "#fff");
            $("tr:odd").css("background-color", "#eee");
            $("#showAllFinishedTasks").text("Show finished notes only");
            $("span.rowAllLength").show();
            $("span.rowCheckedLength").hide();
        }
    }

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

    // Go to for creating new note
    function createNote() {
        router.navigateTo("detailNote.html?id=0");
    }

    // Render notes
    function render() {

        $("#listAllNote").empty();
        allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        $("#listAllNote").append(allNotesCompiledHtml);
        toggleRow();
    }
}(jQuery, window, document));