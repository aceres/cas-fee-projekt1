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

        let checkIfDetailPageExists = modelNoteProApplication.getId("id");

        $("#selectStyle option").filter(function() {
            return this.value == window.sessionStorage["style"];
        }).prop('selected', true);

        let nodeList = $('body').find('.changeBg');

        if (window.sessionStorage["style"] === "greyBg") {

            nodeList.addClass("greyBg");
            nodeList.remove("blackBg");

            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }

        if (window.sessionStorage["style"] === "blackBg") {

            nodeList.addClass("blackBg");
            nodeList.removeClass("greyBg");

            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }
    }

    let initializeStyle = function() {
        window.sessionStorage["style"] = "greyBg";
    }

    let saveStyle = function(styleName) {
        window.sessionStorage["style"] = styleName;
    }

    return {
        loadStyle: loadStyle,
        applyStyle: applyStyle,
        saveStyle: saveStyle,
        initializeStyle: initializeStyle
    };
})();