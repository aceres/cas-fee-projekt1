var router = (function () {

    "use strict";

    let route = function(url) {
        window.location = url;
    }

    return {
        route: route
    };

})();
