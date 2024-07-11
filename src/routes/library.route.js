import express from "express";
import {
  uploads,
  uploadFile,
  create,
  getAll,
  getId,
  update,
  deletedId,
  downloadFile,
} from "../controllers/library.controller.js";

const router = express.Router();

router.post("/upload", uploads, uploadFile);
router.post("/", create);
router.get("/", getAll);
router.get("/:id", getId);
router.put("/:id", update);
router.delete("/:id", deletedId);

// Nueva ruta para la descarga de archivos
router.get("/download/:filename", downloadFile);

export default router;
