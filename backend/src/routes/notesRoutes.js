import express from "express"
import {getAllNotes, createNote, updateNote, deleteNote, getNoteById} from "../controllers/notesController.js";
import { protect } from "../middleware/auth.js";
import rateLimiter from "../middleware/rateLimiter.js";
 const router = express.Router();


router.get("/", protect, rateLimiter, getAllNotes);
router.get("/:id", protect, rateLimiter, getNoteById);
router.post("/", protect, rateLimiter, createNote);
router.put("/:id", protect, rateLimiter, updateNote);
router.delete("/:id", protect, rateLimiter, deleteNote);

 export default router