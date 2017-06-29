;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function getNotes() {
        return ajaxUtil.ajax("GET", "/notes/", undefined);
    }

    function getNote(id) {
        return ajaxUtil.ajax("GET", "/notes/"+id, undefined);
    }

    function createNote(note) {
        return ajaxUtil.ajax("POST", "/notes/", {note: note});
    }

    function checkNote(id, finished) {
        return ajaxUtil.ajax("POST", "/checkNote/", {id: id, finished: finished});
    }

    function updateNote(note) {
        return ajaxUtil.ajax("POST", "/updateNote/", {note: note});
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