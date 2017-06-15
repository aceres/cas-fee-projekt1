// IIFE - Immediately Invoked Function Expression
;
(function ($, window, document, undefined) {

    // The $ is now locally scoped
    "use strict";

    loadDetailNote();

    // TODO: Later Session Storage
    loadSkin();

    $(function () {

        // The DOM is ready!

        const button = document.getElementsByClassName("button");

        for (let i = 0; i < button.length; i++ ) {

            button[i].addEventListener("click", function(event) {
                switch (event.currentTarget.id) {

                    case "list":

                        ctrlList();
                        break;

                    case "save":

                        ctrlSave();
                        break;

                    case "update":

                        ctrlUpdate();
                        break;

                    case "delete":

                        ctrlDelete();
                        break;

                    case "cancel":

                        ctrlCancel();
                        break;
                }
            });
        }

        // List
        function ctrlList() {
            router.navigateTo("index.html");
        }

        // Save
        function ctrlSave() {

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
        }

        // Update
        function ctrlUpdate() {

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
        }

        // Delete
        function ctrlDelete() {
            modelNoteProApplication.deleteNote();
        }

        // Cancel
        function ctrlCancel() {
            router.navigateTo("index.html");
        }
    });

    // TODO: Refactor / DRY
    function loadSkin() {

        let checkIfDetailPageExists = modelNoteProApplication.getId("id");
        let objectStyle = JSON.parse(localStorage.getItem("localDataNote"));

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

    // Load detail note
    function loadDetailNote() {

        modelNoteProApplication.loadDetailNote();
        let objectNote = modelNoteProApplication.loadDetailNote();

        if (typeof objectNote === 'object' && objectNote.id != 0) {
            $(".save").hide();
            $(".delete").show();
            $(".update").show();
            $(".titleUpdateNote").show();
            $(".titleCreateNote").hide();

            document.getElementById("title").value = objectNote.title;
            document.getElementById("description").value = objectNote.description;
            document.getElementById("date").value = moment(objectNote.finishDate).format("YYYY-MM-DD");
            $("input[name='importance'][value='"+objectNote.importance+"']").attr("checked", true);
        } else {
            $(".save").show();
            $(".delete").hide();
            $(".update").hide();
            $(".titleCreateNote").show();
            $(".titleUpdateNote").hide();
        }
    }

}(jQuery, window, document));