// IIFE - Immediately Invoked Function Expression
;
(function ($, window, document, undefined) {

    "use strict";

    let allNotesCompiledHtml = null;
    let templateScriptAllNote = $("#template-list-all-note").html();
    let templateAllNote = Handlebars.compile(templateScriptAllNote);
    let localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));

    $(function () {

        if (!localStorageDataNote) {
            localStorageDataNote = modelNoteProApplication.initializeSampleData();
            style.initializeStyle();
            modelNoteProApplication.setSessionStorage("showCheckedNotesOnly", false);
        }

        if (localStorageDataNote) {
            allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        }

        $("#listAllNote").append(allNotesCompiledHtml);

        if (modelNoteProApplication.getSessionStorage("showCheckedNotesOnly") === "true") {
            checkIfFinishedTaskOnly();
        }

        style.loadStyle();

        expandDescription();

        $('#listAllNote').on('change', 'input[type=checkbox]', function() {
            modelNoteProApplication.checkNoteAsFinished(this.value)
        });

        const select = $(".select");

        for (let x = 0; x < select.length; x++) {
            select[x].addEventListener("change", function (event) {
                switch (event.currentTarget.id) {

                    case "selectStyle":
                        style.applyStyle(event);
                        break;
                }
            });
        }

        let sortFunctions = {
            "sortByImportance" : (a,b) => b.importance - a.importance,
            "sortByCreatedDate" : (a,b) => a.createdDate - b.createdDate,
            "sortByFinishDate" : (a,b) => a.finishDate - b.finishDate,
            "sortByTitle" : (a,b) => a.title.localeCompare(b.title)
        }

        const el = document.getElementById("list");
        el.addEventListener("click", function() { buttonClicked(event) }, false);

        function buttonClicked(event) {

            switch (event.target.id) {

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
                    break;

                case "sortByCreatedDate":
                    localStorageDataNote.appNote.sort(function (a, b) {
                        return sortFunctions.sortByCreatedDate(a, b);
                    });
                    render();
                    break;

                case "sortByFinishDate":
                    localStorageDataNote.appNote.sort(function (a, b) {
                        return sortFunctions.sortByFinishDate(a, b);
                    });
                    render();
                    break;

                case "sortByTitle":
                    localStorageDataNote.appNote.sort(function (a, b) {
                        return sortFunctions.sortByTitle(a, b);
                    });
                    render();
                    break;

                case "showAllFinishedTasks":
                    switchShowAllFinishedTasks();
                    checkIfFinishedTaskOnly();
                    break;
            }
        }
    });

    function switchShowAllFinishedTasks() {

        if (modelNoteProApplication.getSessionStorage("showCheckedNotesOnly") === "false") {
            modelNoteProApplication.setSessionStorage("showCheckedNotesOnly", true);
        } else {
            modelNoteProApplication.setSessionStorage("showCheckedNotesOnly", false);
        }
    }

    function checkIfFinishedTaskOnly() {

        if (modelNoteProApplication.getSessionStorage("showCheckedNotesOnly") === "true") {
            $("tr.active").removeClass("active").addClass("hidden");
            $("#showAllFinishedTasks").text("Show all notes");
            $("tr:not('.hidden'):even").css("background-color", "#fff");
            $("tr:not('.hidden'):odd").css("background-color", "#eee");
            $("h4").text("Checked notes only");
            $("span.rowAllLength").hide();
            let newCountRow = $("#listAllNote tbody").children(":not(.hidden)").length;
            $("span.rowCheckedLength").text(newCountRow).show();
        } else {

            $("tr.hidden").removeClass("hidden").addClass("active");
            $("#showAllFinishedTasks").text("Show finished notes only");
            $("tr:even").css("background-color", "#fff");
            $("tr:odd").css("background-color", "#eee");
            $("h4").text("All notes");
            $("span.rowAllLength").show();
            $("span.rowCheckedLength").hide();
        }
    }

    function expandDescription() {

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

    function createNote() {
        router.navigateTo("detailNote.html?id=0");
    }

    function render() {

        $("#listAllNote").empty();
        allNotesCompiledHtml = templateAllNote(localStorageDataNote);
        $("#listAllNote").append(allNotesCompiledHtml);
        expandDescription();
        checkIfFinishedTaskOnly();
    }
}(jQuery, window, document));