let style = {};

if (typeof style === "undefined") {
    let style = {};
}

style = (function () {

    "use strict";

    let applyStyle = function(e) {

        let nodeList = $('body').find('.changeBg');

        if (e.currentTarget.value === "greyBg") {

            nodeList.addClass("greyBg");
            nodeList.removeClass("blackBg");
        }

        if (e.currentTarget.value === "blackBg") {

            nodeList.addClass("blackBg");
            nodeList.removeClass("greyBg");
        }
        saveStyle(e.currentTarget.value)
    }

    let loadStyle = function() {

        $("#selectStyle option").filter(function() {
            return this.value == modelNoteProApplication.getSessionStorage("style");
        }).prop('selected', true);

        let nodeList = $('body').find('.changeBg');

        if (modelNoteProApplication.getSessionStorage("style") === "greyBg") {
            nodeList.addClass("greyBg");
            nodeList.remove("blackBg");
        } else {
            nodeList.addClass("blackBg");
            nodeList.removeClass("greyBg");
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