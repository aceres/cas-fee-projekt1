let router = {};

// We need to do a check before we create the namespace
if (typeof router === "undefined") {
    let router = {};
}

router = (function () {

    "use strict";

    let navigateTo = function(url) {
        window.location = url;
    }

    let reload = function() {
        window.location.reload();
    }

    return {
        navigateTo: navigateTo,
        reload: reload
    };
})();