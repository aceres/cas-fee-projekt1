let style = {};

// We need to do a check before we create the namespace
if (typeof style === "undefined") {
    let style = {};
}

style = (function () {

    "use strict";

    let applyStyle = function(e) {

        let objectStyle = JSON.parse(localStorage.getItem("localDataNote"));
        let nodeList = $('body').find('.changeBg');

        if (e.currentTarget.value === "greyBg") {

            nodeList.addClass("greyBg");
            nodeList.removeClass("blackBg");
        }

        if (e.currentTarget.value === "blackBg") {

            nodeList.addClass("blackBg");
            nodeList.removeClass("greyBg");
        }
        saveStyle(objectStyle, e.currentTarget.value)
    }

    let loadStyle = function() {

        let checkIfDetailPageExists = modelNoteProApplication.getId("id");
        let objectStyle = JSON.parse(localStorage.getItem("localDataNote"));

        // Initialize Style by loading
        $("#selectStyle option").filter(function() {
            return this.value == objectStyle.styleSkin.name;
        }).prop('selected', true);

        let nodeList = $('body').find('.changeBg');

        if (objectStyle.styleSkin.name === "greyBg") {

            nodeList.addClass("greyBg");
            nodeList.remove("blackBg");

            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }

        if (objectStyle.styleSkin.name === "blackBg") {

            nodeList.addClass("blackBg");
            nodeList.removeClass("greyBg");

            if (!checkIfDetailPageExists) {
                document.getElementById("listAllNote").style.color = "#000000";
            }
        }
    }

    // Update style
    let saveStyle = function(objectStyle, styleName) {

        objectStyle.styleSkin.name = styleName;
        localStorage.setItem('localDataNote', JSON.stringify(objectStyle));
    }

    return {
        loadStyle: loadStyle,
        applyStyle: applyStyle,
        saveStyle: saveStyle
    };
})();