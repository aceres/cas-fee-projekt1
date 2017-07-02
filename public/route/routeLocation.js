let router = (() => {

    "use strict";

    let navigateTo = function(url) {
        window.location = url;
    }

    return {
        navigateTo: navigateTo
    };
})();