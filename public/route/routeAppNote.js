let router = (function() {

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