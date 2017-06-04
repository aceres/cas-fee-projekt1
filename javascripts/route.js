function bodyOnloadHandler() {

    const btnCreateNote = document.getElementById("btnCreateNote");
    const btnBackToList = document.getElementById("btnBackToList");
    const btnClearLocalStorage = document.getElementById("btnClearLocalStorage");

    /* Create Note */
    if (btnCreateNote) {
        btnCreateNote.addEventListener("click", function () {
            window.location.href = 'detailNote.html?id=0';
        });
    }

    /* List */
    if (btnBackToList) {
        btnBackToList.addEventListener("click", function () {
            window.location.href = 'index.html';
        });
    }

    /* Clear Local Storage */
    if (btnClearLocalStorage) {
        btnClearLocalStorage.addEventListener("click", function () {
            noteProApplication.clearLocalStorage();
            // Get the standard json data
            // TODO: Check this if that works!
            location.reload();
        });
    }
}
