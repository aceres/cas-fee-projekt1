window.onload = function() {

    const btnCreateNote = document.getElementById("btnCreateNote");
    const btnBackToList = document.getElementById("btnBackToList");
    const btnReloadList = document.getElementById("btnReloadList");
    const btnClearLocalStorage = document.getElementById("btnClearLocalStorage");

    /* Create Note */
    btnCreateNote.addEventListener("click", function () {
        window.location.href = 'detailNote.html?id=0';
    });

    /* List */
    btnBackToList.addEventListener("click", function () {
        window.location.href = 'index.html';
    });

    /* Refresh */
    btnReloadList.addEventListener("click", function () {
        window.location.href = 'index.html';
    });

    /* Clear Local Storage */
    btnClearLocalStorage.addEventListener("click", function () {
        noteProApplication.clearLocalStorage();
    });

}