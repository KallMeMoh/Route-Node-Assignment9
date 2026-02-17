import { Router } from "express";
import { createNoteService, updateNoteService } from "./note.service.js";

export const noteRouter = Router();

noteRouter.post("/", createNoteService);

noteRouter.put("/replace/:noteId", updateNoteService);

noteRouter.patch("/all", () => {});

// /notes/paginate-sort?page=2&limit=3
noteRouter.get("/paginate-sort", () => {});

// /notes/note-by-content?content=Workout Plan
noteRouter.get("/note-by-content", () => {});

noteRouter.get("/note-with-user", () => {});

noteRouter.get("/aggregate", () => {});

noteRouter.delete("/", () => {});

noteRouter.get("/:noteId", () => {});

noteRouter.patch("/:noteId", () => {});

noteRouter.delete("/:noteId", () => {});
