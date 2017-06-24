;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function getNotes() {
        return ajaxUtil.ajax("GET", "/notes/", undefined);
    }

    function getNote(id) {
        // TODO: Silvan (/notes/${id})
        return ajaxUtil.ajax("GET", "/notes/"+id, undefined);
    }

    function createNote(note) {
        return ajaxUtil.ajax("POST", "/notes/", {name: note});
    }

    function checkNote(id, finished) {
        return ajaxUtil.ajax("POST", "/checkNote/", {id: id, finished: finished});
    }

    function updateNote(id, title, description, selectedDateAsNumber, createdDate, importance) {
        return ajaxUtil.ajax("POST", "/updateNote/", {id: id, title: title, description: description, finishDate: selectedDateAsNumber, createdDate: createdDate, importance: importance});
    }

    function deleteNote(id) {
        return ajaxUtil.ajax("DELETE", "/notes/"+id, undefined);
    }

    services.restClient = {
        getNotes,
        getNote,
        createNote: createNote,
        checkNote,
        updateNote,
        deleteNote
    };
}(window.services = window.services || {}, jQuery));