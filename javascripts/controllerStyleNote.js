let style = {};

// We need to do a check before we create the namespace
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

        // Initialize Style by loading
        $("#selectStyle option").filter(function() {
            return this.value == sessionStorage["style"];
        }).prop('selected', true);

        let nodeList = $('body').find('.changeBg');

        if (sessionStorage["style"] === "greyBg") {

            nodeList.addClass("greyBg");
            nodeList.remove("blackBg");

            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }

        if (sessionStorage["style"] === "blackBg") {

            nodeList.addClass("blackBg");
            nodeList.removeClass("greyBg");

            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }
    }

    let initializeStyle = function() {
        sessionStorage["style"] = "greyBg";
    }

    // Update style
    let saveStyle = function(styleName) {

        sessionStorage["style"] = styleName;
    }

    // Make it public access
    return {
        loadStyle: loadStyle,
        applyStyle: applyStyle,
        saveStyle: saveStyle,
        initializeStyle: initializeStyle
    };
})();