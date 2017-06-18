// IIFE - Immediately Invoked Function Expression
;
(function ($, window, document, undefined) {

    "use strict";

    const success = $(".success");
    const warning = $(".warning");
    const save = $(".save");
    const update = $(".update");

    getDetailNote();

    style.loadStyle();

    $(function () {

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
            let dateFormat = checkDateformat(selectedDate);

            if (title !== "" && description !== "" && dateFormat !== false) {
                modelNoteProApplication.saveNote(title, description, selectedDate, importance);
                success.show();
                warning.hide();
                showNotification();
            } else {
                success.hide();
                warning.show();
                showNotification();
            }
        }

        function checkDateformat(date) {

            let dateFormat = 'DD.MM.YYYY';
            if (moment(moment(date).format(dateFormat),dateFormat,true).isValid()) {
                return true;
            } else {
                return false;
            }
        }

        function ctrlUpdate() {

            let id = modelNoteProApplication.getId("id");
            let title = $("#title").val();
            let description = $("#description").val();

            let selectedDate = $("#date").val();
            let defineAsDate = new Date(selectedDate);
            let formatDate = defineAsDate.valueOf();
            let createdDate = $("#createdDate").val();

            let importance = $("input:radio[name=importance]:checked").val()

            let dateFormat = checkDateformat(selectedDate);

            if (title !== "" && description != "" && dateFormat !== false) {
                modelNoteProApplication.updateNote(id, title, description, importance, formatDate, createdDate);
                success.show();
                warning.hide();
                showNotification();
            } else {
                success.hide();
                warning.show();
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

    function getDetailNote() {

        let objectNote = modelNoteProApplication.getDetailNote();

        if (typeof objectNote === 'object' && objectNote.id != 0) {

            save.hide();
            update.show();
            $("#title").val(objectNote.title);
            $("#description").val(objectNote.description);
            $("#date").val(moment(objectNote.finishDate).format("YYYY-MM-DD"));
            $("input[name='importance'][value='"+objectNote.importance+"']").attr("checked", true);
            $("#createdDate").val(objectNote.createdDate);
            $("#finish").val(objectNote.finished);
        } else {

            save.show();
            update.hide();
        }
    }
}(jQuery, window, document));