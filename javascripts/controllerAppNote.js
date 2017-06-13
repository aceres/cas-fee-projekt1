// IIFE - Immediately Invoked Function Expression
;
(function ($, window, document, undefined) {

    // The $ is now locally scoped
    "use strict";

    // If the detail page appears, so ignore the handlebars
    let checkIfDetailPageExists = modelNoteProApplication.getId("id");

    // Grab the template script
    let templateScriptAllNote = null;
    let templateAllNote = null;
    let allNotesCompiledHtml = null;

    if (checkIfDetailPageExists === false) {
        // For the list
        // Handlebars will be loaded!
        templateScriptAllNote = $("#template-list-all-note").html();

        // Compile the template
        templateAllNote = Handlebars.compile(templateScriptAllNote);
        allNotesCompiledHtml = null;
    } else {
        // For the edit / update detail only
        // Handlebars will not be included!
        showDetailNote();
    }

    // LocalStorage
    let localStorageDataNote = null;

    $(function () {

        // The DOM is ready!

        const dataNote = {
            styleSkin: {
                name: "bgGrey"
            },
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
            // LoadSkin
            loadSkin();

            if (checkIfDetailPageExists === false) {
                // Pass our data to the template
                allNotesCompiledHtml = templateAllNote(localStorageDataNote);
            }
        } else {

            // Add object to the localStorage
            updateLocalStorage(dataNote);
            localStorageDataNote = JSON.parse(localStorage.getItem("localDataNote"));
            loadSkin();

            if (checkIfDetailPageExists === false) {
                // Pass our data to the template
                allNotesCompiledHtml = templateAllNote(localStorageDataNote);
            }
        }

        // Add the compiled html to the page
        // Display all notes
        $("ul#listAllNote").append(allNotesCompiledHtml);

        // Initialize for open / close detail row (description)
        toggleRow();

        // Register and initialize buttons / select
        const btnSortByImportance = document.getElementById("btnSortByImportance");
        const btnSortByCreatedDate = document.getElementById("btnSortByCreatedDate");
        const btnSortByFinishDate = document.getElementById("btnSortByFinishDate");
        const btnSortByTitle = document.getElementById("btnSortByTitle");
        const btnShowAllFinishedTasks = document.getElementById("btnShowAllFinishedTasks");
        const selectStyle = document.getElementById("selectStyle");

        const btnCreateNote = document.getElementById("btnCreateNote");
        const btnBackToList = document.getElementById("btnBackToList");
        const btnClearLocalStorage = document.getElementById("btnClearLocalStorage");
        const btnSaveNote = document.getElementById("btnSaveNote");
        const btnUpdateNote = document.getElementById("btnUpdateNote");
        const btnDeleteNote = document.getElementById("btnDeleteNote");
        const btnCancelNote = document.getElementById("btnCancelNote");

        // Sort by importance / created date / finish date / title
        // Show finished tasks only / select style
        if (btnSortByImportance || btnSortByCreatedDate || btnSortByFinishDate || btnSortByTitle || btnShowAllFinishedTasks || selectStyle) {

            btnSortByImportance.addEventListener("click", buttonClickListener);
            btnSortByCreatedDate.addEventListener("click", buttonClickListener);
            btnSortByFinishDate.addEventListener("click", buttonClickListener);
            btnSortByTitle.addEventListener("click", buttonClickListener);
            btnShowAllFinishedTasks.addEventListener("click", buttonClickListener);
            selectStyle.addEventListener("change", buttonClickListener);
        }

        // Check note as finished
        $('#listAllNote').on('change', 'input[type=checkbox]', function(e) {
            modelNoteProApplication.checkNoteAsFinished(this.value)
        });

        // Create Note
        if (btnCreateNote) {
            btnCreateNote.addEventListener("click", function () {
                router.navigateTo("detailNote.html?id=0");
            });
        }

        // List
        if (btnBackToList) {
            btnBackToList.addEventListener("click", function () {
                router.navigateTo("index.html");
            });
        }

        // Clear Local Storage
        if (btnClearLocalStorage) {
            btnClearLocalStorage.addEventListener("click", function () {
                localStorage.clear();
                router.navigateTo("index.html");
            });
        }

        // Save Note
        if (btnSaveNote) {
            btnSaveNote.addEventListener("click", function () {

                let title = document.getElementById("title").value;
                let description = document.getElementById("description").value;
                let selectedDate = document.getElementById("date").value;
                let importance = $("input:radio[name=importance]:checked").val();

                if (title !== "" && description != "") {
                    modelNoteProApplication.saveNote(title, description, selectedDate, importance);
                    $(".success").show();
                    $(".warning").hide();
                    showNotification();
                } else {
                    document.getElementById("validation").innerHTML = "Please fill in all fields!";
                    $(".warning").show();
                    $(".success").hide();
                    showNotification();
                }
            });
        }

        // Update Note
        if (btnUpdateNote) {
            btnUpdateNote.addEventListener("click", function () {

                let id = modelNoteProApplication.getId("id");
                let title = document.getElementById("title").value;
                let description = document.getElementById("description").value;

                let selectedDate = document.getElementById("date").value;
                let defineAsDate = new Date(selectedDate);
                let formatDate = defineAsDate.valueOf();

                let importance = $("input:radio[name=importance]:checked").val()

                if (title !== "" && description != "") {
                    modelNoteProApplication.updateNote(id, title, description, formatDate, importance);
                    $(".success").show();
                    $(".warning").hide();
                    showNotification();
                } else {
                    document.getElementById("validation").innerHTML = "Please fill in all fields!";
                    $(".warning").show();
                    $(".success").hide();
                    showNotification();
                }
            });
        }

        // Delete Note
        if (btnDeleteNote) {
            btnDeleteNote.addEventListener("click", function () {
                modelNoteProApplication.deleteNote();
            });
        }

        // Cancel Note
        if (btnCancelNote) {
            btnCancelNote.addEventListener("click", function () {
                router.navigateTo("index.html");
            });
        }

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

        // Check Style
        applySkin(e);

        // Settings buttons
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
                    $("span.rowAllLength").hide();
                    let newCountRow = $("#listAllNote").children(":not(.hidden, .headerTitle, .footerRowLength)").length;
                    console.log("newCountRow: ", newCountRow);
                    $("span.rowCheckedLength").text(newCountRow);
                    $("span.rowCheckedLength").show();
                } else {

                    $("li.hidden").removeClass("hidden").addClass("active");
                    $("li:even").css("background-color", "#fff");
                    $("li:odd").css("background-color", "#eee");
                    $("button#btnShowAllFinishedTasks").text("Show finished notes only");
                    txtShowAllFinishedTasks = true;
                    $("span.rowAllLength").show();
                    $("span.rowCheckedLength").hide();
                }
                break;
        }
    }

    function applySkin(e) {

        let objectStyle = JSON.parse(localStorage.getItem("localDataNote"));
        let bg = document.body;

        if (e.currentTarget.value === "greyBg") {
            bg.style.backgroundColor = "#EEEEEE";
            bg.style.color = "#000000";

            let tagBg = document.getElementsByClassName("changeBg");
            let len =  tagBg.length;

            for (let i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#FFFFFF";
            }
            document.getElementById("listAllNote").style.color = "#000000";
            setStyle(objectStyle, e.currentTarget.value)
        }

        if (e.currentTarget.value === "blackBg") {
            bg.style.backgroundColor = "#000000";
            bg.style.color = "#FFFFFF";

            let tagBg = document.getElementsByClassName("changeBg");
            let len =  tagBg.length;

            for (let i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#666666";
            }
            document.getElementById("listAllNote").style.color = "#000000";
            setStyle(objectStyle, e.currentTarget.value)
        }
    }

    // TODO: Refactor
    function loadSkin() {

        let checkIfDetailPageExists = modelNoteProApplication.getId("id");
        let objectStyle = JSON.parse(localStorage.getItem("localDataNote"));
        //console.log("objectStyle.styleSkin.name: ", objectStyle.styleSkin.name);

        // Initialize Style by loading
        $("#selectStyle option").filter(function() {
            return this.value == objectStyle.styleSkin.name;
        }).prop('selected', true);

        let bg = document.body;

        if (objectStyle.styleSkin.name === "greyBg") {
            bg.style.backgroundColor = "#EEEEEE";
            bg.style.color = "#000000";

            let tagBg = document.getElementsByClassName("changeBg");
            let len = tagBg.length;

            for (let i = 0; i < len; i++) {
                tagBg[i].style.backgroundColor = "#FFFFFF";
            }
            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }

        if (objectStyle.styleSkin.name === "blackBg") {
            bg.style.backgroundColor = "#000000";
            bg.style.color = "#FFFFFF";

            let tagBg = document.getElementsByClassName("changeBg");
            let len =  tagBg.length;

            for (let i=0; i < len; i++){
                tagBg[i].style.backgroundColor = "#666666";
            }
            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }
    }

    // Update style locally
    function setStyle(objectStyle, styleName) {

        objectStyle.styleSkin.name = styleName;
        localStorage.setItem('localDataNote', JSON.stringify(objectStyle));
        console.log("get style after saving: ", JSON.parse(localStorage.getItem("localDataNote")))
    }

    function showNotification() {

        let close = document.getElementsByClassName("closebtn");
        let i;

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function(){
                let div = this.parentElement;
                div.style.opacity = "0";
                setTimeout(function(){ div.style.display = "none"; }, 600);
            }
        }
    }

    // Detail note
    function showDetailNote() {

        modelNoteProApplication.loadDetailNote();
        let objectNote = modelNoteProApplication.loadDetailNote();

        if (typeof objectNote === 'object' && objectNote.id != 0) {
            $("#btnSaveNote").hide();
            $("#btnDeleteNote").show();
            $("#btnUpdateNote").show();
            $(".titleUpdateNote").show();
            $(".titleCreateNote").hide();

            document.getElementById("title").value = objectNote.title;
            document.getElementById("description").value = objectNote.description;
            document.getElementById("date").value = moment(objectNote.finishDate).format("YYYY-MM-DD");
            $("input[name='importance'][value='"+objectNote.importance+"']").attr("checked", true);
        } else {
            $("#btnSaveNote").show();
            $("#btnDeleteNote").hide();
            $("#btnUpdateNote").hide();
            $(".titleCreateNote").show();
            $(".titleUpdateNote").hide();
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
    //export default { changeStyle };
}(jQuery, window, document));