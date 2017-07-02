let modelNoteProApplication = (() => {

    "use strict";

    sessionKey("showCheckedNotesOnly", false);

    function sessionKey(sessionId, flag, behaviour) {

        if (behaviour === "setKey") {
            window.sessionStorage[sessionId] = flag;
        } else {
            return window.sessionStorage[sessionId];
        }
    }

    return {
        sessionKey
    };
})();



