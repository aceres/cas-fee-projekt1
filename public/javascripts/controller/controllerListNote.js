;(function($) {

    "use strict";

    const client = window.services.restClient;
    const ordersContainer = $("#listAllNote");
    const ordersRenderer = Handlebars.compile($("#template-list-all-note").html());

    $(function() {

        let localNotes = null;

        style.loadStyle();

        loadNotes();

        setInterval(loadNotes, 60000);

        function loadNotes() {

            client.getNotes().done(function(notes){
                localNotes = notes;
                ordersContainer.html(ordersRenderer({notes : notes}));
                initialExpandedDescription();
                checkIfFinishedTaskOnly();
            })
        }

        function render() {

            ordersContainer.html(ordersRenderer({notes : localNotes}));
            initialExpandedDescription();
            checkIfFinishedTaskOnly();
        }

        if (modelNoteProApplication.sessionKey("showCheckedNotesOnly", null, "getKey") === "true") {
            checkIfFinishedTaskOnly();
        }

        $('#listAllNote').on('change', 'input[type=checkbox]', function() {

            let checked = "";
            if (($(this).is(':checked'))) {
                checked = true
            } else {
                checked = false
            }

            client.checkNote(this.value, $(this).is(':checked')).done(function(){});
            router.navigateTo("/");
        });

        const sortFunctions = {
            "sortByImportance" : (a,b) => b.importance - a.importance,
            "sortByCreatedDate" : (a,b) => a.createdDate - b.createdDate,
            "sortByFinishDate" : (a,b) => a.finishDate - b.finishDate,
            "sortByTitle" : (a,b) => a.title.localeCompare(b.title)
        }

        const el = document.getElementById("list");
        el.addEventListener("click", buttonClicked, false);

        function buttonClicked(event) {

            switch (event.target.id) {

                case "createNote":
                    router.navigateTo("detailNote.html?id=0");
                    break;

                case "detailNote":
                    router.navigateTo("detailNote.html?id="+event.target.value);
                    break;

                case "sortByImportance":
                    localNotes.sort(function (a, b) {
                        return sortFunctions.sortByImportance(a, b);
                    });
                    render();
                    break;

                case "sortByCreatedDate":
                    localNotes.sort(function (a, b) {
                        return sortFunctions.sortByCreatedDate(a, b);
                    });
                    render();
                    break;

                case "sortByFinishDate":
                    localNotes.sort(function (a, b) {
                        return sortFunctions.sortByFinishDate(a, b);
                    });
                    render();
                    break;

                case "sortByTitle":
                    localNotes.sort(function (a, b) {
                        return sortFunctions.sortByTitle(a, b);
                    });
                    render();
                    break;

                case "showAllFinishedTasks":
                    switchAllFinishedTasks();
                    checkIfFinishedTaskOnly();
                    break;
            }
        }
    });

    function switchAllFinishedTasks() {

        if (modelNoteProApplication.sessionKey("showCheckedNotesOnly", null, "getKey") === "false") {
            modelNoteProApplication.sessionKey("showCheckedNotesOnly", true, "setKey");
        } else {
            modelNoteProApplication.sessionKey("showCheckedNotesOnly", false, "setKey");
        }
    }

    function checkIfFinishedTaskOnly() {

        if (modelNoteProApplication.sessionKey("showCheckedNotesOnly", null, "getKey") === "true") {

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

    function initialExpandedDescription() {

        const charLimit = 120;

        function truncate(el) {

            const text = el.text();
            const countText = text.trim().length;
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

        let reveal = (el) => { el.text(el.attr("data-original-text")); }

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

    const select = document.querySelector('select');
    select.addEventListener("change", function (event) {

        style.applyStyle(event);
    });
}(jQuery));