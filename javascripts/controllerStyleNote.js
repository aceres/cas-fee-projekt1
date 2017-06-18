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
            return this.value == modelNoteProApplication.getSessionStorage("style");
        }).prop('selected', true);

        if (modelNoteProApplication.getSessionStorage("style") === "blackBg") {
            $('body').toggleClass('changeBlackStyle');
        }
    }

    let initializeStyle = function() {
        modelNoteProApplication.setSessionStorage("style", "greyBg");
    }

    let saveStyle = function(styleName) {
        modelNoteProApplication.setSessionStorage("style", styleName);
    }

    return {
        loadStyle: loadStyle,
        applyStyle: applyStyle,
        saveStyle: saveStyle,
        initializeStyle: initializeStyle
    };
})();