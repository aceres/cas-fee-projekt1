;(function($) {

    "use strict";

    const client = window.services.restClient;
    const success = $(".success");
    const warning = $(".warning");
    const save = $(".save");
    const update = $(".update");

    $(function () {

        let getId = () => window.location.href.substring(window.location.href.lastIndexOf('=') + 1);

        style.loadStyle();

        loadNote();

        const el = document.getElementById("detail");
        el.addEventListener("click", function(event) { buttonClicked(event) }, false);

        function buttonClicked(event) {

            switch (event.target.id) {

                case "list":
                    router.navigateTo("/");
                    break;

                case "save":
                    ctrlEventHandler("save");
                    break;

                case "update":
                    ctrlEventHandler("update");
                    break;

                case "delete":
                    let id = getId();
                    client.deleteNote(id).done(function(){});
                    router.navigateTo("/");
                    break;

                case "cancel":
                    router.navigateTo("/");
                    break;
            }
        }

        function loadNote() {

            save.show();
            update.hide();

            let id = getId();
            client.getNote(id).done(function(note){

                if (typeof note === 'object' && id != 0) {

                    save.hide();
                    update.show();
                    $("#title").val(note.title);
                    $("#description").val(note.description);

                    let timestamp = parseInt(note.finishDate);
                    $("#date").val(moment(timestamp).format("YYYY-MM-DD"));
                    $("input[name='importance'][value='" + note.importance + "']").attr("checked", true);
                    $("#createdDate").val(note.createdDate);
                    $("#finish").val(note.finished);
                }
            });
        }

        const checkDateformat = (date) => (moment(moment(date).format('DD.MM.YYYY'),'DD.MM.YYYY',true).isValid()) ? true : false;

        function ctrlEventHandler(eventHandler) {

            let id = getId();
            let title = $("#title").val();
            let description = $("#description").val();
            let selectedDate = $("#date").val();
            let dateFormat = checkDateformat(selectedDate);
            let importance = $("input:radio[name=importance]:checked").val();
            let selectedDateAsNumber = new Date(selectedDate).valueOf();
            let createdDate = new Date().valueOf();

            if (title !== "" && description !== "" && dateFormat !== false) {

                if (eventHandler === "save") {
                    $.ajax({
                        method: "POST",
                        url: "/notes",
                        data: {
                            title: title,
                            description: description,
                            finishDate: selectedDateAsNumber,
                            createdDate: createdDate,
                            importance: importance,
                            finished: false
                        }
                    }).done(function () {
                        success.show();
                        warning.hide();
                    });
                } else if (eventHandler === "update") {

                    client.updateNote(id, title, description, selectedDateAsNumber, createdDate, importance).done(function () {});
                    success.show();
                    warning.hide();
                }

            } else {
                success.hide();
                warning.show();
                showNotification();
            }
        }

        function showNotification() {

            let close = $(".closebtn");
            for (let i = 0; i < close.length; i++) {
                close[i].onclick = function(){
                    let div = this.parentElement;
                    div.style.opacity = "0";
                    setTimeout(function() {
                        div.style.display = "none";
                    }, 600);
                }
            }
        }

        // Support Firefox
        if (Modernizr.inputtypes.date) {

            $('<div class="alert alert-success"><p>Yay! <code>input="date"</code> for you!</p></div>').appendTo('#alert');
        } else {

            $('<link/>', {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css'
            }).appendTo('head');

            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js')

                .done(function() {
                    $('input[type="date"]').datepicker({
                        dateFormat: 'yy-mm-dd'
                    });
                });

            $('<div class="alert alert-warning"><p>Sorry, no <code>input="date"</code> for you! Time for jQuery UI</p></div>').appendTo('#alert');
        }

        // Support Firefox
        $('input[type="date"]').change(function() {
            var outputDate = (this.value);
            $("#target").text(outputDate);
        });
    });
}(jQuery));