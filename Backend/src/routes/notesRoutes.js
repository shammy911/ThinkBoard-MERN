import express from 'express'
import { createNotes, deleteNotes, getAllNotes, updateNotes, getNotesById } from '../controllers/notesController.js';

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);
router.get("/:id", getNotesById);

export default router;

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 66 notes");
// });

// app.post("/api/notes",(req, res) => {
//     res.status(201).json({message:"note created successfully!"})
// });

// app.put("/api/notes/:id",(req, res) => {
//     res.status(200).json({message:"note updated successfully!"})
// });

// app.delete("/api/notes/:id",(req, res) => {
//     res.status(200).json({message:"post deleted successfully!"})
// });