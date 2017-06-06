var router = (function () {

    "use strict";

    let route = function(url) {
        window.location = url;
    }

    return {
        route: route
    };

})();


function bodyOnloadHandler() {

    const btnCreateNote = document.getElementById("btnCreateNote");
    const btnBackToList = document.getElementById("btnBackToList");
    const btnClearLocalStorage = document.getElementById("btnClearLocalStorage");

    /* Create Note */
    if (btnCreateNote) {
        btnCreateNote.addEventListener("click", function () {
            router.route("detailNote.html?id=0");
        });
    }

    /* List */
    if (btnBackToList) {
        btnBackToList.addEventListener("click", function () {
            router.route("index.html");
        });
    }

    /* Clear Local Storage */
    if (btnClearLocalStorage) {
        btnClearLocalStorage.addEventListener("click", function () {
            localStorage.clear();
            window.location.reload("index.html");
        });
    }
}
