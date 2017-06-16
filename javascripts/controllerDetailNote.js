// IIFE - Immediately Invoked Function Expression
;
(function ($, window, document, undefined) {

    "use strict";

    loadDetailNote();
    style.loadStyle();

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

        function ctrlList() {
            router.navigateTo("index.html");
        }

        function ctrlSave() {

            let title = $("#title").val();
            let description = $("#description").val();
            let selectedDate = $("#date").val();
            let importance = $("input:radio[name=importance]:checked").val();

            if (title !== "" && description != "") {
                modelNoteProApplication.saveNote(title, description, selectedDate, importance);
                $(".success").show();
                $(".warning").hide();
                showNotification();
            } else {
                $(".warning").show();
                $(".success").hide();
                showNotification();
            }
        }

        function ctrlUpdate() {

            let id = modelNoteProApplication.getId("id");
            let title = $("#title").val();
            let description = $("#description").val();

            let selectedDate = $("#date").val();
            let defineAsDate = new Date(selectedDate);
            let formatDate = defineAsDate.valueOf();

            let importance = $("input:radio[name=importance]:checked").val()

            if (title !== "" && description != "") {

                modelNoteProApplication.updateNote(id, title, description, formatDate, importance);
                $(".success").show();
                $(".warning").hide();
                showNotification();
            } else {

                $(".warning").show();
                $(".success").hide();
                showNotification();
            }
        }

        function ctrlDelete() {
            modelNoteProApplication.deleteNote();
        }

        function ctrlCancel() {
            router.navigateTo("index.html");
        }
    });

    function showNotification() {

        let close = $(".closebtn");
        let i;

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function(){
                let div = this.parentElement;
                div.style.opacity = "0";
                setTimeout(function() {
                    div.style.display = "none";
                }, 600);
            }
        }
    }

    function loadDetailNote() {

        modelNoteProApplication.loadDetailNote();
        let objectNote = modelNoteProApplication.loadDetailNote();

        if (typeof objectNote === 'object' && objectNote.id != 0) {
            $(".save").hide();
            $(".update").show();

            $("#title").val(objectNote.title);
            $("#description").val(objectNote.description);
            $("#date").val(moment(objectNote.finishDate).format("YYYY-MM-DD"));
            $("input[name='importance'][value='"+objectNote.importance+"']").attr("checked", true);
        } else {
            $(".save").show();
            $(".update").hide();
        }
    }
}(jQuery, window, document));