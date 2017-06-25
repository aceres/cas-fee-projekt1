let modelNoteProApplication = (function() {

    "use strict";

    sessionKey("showCheckedNotesOnly", false);

    function sessionKey(sessionId, flag, behaviour) {

        if (behaviour === "set") {
            window.sessionStorage[sessionId] = flag;
        } else {
            return window.sessionStorage[sessionId];
        }
    }

    return {
        sessionKey
    };
})();



