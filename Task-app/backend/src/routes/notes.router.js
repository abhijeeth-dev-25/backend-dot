const express = require("express");
const {createNotesController, 
       getAllNotesController, 
       getNoteByIdController, 
       updateNoteController,
       deleteNoteController,
       resetNoteController} = require("../contorllers/note.controller");


const router = express.Router();

router.post("/create", createNotesController);

router.get("/getAllNotes", getAllNotesController)

router.get("/:id", getNoteByIdController)

router.put("/:id", resetNoteController)

router.patch("/:id", updateNoteController)

router.delete("/:id", deleteNoteController)



module.exports = router;