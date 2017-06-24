const express = require('express');
const router = express.Router();
const notes = require('../controller/controllerNote.js');

router.get("/", notes.showIndex);
//router.get("/checkedNotes", notes.getCheckedNotes);
router.post("/notes", notes.addNote);
router.get("/notes/:id/", notes.getNote);
router.post("/updateNote", notes.updateNote);
router.post("/checkNote", notes.checkNoteAsFinished);
router.delete("/notes/:id/", notes.deleteNote);

module.exports = router;