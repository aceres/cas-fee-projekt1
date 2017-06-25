const style = (function () {

    "use strict";

    let applyStyle = function(e) {

        $('body').toggleClass('changeBlackStyle');
        modelNoteProApplication.sessionKey("style", e.currentTarget.value, "setKey");
    }

    let loadStyle = function() {

        $("#selectStyle option").filter(function() {
            return this.value == modelNoteProApplication.sessionKey("style", null, "getKey");
        }).prop('selected', true);

        if (modelNoteProApplication.sessionKey("style", null, "getKey") === "blackBg") {
            $('body').toggleClass('changeBlackStyle');
        } else {
            $('body').removeClass('changeBlackStyle');
        }
    }

    return {
        loadStyle: loadStyle,
        applyStyle: applyStyle
    };
})();