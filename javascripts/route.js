function bodyOnloadHandler() {

    const btnCreateNote = document.getElementById("btnCreateNote");
    const btnBackToList = document.getElementById("btnBackToList");
    const btnReloadList = document.getElementById("btnReloadList");
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

    /* Refresh */
    if (btnReloadList) {
        btnReloadList.addEventListener("click", function () {
            location.reload();
        });
    }

    /* Clear Local Storage */
    if (btnClearLocalStorage) {
        btnClearLocalStorage.addEventListener("click", function () {
            noteProApplication.clearLocalStorage();
        });
    }
}
