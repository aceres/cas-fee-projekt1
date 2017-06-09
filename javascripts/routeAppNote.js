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
    return {
        navigateTo: navigateTo
    };
})();

// Initialize and register buttons
const btnCreateNote = document.getElementById("btnCreateNote");
const btnBackToList = document.getElementById("btnBackToList");
const btnClearLocalStorage = document.getElementById("btnClearLocalStorage");
const btnSaveNote = document.getElementById("btnSaveNote");
const btnUpdateNote = document.getElementById("btnUpdateNote");
const btnDeleteNote = document.getElementById("btnDeleteNote");
const btnCancelNote = document.getElementById("btnCancelNote");

// Create Note
if (btnCreateNote) {
    btnCreateNote.addEventListener("click", function () {
        router.navigateTo("detailNote.html?id=0");
    });
}

// List
if (btnBackToList) {
    btnBackToList.addEventListener("click", function () {
        console.log("Test!");
        router.navigateTo("index.html");
    });
}

// Clear Local Storage
if (btnClearLocalStorage) {
    btnClearLocalStorage.addEventListener("click", function () {
        localStorage.clear();
        router.navigateTo("index.html");
    });
}

// Save Note
if (btnSaveNote) {
    btnSaveNote.addEventListener("click", function () {
        noteProApplication.createNote();
    });
}

// Update Note
if (btnUpdateNote) {
    btnUpdateNote.addEventListener("click", function () {
        noteProApplication.updateNote();
    });
}

// Delete Note
if (btnDeleteNote) {
    btnDeleteNote.addEventListener("click", function () {
        noteProApplication.deleteNote();
    });
}

// Cancel Note
if (btnCancelNote) {
    btnCancelNote.addEventListener("click", function () {
        router.navigateTo("index.html");
    });
}
