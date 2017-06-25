const style = (function () {

    "use strict";

    let applyStyle = function(e) {

        $('body').toggleClass('changeBlackStyle');
        saveStyle(e.currentTarget.value)
    }

    let loadStyle = function() {

        $("#selectStyle option").filter(function() {
            return this.value == modelNoteProApplication.sessionKey("style", null, "get");
        }).prop('selected', true);

        if (modelNoteProApplication.sessionKey("style", null, "get") === "blackBg") {
            $('body').toggleClass('changeBlackStyle');
        }
    }

    let initializeStyle = function() {
        modelNoteProApplication.sessionKey("style", "greyBg", "set");
    }

    let saveStyle = function(styleName) {
        modelNoteProApplication.sessionKey("style", styleName, "set");
    }

    return {
        loadStyle: loadStyle,
        applyStyle: applyStyle,
        saveStyle: saveStyle,
        initializeStyle: initializeStyle
    };
})();