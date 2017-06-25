;(function($) {

    "use strict";

    const client = window.services.restClient;
    const success = $(".success");
    const warning = $(".warning");
    const save = $(".save");
    const update = $(".update");

    $(function () {

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
                    ctrlSave();
                    break;

                case "update":
                    ctrlUpdate();
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

        function getId() {

            let baseUrl = (window.location).href;
            let id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
            return id;
        }

        function loadNote() {

            let id = getId();
            client.getNote(id).done(function(note){

                if (typeof note === 'object' && id != 0) {

                    save.hide();
                    update.show();
                    $("#title").val(note.title);
                    $("#description").val(note.description);

                    let timestamp = parseInt(note.finishDate);
                    $("#date").val(moment(timestamp).format("YYYY-MM-DD"));
                    $("input[name='importance'][value='"+note.importance+"']").attr("checked", true);
                    $("#createdDate").val(note.createdDate);
                    $("#finish").val(note.finished);
                } else {

                    save.show();
                    update.hide();
                }
            });
        }

        function ctrlSave() {

            let title = $("#title").val();
            let description = $("#description").val();
            let selectedDate = $("#date").val();
            let dateFormat = checkDateformat(selectedDate);
            let importance = $("input:radio[name=importance]:checked").val();
            let selectedDateAsNumber = new Date(selectedDate).valueOf();
            let createdDate = new Date().valueOf();

            if (title !== "" && description !== "" && dateFormat !== false) {

                $.ajax({
                    method: "POST",
                    url: "/notes",
                    data: { title: title,
                            description: description,
                            finishDate: selectedDateAsNumber,
                            createdDate: createdDate,
                            importance: importance,
                            finished: false
                    }
                }).done(function() {
                    success.show();
                    warning.hide();
                    showNotification();
                });
            } else {
                success.hide();
                warning.show();
                showNotification();
            }
        }

        function ctrlUpdate() {

            let id = getId();
            let title = $("#title").val();
            let description = $("#description").val();
            let selectedDate = $("#date").val();
            let selectedDateAsNumber = new Date(selectedDate).valueOf();
            let importance = $("input:radio[name=importance]:checked").val();
            let dateFormat = checkDateformat(selectedDate);
            let createdDate = $("#createdDate").val();

            if (title !== "" && description != "" && dateFormat !== false) {

                client.updateNote(id, title, description, selectedDateAsNumber, createdDate, importance).done(function(){});

                success.show();
                warning.hide();
                showNotification();
            } else {
                success.hide();
                warning.show();
                showNotification();
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

    function checkDateformat(date) {

        let dateFormat = 'DD.MM.YYYY';
        if (moment(moment(date).format(dateFormat),dateFormat,true).isValid()) {
            return true;
        } else {
            return false;
        }
    }

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
}(jQuery));