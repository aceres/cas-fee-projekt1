let style = {};

if (typeof style === "undefined") {
    let style = {};
}

style = (function () {

    "use strict";

    let applyStyle = function(e) {

        $('body').toggleClass('changeBlackStyle');

        saveStyle(e.currentTarget.value)
    }

    let loadStyle = function() {

        $("#selectStyle option").filter(function() {
            return this.value == modelNoteProApplication.getSessionKey("style");
        }).prop('selected', true);

        if (modelNoteProApplication.getSessionKey("style") === "blackBg") {
            $('body').toggleClass('changeBlackStyle');
        }
    }

    let initializeStyle = function() {
        modelNoteProApplication.setSessionKey("style", "greyBg");
    }

    let saveStyle = function(styleName) {
        modelNoteProApplication.setSessionKey("style", styleName);
    }

    return {
        loadStyle: loadStyle,
        applyStyle: applyStyle,
        saveStyle: saveStyle,
        initializeStyle: initializeStyle
    };
})();